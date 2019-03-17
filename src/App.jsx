import React, {Component} from 'react';

import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {
  // Set initial state so the component is initially "loading"
  constructor(props) {
    super(props);
    this.socket = null;
    this.state = {
      currentUser: 'Anonymous',
      messages: [],
      activeUsers: 1
    }
    this.saveNewMessage = this.saveNewMessage.bind(this);
    this.saveNewUsername = this.saveNewUsername.bind(this);
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001");
    this.socket.onopen = () => {
      console.log('Connected to server');
    }
    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      const { type, content } = message;
      switch(type) {
        case 'message':
        case 'notification':
          const currentMessages = this.state.messages;
          currentMessages.push(message);
          this.setState({messages: currentMessages})
          break;
        case 'activeUsers':
          this.setState({activeUsers: content});
          break;
        default:
          break;
      }
    }
  }

  // function for the user to enter a new message 
  saveNewMessage(message) {
    if(message) {
      const { currentUser } = this.state;
      const newMessage = {
        type: "newMessage",
        username: currentUser,
        content: message
      };
      this.socket.send(JSON.stringify(newMessage));
    }
  }

  // function to send messages. If user is not the current user, notifications are sent when the username is switched
  saveNewUsername(username) {
    const { currentUser } = this.state;
    if(username && username !== currentUser) {
      const serverNotification = {
        type: "newNotification",
        content: `${currentUser} changed their name to ${username}`
      }
      this.setState({currentUser: username});
      this.socket.send(JSON.stringify(serverNotification));
    }
  }

  render() {
    const { currentUser, messages, activeUsers } = this.state;
    return (
      <div>
        <nav className={"navbar"}>
          <a href="/" className={"navbar-brand"}>Chatty</a>
          <p className={"active-users"}>{activeUsers} users online</p>
        </nav>
        <ChatBar onNewUsername={this.saveNewUsername} onNewMessage={this.saveNewMessage} currentUser={currentUser}/>
        <MessageList messages={messages} />
      </div>
    );
  }
}
export default App;
