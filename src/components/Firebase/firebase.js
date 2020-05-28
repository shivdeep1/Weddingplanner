import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage'

const config = {
    apiKey: "AIzaSyAk6bifdNspHpJiayRf1WVw0mNBN_7lf2g",
    authDomain: "wp-database-d7c6f.firebaseapp.com",
    databaseURL: "https://wp-database-d7c6f.firebaseio.com",
    projectId: "wp-database-d7c6f",
    storageBucket: "wp-database-d7c6f.appspot.com",
    messagingSenderId: "76433547092",
    appId: "1:76433547092:web:36a2db486b682d53f632c1",
    measurementId: "G-GY12PRF563"
  };

  class Firebase {
    constructor() {
      app.initializeApp(config);
      this.auth = app.auth();
      this.db = app.database();
      this.storage = app.storage()

      this.googleProvider = new app.auth.GoogleAuthProvider();
      this.facebookProvider = new app.auth.FacebookAuthProvider();
      this.twitterProvider = new app.auth.TwitterAuthProvider();
    }
    doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);
    doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);
    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
    doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

    doSignInWithGoogle = () =>
    this.auth.signInWithPopup(this.googleProvider);
    doSignInWithFacebook = () =>
    this.auth.signInWithPopup(this.facebookProvider);
    doSignInWithTwitter = () =>
    this.auth.signInWithPopup(this.twitterProvider);
    
    doSignOut = () => this.auth.signOut();

    // *** User API ***
    user = uid => this.db.ref(`users/${uid}`);
    users = () => this.db.ref('users');
  }
  export default Firebase;