import React from 'react';
import { connect } from 'react-redux';
import { joinGameAction } from '../actions/preGameActions';
import { func, string } from 'prop-types';
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
  inputError: {
    borderBottomColor: Styles.Color.WarningRed
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
  },
  errorMessgae: {
    ...Styles.defaultTextStyles,
    fontSize: 17,
    color: Styles.Color.WarningRed,
    marginTop: 8
  }
});

/**
 * React Component
 */
class Login extends React.Component {
  static propTypes = {
    error: string,
    joinGame: func.isRequired
  };

  state = {
    name: '',
    onInit: true,
    avatarId: Math.floor(Math.random() * 12) + 1
  };

  handleJoinGame = () => {
    const { joinGame } = this.props;
    const { name, avatarId } = this.state;

    this.setState({
      onInit: true
    });

    joinGame({ name, avatarId });
  };

  render() {
    const { avatarId, onInit } = this.state;
    const { error } = this.props;
    const showError = error && onInit;
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
          style={
            showError
              ? [styles.nickNameInput, styles.inputError]
              : styles.nickNameInput
          }
          onChangeText={text => this.setState({ name: text, onInit: false })}
          placeholder="Nickname"
          autoCapitalize="words"
        />
        {showError ? <Text style={styles.errorMessgae}>{error}</Text> : null}
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
const mapStateToProps = state => {
  return {
    error: state.preGame.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    joinGame: name => dispatch(joinGameAction(name))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
