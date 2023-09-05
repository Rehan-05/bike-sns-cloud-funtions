"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registrationUser = exports.verifyEmailAddress = exports.updatePassword = exports.forgotPassword = exports.createAdminUser = void 0;
const dayjs = require("dayjs");
const v1_1 = require("firebase-functions/v1");
const config_1 = require("../../../firebase/config");
const apiErrorHandler_1 = require("../../../utils/apiErrorHandler");
const auth_1 = require("firebase/auth");
const sendGrid_1 = require("../../../utils/sendGrid");
const jwt_1 = require("../../../utils/jwt");
// create a function to create a new user
const createAdminUser = async () => {
    try {
        // check if the admin exist then stop execution
        const admin = await config_1.db.collection('Admin').where('email', '==', "hamsaeed1122@gmail.com").get();
        if (!admin.empty) {
            v1_1.logger.info('Admin already exist');
            return;
        }
        ;
        const user = await config_1.adminauth.createUser({
            email: "hamsaeed1122@gmail.com",
            password: "Newton@123",
        });
        v1_1.logger.info(`User created with uid: ${user.uid}`);
        await config_1.adminauth.setCustomUserClaims(user.uid, { admin: true });
        config_1.db.collection('Admin').doc(user.uid).set({
            admin_id: user.uid,
            email: "hamsaeed1122@gmail.com",
            privilege: 'admin',
            password: "Newton@123",
            created_at: dayjs().format('YYYY-MM-DD HH:mm:ss'),
            updated_at: dayjs().format('YYYY-MM-DD HH:mm:ss'),
            deleted_at: null,
        });
        return user;
    }
    catch (err) {
        v1_1.logger.error(err);
    }
};
exports.createAdminUser = createAdminUser;
const forgotPassword = async (email) => {
    let error;
    try {
        await (0, auth_1.sendPasswordResetEmail)(config_1.auth, email);
    }
    catch (err) {
        error = err instanceof Error ? err : (0, apiErrorHandler_1.badImplementationException)(err);
    }
    if (error) {
        v1_1.logger.error(error);
        return Promise.reject(error);
    }
    else {
        v1_1.logger.info('Password reset link sent');
        return Promise.resolve("success");
    }
};
exports.forgotPassword = forgotPassword;
const updatePassword = async (password, token) => {
    let error;
    try {
        await (0, auth_1.confirmPasswordReset)(config_1.auth, token, password);
        v1_1.logger.info(`Password updated for`);
    }
    catch (err) {
        error = err instanceof Error ? err : (0, apiErrorHandler_1.badImplementationException)(err);
    }
    if (error) {
        return Promise.reject(error);
    }
    else {
        return Promise.resolve("success");
    }
};
exports.updatePassword = updatePassword;
// verifyEmailAddress link sent to your email using node mailer
const verifyEmailAddress = async (email) => {
    let error;
    try {
        let registrationLink = "http://localhost:5000/registration";
        let token = await (0, jwt_1.encodeJwt)({ email }, 24 * 60 * 60 * 1000);
        let link = registrationLink + "?token=" + token;
        let adminEmail = `
    <div style="background-color: #F5F5F5; padding: 20px; font-family: sans-serif;">
      <div style="background-color: white; padding: 20px; border-radius: 10px;">Hi MR,<br><br>
        <p>Thank you for registering with us. Please click on the link below to complete your registration.</p>
        <a href="${link}">Click here to complete your registration</a>
        <br><br>
        <p>Regards,<br>
        Admin</p>
      </div>
    </div>
    `;
        await (0, sendGrid_1.sendMessage)({ html: adminEmail, subject: "Registration Link", to: email, from: "khan123@gmail.com" });
    }
    catch (err) {
        error = err instanceof Error ? err : (0, apiErrorHandler_1.badImplementationException)(err);
    }
    if (error) {
        v1_1.logger.error(error);
        return Promise.reject(error);
    }
    else {
        v1_1.logger.info('Password reset link sent');
        return Promise.resolve("success");
    }
};
exports.verifyEmailAddress = verifyEmailAddress;
// create a function to create a new user
const registrationUser = async (email, nickName, gender, phone, birthDay, province, password) => {
    let error;
    try {
        // save the user data in the database
        const user = await config_1.adminauth.createUser({
            email: email,
            nickName: nickName,
            gender: gender,
            phone: phone,
            birthDay: birthDay,
            province: province,
            password: password
        });
        v1_1.logger.info(`User created with uid: ${user.uid}`);
        await config_1.adminauth.setCustomUserClaims(user.uid, { admin: true });
        config_1.db.collection('User').doc(user.uid).set({
            user_id: user.uid,
            privilege: 'admin',
            email: email,
            nickName: nickName,
            gender: gender,
            phone: phone,
            birthDay: birthDay,
            province: province,
            password: password,
            created_at: dayjs().format('YYYY-MM-DD HH:mm:ss'),
            updated_at: dayjs().format('YYYY-MM-DD HH:mm:ss'),
            deleted_at: null,
        });
    }
    catch (err) {
        error = err instanceof Error ? err : (0, apiErrorHandler_1.badImplementationException)(err);
    }
    if (error) {
        v1_1.logger.error(error);
        return Promise.reject(error);
    }
    else {
        v1_1.logger.info('Password reset link sent');
        return Promise.resolve("success");
    }
};
exports.registrationUser = registrationUser;
//# sourceMappingURL=auth.service.js.map