import React from 'react';
import { object, bool } from 'prop-types';
import { fetchAvatar } from '../utils';

export default class Player extends React.Component {
  static propTypes = {
    isMe: bool.isRequired,
    player: object.isRequired
  };

  render() {
    const { isMe, player } = this.props;
    return (
      <div>
        <div>
          <img
            src={fetchAvatar(player.avatarId)}
            role="presentation"
            height="24"
            width="24"
          />
          <span>{player.name}</span>
          {player.isReady ? <span> - isReady </span> : null}
          {isMe ? <span> --me </span> : null}
        </div>
      </div>
    );
  }
}
