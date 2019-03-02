import React, { Component } from 'react';

class RoomList extends Component{
//constructor method
  constructor(props){
    super(props);
    this.state={rooms:[]};
    this.roomsRef = this.props.firebase.database().ref('rooms');
  }
//end constructor method

  componentDidMount(){
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({rooms: this.state.rooms.concat(room) });
    });
  }

//required render method within react component
  render(){
    return(
      <nav className='chatRooms'>
        <ul>
          {
            this.state.rooms.map((room,index) =>
              <li key={index}>{room.name}</li>
            )
          }
        </ul>
      </nav>
    );
  }
//end render method


}
//end RoomList component

export default RoomList;
