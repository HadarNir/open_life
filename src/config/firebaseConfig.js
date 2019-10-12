// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

let config = {
    apiKey: "AIzaSyA_dsyRQiB9FUpEGJq4H1Ag7iBKub_qSHc",
    authDomain: "open-life-1c793.firebaseapp.com",
    databaseURL: "https://open-life-1c793.firebaseio.com",
    projectId: "open-life-1c793",
    storageBucket: "open-life-1c793.appspot.com",
    messagingSenderId: "444472599881",
    appId: "1:444472599881:web:603edd90792e99593e6698",
    measurementId: "G-V2V6Z8EQJB"
};

const app = firebase.initializeApp(config);
firebase.firestore();
export {app}