import React, { Component } from 'react';
import { connect } from 'react-redux';
import { array, func, string } from 'prop-types';
import { createEmitSocket, onPlayersUpdateAction } from '../redux/player';
import { onGameStartAction } from '../redux/game';
import { StyleSheet, Text, View } from 'react-native';
import * as Styles from '../styles';

import Player from '../components/Player';
import FooterButton from '../components/FooterButton';
import AdminPanelPreGame from '../components/AdminPanelPreGame';

/**
 * Stylesheet
 */
const styles = StyleSheet.create({
  pageContainer: {
    flex: 1
  },
  mainContent: {
    flex: 1,
    paddingTop: 30
  },
  titleText: {
    ...Styles.defaultTextStyles,
    fontFamily: Styles.FontFamily.SanFranciscoBold
  },
  playerList: {
    paddingLeft: 30,
    paddingRight: 30,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  playerItem: {
    width: '33%'
  },
  logItem: {
    ...Styles.defaultTextStyles,
    fontSize: 14,
    paddingBottom: 10
  },
  errorLog: {
    color: Styles.Color.WarningRed
  },
  importantLog: {
    color: Styles.Color.SaffronYellow,
    fontFamily: Styles.FontFamily.SanFranciscoBold
  },
  fadeLevel3: {
    opacity: 0.3
  },
  fadeLevel2: {
    opacity: 0.5
  },
  fadeLevel1: {
    opacity: 0.8
  },
  fadeLevel0: {
    opacity: 1
  }
});

/**
 * React Component
 */
class Prepare extends Component {
  static propTypes = {
    myName: string.isRequired,
    players: array.isRequired,
    logs: array.isRequired,
    createEmitSocket: func.isRequired,
    onPlayersUpdateAction: func.isRequired,
    onGameStartAction: func.isRequired
  };

  constructor(props) {
    super(props);
    const { onPlayersUpdateAction, onGameStartAction } = props;
    onPlayersUpdateAction();
    onGameStartAction();
  }

  renderPlayers = () => {
    const { myName, players } = this.props;
    return (
      <View style={styles.playerList}>
        {players.map(player => {
          return (
            <View style={styles.playerItem} key={player.name}>
              <Player player={player} isMe={player.name === myName} />
            </View>
          );
        })}
      </View>
    );
  };

  renderLogs = () => {
    const { logs } = this.props;
    return (
      <View style={styles.logContainer}>
        {logs.map((log, index) => {
          const backwardIndex = logs.length - 1 - index;
          // log styles (opacity + color)
          const logStyle = [styles.logItem, styles[`fadeLevel${backwardIndex}`]];
          if (log.type === 'error') {
            logStyle.push(styles.errorLog);
          } else if (log.type === 'important') {
            logStyle.push(styles.importantLog);
          }
          return (
            <Text style={logStyle} key={index}>
              {log.message}
            </Text>
          );
        })}
      </View>
    );
  };

  render() {
    const { myName, players, createEmitSocket } = this.props;
    const myPlayer = players.find(player => player.name === myName);
    return (
      <View style={styles.pageContainer}>
        {/* Main Content */}
        <View style={styles.mainContent}>
          {myPlayer.isAdmin ? <AdminPanelPreGame createEmitSocket={createEmitSocket} /> : null}
          <Text style={styles.titleText}>New Game</Text>
          {this.renderPlayers()}
        </View>
        {/* Footer */}
        <View>
          {this.renderLogs()}
          <FooterButton
            onClick={() => {
              createEmitSocket('clientPlayerToggleReady', { isReady: !myPlayer.isReady });
            }}
            buttonText={myPlayer.isReady ? 'CANCEL READY' : 'READY'}
            darkMode={myPlayer.isReady ? true : false}
          />
        </View>
      </View>
    );
  }
}

/**
 * Redux connect layer
 */
const mapStateToProps = state => {
  return {
    myName: state.player.myName,
    players: state.player.players,
    logs: state.player.logs
  };
};

const mapDispatchToProps = {
  createEmitSocket: createEmitSocket,
  onPlayersUpdateAction: onPlayersUpdateAction,
  onGameStartAction: onGameStartAction
};

export default connect(mapStateToProps, mapDispatchToProps)(Prepare);
