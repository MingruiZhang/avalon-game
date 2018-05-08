import React from 'react';
import { bool, string } from 'prop-types';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Prepare from './Prepare';
import Login from './Login';
import Game from './Game';

class Main extends React.Component {
  static propTypes = {
    myName: string,
    gameStarted: bool.isRequired
  };

  render() {
    const { myName, gameStarted } = this.props;
    return (
      <BrowserRouter>
        <Route
          path="/"
          render={() => {
            if (gameStarted) {
              return <Game />;
            } else {
              return myName ? <Prepare /> : <Login />;
            }
          }}
        />
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    myName: state.player.myName,
    gameStarted: state.game.gameStarted
  };
};

export default connect(mapStateToProps)(Main);
