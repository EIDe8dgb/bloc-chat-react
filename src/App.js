import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCdZA6va-NxMgpnM41vrOnIRfzKV8epg4g",
    authDomain: "bloc-chat-react-a6744.firebaseapp.com",
    databaseURL: "https://bloc-chat-react-a6744.firebaseio.com",
    projectId: "bloc-chat-react-a6744",
    storageBucket: "bloc-chat-react-a6744.appspot.com",
    messagingSenderId: "503080022258"
  };
  firebase.initializeApp(config);



class App extends Component {
  render() {
    return (
      <RoomList firebase={firebase}/>
    );
  }
}

export default App;
