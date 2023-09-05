"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = exports.updateOrderStatus = exports.createOrder = exports.getTotalOrder = void 0;
const dayjs = require("dayjs");
const v1_1 = require("firebase-functions/v1");
const config_1 = require("../../../firebase/config");
const apiErrorHandler_1 = require("../../../utils/apiErrorHandler");
const agency_message_1 = require("../../admin/agency/agency.message");
const nodemailer = require('nodemailer');
// create a function that get total order of this month
const getTotalOrder = async (month, vendorId) => {
    try {
        // get year of this month
        const year = dayjs().year();
        // 
        let today = year + '-' + month + '-' + '01';
        const firstDayOfMonth = dayjs(today).startOf('month').format('YYYY-MM-DD');
        console.log(firstDayOfMonth);
        const lastDayOfMonth = dayjs(today).endOf('month').format('YYYY-MM-DD');
        const totalOrder = await config_1.db.collection('Order').where("vendor_id", "==", vendorId).where('created_at', '>=', firstDayOfMonth).where('created_at', '<=', lastDayOfMonth).get();
        // return all orders
        return totalOrder.docs.map((doc) => (Object.assign({ id: doc.id }, doc.data())));
    }
    catch (err) {
        v1_1.logger.error({ message: 'error in fetching total order', error: err });
        throw new apiErrorHandler_1.HttpException(500, 'Internal Server Error', 1000);
    }
};
exports.getTotalOrder = getTotalOrder;
// create a function that will create a new order
const createOrder = async (number, vendor_id, order_date) => {
    try {
        // create a new order
        // genrate order id
        const order_id = await config_1.db.collection('Order').doc().id;
        // get agency ID from vendor ID
        const vendor = await config_1.db.collection('Vendor').doc(vendor_id).get();
        const agency_id = vendor.data().agency_id;
        // create a new order
        const order = await config_1.db.collection('Order').add({
            order_id,
            number,
            vendor_id,
            order_date,
            agency_id,
            status: 'ordered',
            created_at: dayjs().format('YYYY-MM-DD HH:mm:ss'),
            updated_at: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        });
        // return new order
        return { id: order.id };
    }
    catch (err) {
        v1_1.logger.error({ message: 'error in creating order', error: err });
        throw new apiErrorHandler_1.HttpException(500, 'Internal Server Error', 1000);
    }
};
exports.createOrder = createOrder;
// create a function that will update order status
const updateOrderStatus = async (orderId, status) => {
    try {
        // find order by id
        console.log(orderId);
        const order = await config_1.db.collection('Order').where('order_id', '==', orderId).get();
        // if order not found
        if (order.empty) {
            throw new apiErrorHandler_1.HttpException(404, 'Order not found', 1000);
        }
        // update order status
        // we can update order status only if order status is shipped
        if (order.docs[0].data().status === 'shipped') {
            await config_1.db.collection('Order').doc(order.docs[0].id).update({ status, updated_at: dayjs().format('YYYY-MM-DD HH:mm:ss') });
            // also send email to admin
            (0, exports.sendEmail)(order.docs[0].data().order_id, status, order.docs[0].data().vendor_id);
            return { id: order.docs[0].id, message: "successfully change status" };
        }
        else {
            throw new apiErrorHandler_1.HttpException(400, 'Order status can not be updated', 1000);
        }
        // return updated order
    }
    catch (err) {
        v1_1.logger.error({ message: 'error in updating order status', error: err });
        if (err instanceof apiErrorHandler_1.HttpException) {
            throw err;
        }
        else {
            throw new apiErrorHandler_1.HttpException(500, err.message, 1000);
        }
    }
};
exports.updateOrderStatus = updateOrderStatus;
const sendEmail = async (orderId, status, vendorId) => {
    try {
        v1_1.logger.info({ message: 'sending email to admin' });
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
        // get admin email
        const admin = await config_1.db.collection('Admin').get();
        const adminEmail = admin.docs[0].data().email;
        let html = `<h3>Order Status Is Changed</h3>`;
        html += `<h3>orderId: ${orderId}</h3>`;
        html += `<h3>Status: ${status}</h3>`;
        html += `<h3>changedBy: ${vendorId}</h3>`;
        await transporter.sendMail({
            from: process.env.MAILER_EMAIL_ID,
            to: adminEmail,
            subject: "Order Status",
            html: html
        });
        v1_1.logger.info({ message: 'email sent to admin' });
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
//# sourceMappingURL=order.service.js.map