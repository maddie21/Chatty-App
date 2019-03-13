import React, {Component} from 'react';

export default class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.saveNewMessage = this.saveNewMessage.bind(this);
    this.saveNewUsername = this.saveNewUsername.bind(this);
  }

  saveNewMessage(e) {
    const { onNewMessage } = this.props;
    if(e.key === 'Enter') {
        onNewMessage(e.target.value)
        e.target.value = '';
    }
  }

  saveNewUsername(e) {
    const { onNewUsername } = this.props;
    if(e.key === 'Enter') {
        onNewUsername(e.target.value);
    }
  }

  render() {
      const { currentUser } = this.props;
    return (
        <footer className={"chatbar"}>
            <input 
                type="text" 
                className={"chatbar-username"} 
                placeholder="Your Name (Optional)" 
                defaultValue={currentUser}
                onKeyPress={this.saveNewUsername}
            />
            <input
                className={"chatbar-message"}
                type="text"
                placeholder="Type a message and hit ENTER"
                onKeyPress={this.saveNewMessage}
            />
        </footer>
    );
  }
}
