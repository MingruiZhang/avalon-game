import React from 'react';
import { connect } from 'react-redux';
import { array, func, string, object } from 'prop-types';
import { createEmitSocket, fetchAvatar } from '../utils';
import { StyleSheet, Text, View, Image, TextInput } from 'react-native';
import * as Styles from '../styles';
import FooterButton from '../components/FooterButton';
import { onGameUpdateAction } from '../actions/gameActions';

/**
 * Stylesheet
 */
const styles = StyleSheet.create({
  pageContainer: {
    flex: 1
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(28, 27, 27, 1)',
    boxShadow: '0 0 4px rgba(0,0,0,0.5)'
  },
  headerSubContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  headerAvatar: {
    marginVertical: 12,
    marginLeft: 20,
    marginRight: 12
  },
  headerName: {
    ...Styles.defaultTextStyles,
    fontSize: 17
  },
  headerInfo: {
    marginRight: 20
  },
  progressContainer: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20
  },
  sectionHeader: {
    ...Styles.defaultTextStyles,
    fontSize: 13,
    textAlign: 'left'
  },
  progressState: {
    paddingTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  roundItem: {
    height: 48,
    width: 48,
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  roundItemText: {
    ...Styles.defaultTextStyles,
    fontSize: 28,
    fontFamily: Styles.FontFamily.SanFranciscoBold
  },
  currentStateContainer: {
    paddingHorizontal: 20
  }
});

/**
 * React Component
 */
class Game extends React.Component {
  static propTypes = {
    myKey: string.isRequired,
    players: array.isRequired,
    gameSetup: object.isRequired,
    gameUpdateListener: func.isRequired
  };

  constructor(props) {
    super(props);
    const { gameUpdateListener, players, myKey } = props;
    gameUpdateListener();
    const myPlayer = players.find(player => player.key === myKey);
    this.state = { myPlayer };
  }

  render() {
    return (
      <View style={styles.pageContainer}>
        {this._renderHeader()}
        {this._renderProgress()}
        {this._renderCurrentStatus()}
      </View>
    );
  }

  _renderHeader() {
    const { myPlayer } = this.state;
    return (
      <View style={styles.headerContainer}>
        <View style={styles.headerSubContainer}>
          <Image
            style={styles.headerAvatar}
            source={{
              uri: fetchAvatar(myPlayer.avatarId),
              height: 32,
              width: 32
            }}
          />
          <Text style={styles.headerName}>{myPlayer.name}</Text>
        </View>
        <View style={styles.headerSubContainer}>
          <Image
            style={styles.headerInfo}
            source={{
              uri: require('../assets/icons/info.png'),
              height: 22,
              width: 22
            }}
          />
        </View>
      </View>
    );
  }

  _renderProgress() {
    const { gameSetup } = this.props;
    return (
      <View style={styles.progressContainer}>
        <Text style={styles.sectionHeader}>PROGESS</Text>
        <View style={styles.progressState}>
          {gameSetup.rounds.map((round, index) => {
            return (
              <View style={styles.roundItem} key={index}>
                <Text style={styles.roundItemText}>{round}</Text>
              </View>
            );
          })}
        </View>
      </View>
    );
  }

  _renderCurrentStatus() {
    const { gameSetup, gameState } = this.props;
    return (
      <View style={styles.currentStateContainer}>
        <Text style={styles.sectionHeader}>STATUS</Text>
      </View>
    );
  }
}

/**
 * Redux connect layer
 */
const mapStateToProps = state => {
  return {
    myKey: state.preGame.myKey,
    players: state.preGame.players,
    gameSetup: state.game.gameSetup,
    gameState: state.game.gameState
  };
};

const mapDispatchToProps = dispatch => {
  return {
    gameUpdateListener: () => dispatch(onGameUpdateAction())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
