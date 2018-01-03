import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Prepare from './Prepare';
import Login from './Login';

class Main extends Component {
  render() {
    const { joinedGame } = this.props;
    return (
      <BrowserRouter>
        <Route path="/" render={() => (joinedGame ? <Prepare /> : <Login />)} />
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    joinedGame: state.preGame.joinedGame
  };
};

export default connect(mapStateToProps)(Main);