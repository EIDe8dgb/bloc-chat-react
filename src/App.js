import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';

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
  constructor(props){
    super(props);
    this.state={
      activeRoom: [],
      activeUser: null
    };
  }
//end of constructor method

  handleRoomClick(room){
      this.setState({activeRoom: room});
  }

  setUser(user){
    this.setState({activeUser: user});
  }

  render() {
    return (
      <div className='App'>

      <section className='authorization'>
      <User
      firebase={firebase}
      setUser={(user)=> this.setUser(user)}
      user={this.state.activeUser}
      />
      </section>

      <section className='chatrooms'>
        <RoomList
        firebase={firebase}
        currentRoom={this.state.activeRoom}
        handleRoomClick={(room)=> this.handleRoomClick(room)}
        />
      </section>

      <section className='messages'>
        <MessageList
        firebase={firebase}
        currentRoom={this.state.activeRoom}
        />
      </section>

      </div>
    );
  }
}

export default App;
