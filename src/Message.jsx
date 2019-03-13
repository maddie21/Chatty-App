import React, {Component} from 'react';

export default class Message extends Component {
  constructor(props) {
    super(props);
    /*
    {
        username: "Maddie",
        message: "Hi this is Maddie"
    }
    */
  }

  render() {
      const { message } = this.props;
    return (
        <div className={"message"}>
            <span className={"message-username"}>{message.username}</span>
            <span className={"message-content"}>
            {message.content}</span>
        </div>
    );
  }
}
