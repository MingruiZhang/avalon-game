import React, { Component } from 'react';
import { connect } from 'react-redux';
import { object, array, func } from 'prop-types';
import {
  onPlayersUpdateAction,
  toggledReadyStateAction
} from '../actions/preGameActions';
import Player from '../components/Player';

class Prepare extends Component {
  static propTypes = {
    myPlayer: object.isRequired,
    players: array.isRequired,
    messages: array.isRequired,
    playersUpdateListener: func.isRequired,
    toggleReadyState: func.isRequired
  };

  constructor(props) {
    super(props);
    const { playersUpdateListener } = props;
    playersUpdateListener();
  }

  renderPlayers = () => {
    const { myPlayer, players } = this.props;
    return (
      <div>
        <h3>Players:</h3>
        <div>
          {players.map(player => {
            return (
              <Player
                key={`player-${player.playerId}`}
                player={player}
                isMe={player.playerId === myPlayer.playerId}
              />
            );
          })}
        </div>
      </div>
    );
  };

  renderLogs = () => {
    const { messages } = this.props;
    return (
      <div>
        <h3>Logs:</h3>
        <ul>
          {messages.map((message, index) => {
            return <li key={index}>{message}</li>;
          })}
        </ul>
      </div>
    );
  };

  render() {
    const { myPlayer, toggleReadyState } = this.props;
    return (
      <div>
        {this.renderPlayers()}
        <button onClick={toggleReadyState}>
          {myPlayer.isReady ? "I'm not ready" : "I'm ready"}
        </button>
        {this.renderLogs()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    myPlayer: state.preGame.myPlayer,
    players: state.preGame.players,
    messages: state.preGame.messages
  };
};

const mapDispatchToProps = dispatch => {
  return {
    playersUpdateListener: () => dispatch(onPlayersUpdateAction()),
    toggleReadyState: () => dispatch(toggledReadyStateAction())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Prepare);
