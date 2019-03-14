import React, {Component} from 'react';

import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {
  // Set initial state so the component is initially "loading"
  constructor(props) {
    super(props);
    this.socket = null;
    this.state = {
      currentUser: null,
      messages: []
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
      const currentMessages = this.state.messages;
      currentMessages.push(message);
      this.setState({messages: currentMessages})
    }
  }

  // function for the user to save a new message 
  saveNewMessage(message) {
    if(message) {
      const { currentUser } = this.state;
      const newMessage = {
        username: currentUser,
        content: message
      };
      this.socket.send(JSON.stringify(newMessage));
    }
  }

  // function to save a new user name 
  saveNewUsername(username) {
    if(username) {
      this.setState({currentUser: username});
    }
  }

  render() {
    const { currentUser, messages } = this.state;
    return (
      <div>
        <nav className={"navbar"}>
          <a href="/" className={"navbar-brand"}>Chatty</a>
        </nav>
        <ChatBar onNewUsername={this.saveNewUsername} onNewMessage={this.saveNewMessage} currentUser={currentUser}/>
        <MessageList messages={messages} />
      </div>
    );
  }
}
export default App;
