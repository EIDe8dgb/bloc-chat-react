import React, {Component} from 'react';

class MessageList extends Component {
  constructor(props){
    super(props);
    this.state = { messages: [] };
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
        <h3>{this.props.currentRoom.name}</h3>
        </section>
        <section>
          <h2>Messages</h2>
          <h3>{this.props.currentRoom.key}</h3>
          <h3>{console.log(this.state.messages)}</h3>
        {
          this.state.messages.map((message, index) =>
            {
              if(message.roomId == this.props.currentRoom.key) {
              <ul key={index}>
                  <li>user: {message.username}</li>
                  <li>message: {message.content}</li>
                  <li>time sent: {message.sentAt}</li>
              </ul>
            }
          }
          )

        }
        </section>
      </div>
    );
  }
}

export default MessageList;
