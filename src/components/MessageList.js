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

    currentMessages(){
      var messageCondition = this.state.messages.filter(message => message.roomId === this.props.currentRoom.key);
      console.log(messageCondition);
      return messageCondition;
    }

    render() {
      return (
        <div>
          <section className="messages">
            <h2>{(this.props.currentRoom.name)}</h2>
            <nav>
              {
                this.state.messages
                .filter(message => this.props.currentRoom.key === '-'+message.roomId)
                .map((message,index) =>
                  <div
                  key={index}
                  >
                  <div>{message.content}</div>
                  <div>{message.username}</div>
                  <div>{message.sentAt}</div>
                  </div>
                )
              }
            </nav>
          </section>
        </div>
      );
    }
  }

export default MessageList;
