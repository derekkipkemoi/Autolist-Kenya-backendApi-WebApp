import React, { Component } from "react";
import firebase from "firebase/app";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyCX-B7wZjkskQdxzFPkodtBgQWw1JkgYxE",
  authDomain: "autolist-340709.firebaseapp.com",
  projectId: "autolist-340709",
  storageBucket: "autolist-340709.appspot.com",
  messagingSenderId: "92238366680",
  appId: "1:92238366680:web:a1b9846dcc9a4d41ad54ad",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase;
