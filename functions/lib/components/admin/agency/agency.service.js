"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deActivateAgency = exports.getAllVendors = exports.getAgencyById = exports.getAllAgency = exports.sendEmail = exports.createAgency = exports.generatePassword = void 0;
const dayjs = require("dayjs");
const v1_1 = require("firebase-functions/v1");
const config_1 = require("../../../firebase/config");
const apiErrorHandler_1 = require("../../../utils/apiErrorHandler");
const agency_message_1 = require("./agency.message");
const nodemailer = require("nodemailer");
// genrate random password that have length =  8. Must have at least one uppercase letter, one lowercase letter, one number, and one special character.
const generatePassword = () => {
    const length = 8;
    const alphabate = "abcdefghijklmnopqrstuvwxyz";
    const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const specialChar = "!@#$%^&*()\-__+.";
    let retVal = "";
    // /^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$/;
    for (let i = 0, n = upperCase.length; i < 2; ++i) {
        retVal += upperCase.charAt(Math.floor(Math.random() * n));
    }
    for (let i = 0, n = alphabate.length; i < 2; ++i) {
        retVal += alphabate.charAt(Math.floor(Math.random() * n));
    }
    for (let i = 0, n = numbers.length; i < 2; ++i) {
        retVal += numbers.charAt(Math.floor(Math.random() * n));
    }
    for (let i = 0, n = specialChar.length; i < 2; ++i) {
        retVal += specialChar.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
};
exports.generatePassword = generatePassword;
// create agency account
const createAgency = async (email, agencyName, password) => {
    try {
        const user = await config_1.adminauth.createUser({
            email: email,
            password: password,
        });
        const agency = await config_1.db.collection('Agency').doc(user.uid).set({
            name: agencyName,
            agency_id: user.uid,
            email: email,
            password: password,
            created_at: dayjs().format(),
            updated_at: dayjs().format(),
            deleted_at: null,
            status: 'active',
        });
        return { user, agency };
    }
    catch (err) {
        if ((err === null || err === void 0 ? void 0 : err.code) === 'auth/email-already-exists') {
            throw new apiErrorHandler_1.HttpException(401, 'auth/email-already-exists', 1007);
        }
        else if ((err === null || err === void 0 ? void 0 : err.code) === 'auth/invalid-email') {
            throw new apiErrorHandler_1.HttpException(401, 'auth/invalid-email', 1002);
        }
        else if ((err === null || err === void 0 ? void 0 : err.code) === 'auth/operation-not-allowed') {
            throw new apiErrorHandler_1.HttpException(401, 'auth/operation-not-allowed', 1006);
        }
        else if ((err === null || err === void 0 ? void 0 : err.code) === 'auth/weak-password') {
            throw new apiErrorHandler_1.HttpException(401, 'auth/weak-password', 1008);
        }
        else {
            throw new apiErrorHandler_1.HttpException(400, err.message, 1009);
        }
    }
};
exports.createAgency = createAgency;
// create a function that send email and password to agency email with nodemailer
const sendEmail = async (email, password) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            type: "SMTP",
            host: "smtp.gmail.com",
            // port: 587,
            secure: false,
            auth: {
                user: process.env.MAILER_EMAIL_ID,
                pass: process.env.MAILER_PASSWORD, // generated ethereal password
            },
        });
        let html = `<h1>Your Agency account is created</h1>`;
        html += `<h3>Email: ${email}</h3>`;
        html += `<h3>Password: ${password}</h3>`;
        await transporter.sendMail({
            from: process.env.MAILER_EMAIL_ID,
            to: email,
            subject: "Agency Credentia;",
            html: html
        });
        console.log("email sent sucessfully");
    }
    catch (error) {
        v1_1.logger.error(error);
        //  throw new HttpException(401,'auth/unknown-error', 1009);
        // throw nodemailer unsuccessful error
        if ((error === null || error === void 0 ? void 0 : error.code) === 'EENVELOPE') {
            throw new apiErrorHandler_1.HttpException(401, agency_message_1.agencyMessages.EENVELOPE, 1015);
        }
        else if ((error === null || error === void 0 ? void 0 : error.code) === 'EAUTH') {
            throw new apiErrorHandler_1.HttpException(401, agency_message_1.agencyMessages.EAUTH, 1015);
        }
        else if ((error === null || error === void 0 ? void 0 : error.code) === 'ECONNECTION') {
            throw new apiErrorHandler_1.HttpException(401, agency_message_1.agencyMessages.ECONNECTION, 1015);
        }
        else if ((error === null || error === void 0 ? void 0 : error.code) === 'EMESSAGE') {
            throw new apiErrorHandler_1.HttpException(401, agency_message_1.agencyMessages.EMESSAGE, 1015);
        }
        else if ((error === null || error === void 0 ? void 0 : error.code) === 'ETLS') {
            throw new apiErrorHandler_1.HttpException(401, agency_message_1.agencyMessages.ETLS, 1015);
        }
        else {
            throw new apiErrorHandler_1.HttpException(500, error.message, 1015);
        }
    }
};
exports.sendEmail = sendEmail;
// create a function that will return all agency
const getAllAgency = async () => {
    try {
        const agency = await config_1.db.collection('Agency').where("status", "==", "active").get();
        const agencyData = agency.docs.map((doc) => {
            // get total vendors for each agency from vendor collection
            let totalVendors = 0;
            config_1.db.collection('Vendor').where('agency_id', '==', doc.data().agency_id).get().then((snapshot) => {
                totalVendors = snapshot.size;
            }).catch((err) => {
                v1_1.logger.error(err);
                throw new apiErrorHandler_1.HttpException(500, 'auth/unknown-error', 1015);
            });
            // return all fields of agency collection except password
            v1_1.logger.info("total vendors", totalVendors);
            return { id: doc.id, totalVendors: totalVendors, agency_id: doc.data().agency_id, name: doc.data().name, email: doc.data().email, status: doc.data().status, created_at: doc.data().created_at, updated_at: doc.data().updated_at };
        });
        return agencyData;
    }
    catch (err) {
        throw new apiErrorHandler_1.HttpException(401, err.message, 1009);
    }
};
exports.getAllAgency = getAllAgency;
const getAgencyById = async (agencyId) => {
    var _a, _b, _c, _d, _e, _f, _g;
    try {
        const agency = await config_1.db.collection('Agency').doc(agencyId).get();
        // get total vendors for each agency from vendor collection
        if (agency.exists) {
            let totalVendors = await config_1.db.collection('Vendor').where('agency_id', '==', (_a = agency.data()) === null || _a === void 0 ? void 0 : _a.agency_id).get();
            return { id: agency.id, totalVendors: totalVendors.size, agency_id: (_b = agency.data()) === null || _b === void 0 ? void 0 : _b.agency_id, name: (_c = agency.data()) === null || _c === void 0 ? void 0 : _c.name, email: (_d = agency.data()) === null || _d === void 0 ? void 0 : _d.email, status: (_e = agency.data()) === null || _e === void 0 ? void 0 : _e.status, created_at: (_f = agency.data()) === null || _f === void 0 ? void 0 : _f.created_at, updated_at: (_g = agency.data()) === null || _g === void 0 ? void 0 : _g.updated_at };
        }
        else {
            throw new apiErrorHandler_1.HttpException(404, 'agency Not Found', 1009);
        }
    }
    catch (err) {
        throw new apiErrorHandler_1.HttpException(400, err.message, 1009);
    }
};
exports.getAgencyById = getAgencyById;
// get all vendors of agency 
const getAllVendors = async (agencyId) => {
    try {
        const agency = await config_1.db.collection('Vendor').where('agency_id', '==', agencyId).get();
        const agencyData = agency.docs.map((doc) => {
            return { id: doc.id, vendor_id: doc.data().vendor_id, name: doc.data().name, email: doc.data().email, status: doc.data().status, created_at: doc.data().created_at, updated_at: doc.data().updated_at, agency_id: doc.data().agency_id, addess: doc.data().addess, phone_number: doc.data().phone_number };
        });
        return agencyData;
    }
    catch (err) {
        throw new apiErrorHandler_1.HttpException(401, err.message, 1009);
    }
};
exports.getAllVendors = getAllVendors;
// create a function that will deActivate agency means update status to inactive and update deleted_at field
const deActivateAgency = async (agencyId) => {
    var _a, _b, _c;
    try {
        const agency = await config_1.db.collection('Agency').doc(agencyId).get();
        // also agency is not default agency
        if (agency.exists && ((_a = agency.data()) === null || _a === void 0 ? void 0 : _a.default)) {
            // can not deactivate default agency
            return { message: 'can not deactivate default agency' };
        }
        else if (agency.exists && ((_b = agency.data()) === null || _b === void 0 ? void 0 : _b.status) === 'active') {
            // also change the agency vendors to admin default agency
            // get the default agency id
            const defaultAgency = await config_1.db.collection('Agency').where('name', '==', 'Admin').get();
            // update all vendors of this agency to default agency
            const updateVendors = await config_1.db.collection('Vendor').where('agency_id', '==', agencyId).get();
            updateVendors.docs.map((doc) => {
                config_1.db.collection('Vendor').doc(doc.id).update({ agency_id: defaultAgency.docs[0].data().agency_id, updated_at: dayjs().format('YYYY-MM-DD HH:mm:ss') });
            });
            // also disable agency account from firebase auth
            await config_1.adminauth.updateUser((_c = agency.data()) === null || _c === void 0 ? void 0 : _c.agency_id, {
                disabled: true,
            });
            await config_1.db.collection('Agency').doc(agencyId).update({
                status: 'deactivated',
                deleted_at: dayjs().format('YYYY-MM-DD HH:mm:ss'),
            });
            return { message: 'Agency Deactivated Successfully' };
        }
        else {
            throw new apiErrorHandler_1.HttpException(404, 'agency Not Found or agency already deactivated', 1009);
        }
    }
    catch (err) {
        throw new apiErrorHandler_1.HttpException(400, err.message, 1009);
    }
};
exports.deActivateAgency = deActivateAgency;
//# sourceMappingURL=agency.service.js.map