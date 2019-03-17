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
      const { type, username, content } = message;
    return (
      <div>
        {type === 'message' && <div className={"message"}>
            <span className={"message-username"}>{username}</span>
            <span className={"message-content"}>
            {content}</span>
        </div>}
        {type === 'notification' && <div className={"message system"}>
          {content}
        </div>}
      </div>
    );
  }
}
