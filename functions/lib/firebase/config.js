"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminauth = exports.auth = exports.db = void 0;
const cresential_1 = require("./cresential");
var admin = require("firebase-admin");
const auth_1 = require("firebase/auth");
const app_1 = require("firebase/app");
admin.initializeApp({
    credential: admin.credential.cert(cresential_1.production)
});
const app = (0, app_1.initializeApp)(cresential_1.firebaseConfig);
const auth = (0, auth_1.getAuth)(app);
exports.auth = auth;
const db = admin.firestore();
exports.db = db;
const adminauth = admin.auth();
exports.adminauth = adminauth;
//# sourceMappingURL=config.js.map