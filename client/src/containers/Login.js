import React from 'react';
import { connect } from 'react-redux';
import { joinGameAction } from '../actions/preGameActions';
import { func } from 'prop-types';

class Login extends React.Component {
  static propTypes = {
    joinGame: func.isRequired
  };

  state = {
    name: ''
  };

  handleChange = event => {
    this.setState({ name: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();

    const { joinGame } = this.props;
    const { name } = this.state;

    joinGame({ name });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="login-form">
          <label htmlFor="player-name">What's your name?</label>
          <input id="player-name" type="text" onChange={this.handleChange} placeholder="Shawn Xu" />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    joinGame: name => dispatch(joinGameAction(name))
  };
};

export default connect(null, mapDispatchToProps)(Login);
