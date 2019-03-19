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

    render() {
      return (
        <div>
          <section className="messages">
            <p>{this.props.currentRoom.name}</p>
            <ul>
              {this.state.messages
                .filter(message => message.roomId === this.props.currentRoom.key)
                .map((message, index) => {
                  return (
                    <li key={index}>
                      {message.username}
                      {message.content}
                    </li>
                  );
                })}
            </ul>
          </section>
        </div>
      );
    }
  }

export default MessageList;
