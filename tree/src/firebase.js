import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'



var firebaseConfig = {
    apiKey: "AIzaSyASxArt8Nxe6xqLQcxxVdkRsbPYMLXHP3Y",
    authDomain: "facebook-832aa.firebaseapp.com",
    projectId: "facebook-832aa",
    storageBucket: "facebook-832aa.appspot.com",
    messagingSenderId: "1065033007347",
    appId: "1:1065033007347:web:34c7bda660a01a44c3f786",
    measurementId: "G-J3828ZVN0S"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

const db = firebase.firestore()
const auth = firebase.auth()

// collection references
const users= db.collection('users')
// const postsCollection = db.collection('posts')
// const commentsCollection = db.collection('comments')
// const likesCollection = db.collection('likes')
export {
  users,auth
}