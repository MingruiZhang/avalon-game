import React from 'react';
import { connect } from 'react-redux';
import { joinGameAction } from '../actions/preGameActions';
import { func } from 'prop-types';
import { fetchAvatar } from '../utils';
import { StyleSheet, Text, View, Image, TextInput, Button } from 'react-native';
import * as Styles from '../styles';

/**
 * Stylesheet
 */
const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    paddingTop: 80
  },
  titleSubText: {
    ...Styles.defaultTextStyles,
    fontFamily: Styles.FontFamily.SanFranciscoBold,
    fontSize: 16
  },
  titleMainText: {
    color: Styles.Color.SaffronYellow,
    fontFamily: Styles.FontFamily.Homestead,
    alignSelf: 'center',
    fontSize: 40,
    paddingTop: 10
  },
  avatarContainer: {
    alignSelf: 'center',
    paddingTop: 60
  },
  nickNameInput: {
    ...Styles.defaultTextStyles,
    alignSelf: 'center',
    borderBottomColor: Styles.Color.SaffronYellow,
    borderBottomWidth: 1,
    marginTop: 60,
    paddingBottom: 10,
    textAlign: 'center'
  },
  pageFooter: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  nextButtonText: {
    fontFamily: Styles.FontFamily.SanFranciscoBold,
    fontSize: 20,
    color: Styles.Color.DeepGray
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
          autoFocus={true}
          onChangeText={text => this.setState({ name: text })}
          placeholder="Nickname"
          autoCapitalize="words"
        />
        <View style={styles.pageFooter}>
          <View style={styles.nextButtonContainer}>
            <Button
              style={styles.nextButton}
              onPress={this.handleJoinGame}
              color={Styles.Color.SaffronYellow}
              title="next"
            />
          </View>
        </View>
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
