import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Prepare from './Prepare';
import Login from './Login';
import Game from './Game';

class Main extends Component {
  render() {
    const { joinedGame, gameStarted } = this.props;
    return (
      <BrowserRouter>
        <Route
          path="/"
          render={() => {
            if (gameStarted) {
              return <Game />;
            } else {
              return joinedGame ? <Prepare /> : <Login />;
            }
          }}
        />
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    joinedGame: state.preGame.joinedGame,
    gameStarted: state.game.gameStarted
  };
};

export default connect(mapStateToProps)(Main);
