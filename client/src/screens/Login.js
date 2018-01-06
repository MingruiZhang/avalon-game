import React from 'react';
import { connect } from 'react-redux';
import { joinGameAction } from '../actions/preGameActions';
import { func } from 'prop-types';
import { fetchAvatar } from '../utils';
import { StyleSheet, Text, View, Image, TextInput } from 'react-native';
import * as Styles from '../styles';

import FooterButton from '../components/FooterButton';
import Footer from '../components/Footer';

/**
 * Stylesheet
 */
const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    paddingTop: 40
  },
  titleSubText: {
    ...Styles.defaultTextStyles,
    fontFamily: Styles.FontFamily.SanFranciscoBold,
    fontSize: 17
  },
  titleMainText: {
    color: Styles.Color.SaffronYellow,
    fontFamily: Styles.FontFamily.Homestead,
    alignSelf: 'center',
    fontSize: 40
  },
  avatarContainer: {
    alignSelf: 'center',
    marginTop: 32
  },
  nickNameInput: {
    ...Styles.defaultTextStyles,
    alignSelf: 'center',
    borderBottomColor: Styles.Color.SaffronYellow,
    borderBottomWidth: 2,
    marginTop: 40,
    paddingBottom: 6,
    outline: 'none'
  },
  footerButton: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  nextButtonText: {
    ...Styles.defaultTextStyles,
    fontFamily: Styles.FontFamily.SanFranciscoBold,
    backgroundColor: Styles.Color.SaffronYellow,
    color: Styles.Color.DeepGray,
    padding: 10
  }
});

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

  handleJoinGame = () => {
    const { joinGame } = this.props;
    const { name, avatarId } = this.state;

    joinGame({ name, avatarId });
  };

  render() {
    const { avatarId } = this.state;
    return (
      <View style={styles.pageContainer}>
        <Text style={styles.titleSubText}> Welcome to </Text>
        <Text style={styles.titleMainText}> Avalon </Text>
        <View style={styles.avatarContainer}>
          <Image
            source={{
              uri: fetchAvatar(avatarId),
              height: 140,
              width: 140
            }}
          />
        </View>
        <TextInput
          style={styles.nickNameInput}
          onChangeText={text => this.setState({ name: text })}
          placeholder="Nickname"
          autoCapitalize="words"
        />
        <Footer>
          <FooterButton onClick={this.handleJoinGame} buttonText="NEXT" />
        </Footer>
      </View>
    );
  }
}

/**
 * Redux connect layer
 */
const mapDispatchToProps = dispatch => {
  return {
    joinGame: name => dispatch(joinGameAction(name))
  };
};

export default connect(null, mapDispatchToProps)(Login);
