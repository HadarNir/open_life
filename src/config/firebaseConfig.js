import firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

let config = {
    apiKey: "AIzaSyAWrTjySTpTIdK96FuWgC-dWyEkEaAdm3o",
    authDomain: "open-life-e5f98.firebaseapp.com",
    databaseURL: "https://open-life-e5f98.firebaseio.com",
    projectId: "open-life-e5f98",
    storageBucket: "open-life-e5f98.appspot.com",
    messagingSenderId: "302239121183",
    appId: "1:302239121183:web:50edeb5e6cd5b6b1cd7a2a",
    measurementId: "G-99SBTS8P21"
};

const app = firebase.initializeApp(config);
firebase.firestore();

export {app}