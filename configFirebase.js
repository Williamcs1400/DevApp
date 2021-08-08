import firebase from 'firebase/app';

var firebaseConfig = {
  apiKey: "AIzaSyDEy59mu60iicqb_uLQvyOt9kyCR4-04K8",
  authDomain: "devapps-meau-9acf8.firebaseapp.com",
  projectId: "devapps-meau-9acf8",
  storageBucket: "devapps-meau-9acf8.appspot.com",
  messagingSenderId: "254603341789",
  appId: "1:254603341789:web:a74040a89263cb98e91034",
  measurementId: "G-XKGZFDBKLL"
};
  // Initialize Firebase
  if(firebase.apps.length === 0){
    firebase.initializeApp(firebaseConfig)
  }
  