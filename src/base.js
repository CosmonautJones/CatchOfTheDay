import Rebase from 're-base';
import firebase from 'firebase';

// creating a Base which is a connection to the firebase database

var config = {
  apiKey: 'AIzaSyDNaEMM31bhCCyq-3qW4kM9y_l0qkvKZXs',
  authDomain: 'catch-of-the-day-travis-jones.firebaseapp.com',
  databaseURL: 'https://catch-of-the-day-travis-jones.firebaseio.com',
  projectId: 'catch-of-the-day-travis-jones',
  storageBucket: 'catch-of-the-day-travis-jones.appspot.com',
  messagingSenderId: '590734113051'
};
const app = firebase.initializeApp(config);
const base = Rebase.createClass(app.database());

export default base;