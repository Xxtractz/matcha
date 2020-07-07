import React, { Component } from "react";
import Layout from "../Layout/layout";
import {getActive} from "../../actions/user";
import { GiftedChat } from 'react-web-gifted-chat';

class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [{
        id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          id: 2,
          name: 'React',
          avatar: 'https://facebook.github.io/react/img/logo_og.png',
        },
      },],
    };
  }

  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  display() {
    return (
        <GiftedChat
        messages={this.state.messages}
        onSend={(messages) => this.onSend(messages)}
        user={{
          id: 1,
        }}
    />)
  }

  render() {
    return (
      <div>
        {getActive() === 1 ? (
          <Layout>{this.display()}</Layout>
        ) : (
          this.props.history.push(`/user`)
        )}
      </div>
    );
  }
}

export default Messages;
