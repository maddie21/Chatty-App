import React, {Component} from 'react';

import Message from './Message.jsx';

export default class MessageList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
      const { messages } = this.props;
    return (
        <main className={"messages"}>
            {messages.map((message) => <Message key={message.id} message={message} />)}
        </main>
    );
  }
}
