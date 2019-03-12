import React, {Component} from 'react';

class MessageList extends Component {
  constructor(props){
    super(props);
    this.state = {
       messages: [],
       username: '',
       content: '',
       sentAt: '',
       roomId: ''
     };

    this.messagesRef = this.props.firebase.database().ref('messages');
  }

  componentDidMount() {
        this.messagesRef.on('child_added', snapshot => {
            const message = snapshot.val();
            message.key = snapshot.key;
            this.setState({ messages: this.state.messages.concat( message ) })
        });
    }

    


  render(){
    return(
      <div className='messageList'>
        <section>
        {this.props.currentRoom}
        </section>
        <section>
          <h2>Messages</h2>
        {
          this.state.messages
          .filter(message => message.roomId === this.props.currentRoom.key)
          .map( (message, index) =>
            <ul key={index}>
                <li>user: {message.username}</li>
                <li>message: {message.content}</li>
                <li>time sent: {message.sentAt}</li>
            </ul>
          )
        }
        </section>
      </div>
    );
  }
}

export default MessageList;
