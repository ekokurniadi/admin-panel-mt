import firebase from 'firebase/compat/app';
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/analytics'
import 'firebase/storage'

export default ({ env, store }, inject) => {
    const firebaseConfig = {
        apiKey: "AIzaSyB0gvg_pkm98XxGtY16W9dBlD8RgN98x2I",
        authDomain: "markettukang-4459b.firebaseapp.com",
        projectId: "markettukang-4459b",
        storageBucket: "markettukang-4459b.appspot.com",
        messagingSenderId: "442534122988",
        appId: "1:442534122988:web:ae35472d19b4d87f68dcc9",
        measurementId: "G-E1HTL401YC"
    };
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig)
    }
    inject('firebase', firebase)
}