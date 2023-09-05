import { firebaseConfig, production } from "./cresential";

var admin = require("firebase-admin");
import {getAuth} from "firebase/auth"

import { initializeApp } from "firebase/app";


admin.initializeApp({
  credential: admin.credential.cert(production)
});

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);



const db= admin.firestore();
const adminauth= admin.auth();


export {
    db,
    auth,
    adminauth
}


