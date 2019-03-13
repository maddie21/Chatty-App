import React, {Component} from 'react';

import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {
  // Set initial state so the component is initially "loading"
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      messages: [{
        id: 1, 
        username: "Maddie",
        content: "This is a test"
      },{
        id: 2,
        username: "Maddie",
        content: "This is another test"
      }]
    }
    this.saveNewMessage = this.saveNewMessage.bind(this);
    this.saveNewUsername = this.saveNewUsername.bind(this);
  }

  saveNewMessage(message) {
    if(message) {
      const { messages, currentUser } = this.state;
      const lastMessage = messages[messages.length - 1];
      messages.push({
        id: lastMessage.id + 1,
        username: currentUser,
        content: message
      });
      this.setState({messages: messages});
    }
  }

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
