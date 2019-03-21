import React, {Component} from 'react';

class MessageList extends Component {
  constructor(props){
    super(props);
    this.state = { messages: [], newMessage:'' };
    this.messagesRef = this.props.firebase.database().ref('messages');
  }

  componentDidMount() {
        this.messagesRef.on('child_added', snapshot => {
            const message = snapshot.val();
            message.key = snapshot.key;
            this.setState({ messages: this.state.messages.concat( message ) })
        });
    }

    handleNewMessage(e){
      this.setState({newMessage: e.target.value});
    }

    createMessage(e){
      e.preventDefault();
      if(!this.state.newMessage){return}
      const currentUser = this.props.user === null ? "Guest" : this.props.user.displayName;
      const newestMessage = {
        content: this.state.newMessage,
        roomId: this.props.currentRoom.key,
        sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
        username: currentUser
      };
      this.messagesRef.push(newestMessage);
      this.setState({newMessage: ''});
    }

    render() {
      return (
        <div>
          <section className="messages">
            <h2>{(this.props.currentRoom.name)}</h2>
            <h2>{(this.props.currentRoom.key)}</h2>
            <nav>
              {
                this.state.messages
                .filter(message => this.props.currentRoom.key === message.roomId)
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
          <section>
          <form onSubmit={(e)=> this.createMessage(e)}>
            <label htmlFor='newMessageText'>Create a new message</label>
            <textarea
            id ='newMessageText'
            type ='text'
            placeholder ='enter new message here...'
            value = {this.state.newMessage}
            onChange={(e)=> this.handleNewMessage(e)}
            rows='5'
            cols='50'
            >
            </textarea>
            <input
            type = 'submit'
            />
          </form>
          </section>
        </div>
      );
    }
  }

export default MessageList;
