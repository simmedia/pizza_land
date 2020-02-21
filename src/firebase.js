import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyBhHcg5viQXq9ID-iE2jNwCEEJUYHCm2XA",
    authDomain: "pizzaland-e6914.firebaseapp.com",
    databaseURL: "https://pizzaland-e6914.firebaseio.com",
    projectId: "pizzaland-e6914",
    storageBucket: "pizzaland-e6914.appspot.com",
    messagingSenderId: "632651548374",
    appId: "1:632651548374:web:181dc39ea3342780372b77"
}

firebase.initializeApp(config)
const db = firebase.firestore()

export const firebaseAuth = firebase.auth()
export const dbMenuRef = db.collection('menu')
export const dbOrdersRef = db.collection('orders')