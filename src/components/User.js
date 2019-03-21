import React, { Component } from 'react';

class User extends Component {
  constructor(props){
    super(props);
    this.state={user: ''};
  }

  componentDidMount(){
    this.props.firebase.auth().onAuthStateChanged(user => {
      this.props.setUser(user);
    });
  }

  handleSignIn(e){
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup( provider );
  }

  handleSignOut(e){
    this.props.firebase.auth().signOut();
  }

  render(){
    const currentUser = this.props.user === null ?
    "Guest" :
    this.props.user.displayName

    return(
      <div>
      <span>Logged in as: {currentUser}</span>
      <button onClick={(e)=> this.handleSignIn(e)}>
        Sign-in
      </button>
      <button onClick={(e)=> this.handleSignOut(e)}>
        Sign-out
      </button>

      </div>

    );
  }
}

export default User;
