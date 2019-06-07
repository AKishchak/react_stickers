import * as firebase from "firebase";
import FireabaseConfig from "./config";

firebase.initializeApp(FireabaseConfig);

export const Database = firebase.firestore();
//    const settings = {/* your settings... */ timestampsInSnapshots: true};
const settings = {/* your settings... */};

Database.settings(settings);
