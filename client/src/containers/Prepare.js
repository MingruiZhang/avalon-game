import React, { Component } from 'react';
import { connect } from 'react-redux';
import { object, array, func } from 'prop-types';
import { onPlayersUpdateAction } from '../actions/preGameActions';

class Prepare extends Component {
  static propTypes = {
    myPlayer: object.isRequired,
    players: array.isRequired,
    messages: array.isRequired,
    playersUpdateListener: func.isRequired
  };

  constructor(props) {
    super(props);
    const { playersUpdateListener } = props;
    playersUpdateListener();
  }

  render() {
    const { players, messages } = this.props;
    return (
      <div>
        <h1>Players:</h1>
        <ul>
          {players.map((player, index) => {
            return <li key={`player-${index}`}>{player.name}</li>;
          })}
        </ul>
        <h1>Logs:</h1>
        <ul>
          {messages.map((message, index) => {
            return <li key={index}>{message}</li>;
          })}
        </ul>
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
    playersUpdateListener: () => dispatch(onPlayersUpdateAction())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Prepare);
