import React from 'react';
import { connect } from 'react-redux';
import { onJoinGameAction } from '../actions/preGameActions';
import { func, string } from 'prop-types';
import { createEmitSocket, fetchAvatar } from '../utils';
import { StyleSheet, Text, View, Image, TextInput } from 'react-native';
import * as Styles from '../styles';
import FooterButton from '../components/FooterButton';

/**
 * Stylesheet
 */
const styles = StyleSheet.create({
  pageContainer: {
    flex: 1
  },
  mainContent: {
    flex: 1,
    paddingTop: 100
  },
  titleSubText: {
    ...Styles.defaultTextStyles,
    paddingTop: 8,
    fontSize: 17
  },
  titleMainText: {
    color: Styles.Color.SaffronYellow,
    fontFamily: Styles.FontFamily.Homestead,
    alignSelf: 'center',
    fontSize: 32
  },
  avatarContainer: {
    alignSelf: 'center',
    marginTop: 60
  },
  nickNameInput: {
    ...Styles.defaultTextStyles,
    alignSelf: 'center',
    borderBottomColor: Styles.Color.SaffronYellow,
    borderBottomWidth: 2,
    marginTop: 60,
    paddingBottom: 6,
    outline: 'none'
  },
  inputError: {
    borderBottomColor: Styles.Color.WarningRed
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
    joinGameListener: func.isRequired
  };

  state = {
    name: '',
    onInit: true,
    avatarId: Math.floor(Math.random() * 12) + 1
  };

  constructor(props) {
    super(props);
    const { joinGameListener } = props;
    joinGameListener();
  }

  handleJoinGame = () => {
    const { name, avatarId } = this.state;

    this.setState({
      onInit: true
    });
    createEmitSocket('clientPlayerJoinedGame', { name, avatarId });
  };

  render() {
    const { avatarId, onInit } = this.state;
    const { error } = this.props;
    const showError = error && onInit;
    return (
      <View style={styles.pageContainer}>
        {/* Main Content */}
        <View style={styles.mainContent}>
          <Text style={styles.titleMainText}>Welcome to Avalon</Text>
          <Text style={styles.titleSubText}>Please set up your profile</Text>
          <View style={styles.avatarContainer}>
            <Image
              source={{
                uri: fetchAvatar(avatarId),
                height: 160,
                width: 160
              }}
            />
          </View>
          <TextInput
            style={[styles.nickNameInput, showError && styles.inputError]}
            onChangeText={text => this.setState({ name: text, onInit: false })}
            placeholder="Nickname"
            autoCapitalize="words"
          />
          {showError ? <Text style={styles.errorMessgae}>{error}</Text> : null}
        </View>
        {/* Footer */}
        <FooterButton onClick={this.handleJoinGame} buttonText="NEXT" />
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
    joinGameListener: name => dispatch(onJoinGameAction(name))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
