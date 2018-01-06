import React, { Component } from 'react';
import { connect } from 'react-redux';
import { object, array, func } from 'prop-types';
import {
  onPlayersUpdateAction,
  toggledReadyStateAction
} from '../actions/preGameActions';
import { StyleSheet, Text, View } from 'react-native';
import * as Styles from '../styles';

import Player from '../components/Player';
import FooterButton from '../components/FooterButton';
import Footer from '../components/Footer';
import AdminPanelPreGame from '../components/AdminPanelPreGame';

/**
 * Stylesheet
 */
const styles = StyleSheet.create({
  pageContainer: {
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
    myPlayer: object.isRequired,
    players: array.isRequired,
    logs: array.isRequired,
    playersUpdateListener: func.isRequired,
    toggleReadyState: func.isRequired
  };

  constructor(props) {
    super(props);
    const { playersUpdateListener } = props;
    playersUpdateListener();
  }

  renderPlayers = () => {
    const { myPlayer, players } = this.props;
    return (
      <View style={styles.playerList}>
        {players.map(player => {
          return (
            <View style={styles.playerItem} key={player.key}>
              <Player player={player} isMe={player.key === myPlayer.key} />
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
          const logStyle = [
            styles.logItem,
            styles[`fadeLevel${backwardIndex}`]
          ];
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
    const { myPlayer, toggleReadyState } = this.props;
    return (
      <View style={styles.pageContainer}>
        {myPlayer.isAdmin ? <AdminPanelPreGame /> : null}
        <Text style={styles.titleText}>New Game</Text>
        {this.renderPlayers()}
        <Footer>
          {this.renderLogs()}
          <FooterButton
            onClick={toggleReadyState}
            buttonText={myPlayer.isReady ? 'CANCEL READY' : 'READY'}
            darkMode={myPlayer.isReady ? true : false}
          />
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
    myPlayer: state.preGame.myPlayer,
    players: state.preGame.players,
    logs: state.preGame.logs
  };
};

const mapDispatchToProps = dispatch => {
  return {
    playersUpdateListener: () => dispatch(onPlayersUpdateAction()),
    toggleReadyState: () => dispatch(toggledReadyStateAction())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Prepare);
