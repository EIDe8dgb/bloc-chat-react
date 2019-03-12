import React, { Component } from 'react';

class RoomList extends Component{
//constructor method
  constructor(props){
    super(props);
    this.state={
      rooms:[],
      newRoomName: ''
    };
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

  handleChange(e){
    this.setState({newRoomName: e.target.value});
  }

  createRoom(e){
    e.preventDefault();
    if(!this.state.newRoomName){return}
    const newRoom = {name: this.state.newRoomName};
    this.roomsRef.push(newRoom);
    this.setState({newRoomName: ''});
  }



//required render method within react component
  render(){
    return(
      <section>

      <h1>Bloc Chat Rooms</h1>
      <nav className='chatRooms'>
        <ul>
          {
            this.state.rooms.map((room,index) =>
              <li
              key={index}
              onClick={(room)=> this.props.handleRoomClick(room)}
              >
              {room.name}
              </li>
            )
          }
        </ul>
      </nav>

      <form onSubmit={(e)=> this.createRoom(e)}>
        <label for id='newRoomText'>Create a new room</label>
        <input
        id ='newRoomText'
        type ='text'
        placeholder ='enter name here...'
        value = {this.state.newRoomName}
        onChange={(e)=> this.handleChange(e)}
        />
        <input
        type = 'submit'
        />
      </form>

      </section>
    );
  }
//end render method


}
//end RoomList component

export default RoomList;
