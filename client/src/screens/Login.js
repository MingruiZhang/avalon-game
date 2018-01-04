import React from 'react';
import { connect } from 'react-redux';
import { joinGameAction } from '../actions/preGameActions';
import { func } from 'prop-types';
import { fetchAvatar } from '../utils';
import { StyleSheet, Text, View } from 'react-native';
// import '../assets/fonts/SanFranciscoText-Regular';
/**
 * React Component
 */
class Login extends React.Component {
  static propTypes = {
    joinGame: func.isRequired
  };

  state = {
    name: '',
    avatarId: Math.floor(Math.random() * 12) + 1
  };

  handleChange = event => {
    this.setState({ name: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();

    const { joinGame } = this.props;
    const { name, avatarId } = this.state;

    joinGame({ name, avatarId });
  };

  render() {
    const { avatarId } = this.state;
    return (
      <View>
        <Text style={styles.titleSub}> Welcome to </Text>
        <Text> Avalon </Text>
        <form onSubmit={this.handleSubmit} className="login-form">
          <img
            src={fetchAvatar(avatarId)}
            role="presentation"
            height="240"
            width="240"
          />
          <label htmlFor="player-name">What's your name?</label>
          <input
            id="player-name"
            type="text"
            onChange={this.handleChange}
            placeholder="Shawn Xu"
          />
          <input type="submit" value="Submit" />
        </form>
      </View>
    );
  }
}
/**
 * Stylesheet
 */
const styles = StyleSheet.create({
  titleSub: { fontWeight: 'bold' },
  text: { fontWeight: 'bold' }
});
/**
 * Redux connect layer
 */
const mapDispatchToProps = dispatch => {
  return {
    joinGame: name => dispatch(joinGameAction(name))
  };
};

export default connect(null, mapDispatchToProps)(Login);
