import React from 'react';
import { connect } from 'react-redux';
import { array, func, string, object } from 'prop-types';
import { createEmitSocket, deduplicateJoinArray, fetchAvatar } from '../utils';
import { StyleSheet, Text, View, Image, TextInput } from 'react-native';
import * as Styles from '../styles';
import FooterButton from '../components/FooterButton';
import { onGameUpdateAction, onGameEndAction } from '../redux/game';
import Modal from 'react-responsive-modal';
import Player from '../components/Player';

import '../css/modal.css';

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
  },
  modalSection: {
    marginHorizontal: 16,
    marginVertical: 24
  },
  modalAboutYouText: {
    color: Styles.Color.White,
    fontFamily: Styles.FontFamily.SanFranciscoBold,
    fontSize: 20
  },
  colorYellow: {
    color: Styles.Color.SaffronYellow
  },
  colorLightGray: {
    color: Styles.Color.LightGray
  },
  modalOverviewText: {
    color: Styles.Color.White,
    fontFamily: Styles.FontFamily.SanFranciscoRegular,
    fontSize: 17
  },
  withIcon: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  marginBottom10: {
    marginBottom: 10
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
    gameUpdateListener: func.isRequired,
    gameEndListener: func.isRequired
  };

  constructor(props) {
    super(props);
    const { gameUpdateListener, gameEndListener, players, myKey } = props;
    gameUpdateListener();
    gameEndListener();
    const myPlayer = players.find(player => player.key === myKey);
    this.state = { myPlayer, open: true };
  }

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <View style={styles.pageContainer}>
        {this._renderHeader()}
        {this._renderProgress()}
        {this._renderCurrentStatus()}
        {this._renderInfoModal()}
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
            onClick={this.onOpenModal}
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

  _renderInfoModal() {
    const { myPlayer, open } = this.state;
    const { players } = this.props;
    const overviewInfo = myPlayer.info.overviewInfo;
    const myInfo = myPlayer.info.yourInfo;
    const goodIcon = require('../assets/icons/good.png');
    const badIcon = require('../assets/icons/evil.png');
    const myIcon = myInfo.roleIsEvil ? badIcon : goodIcon;
    return (
      <Modal
        classNames={{ modal: 'modalContainer', closeIcon: 'closeIcon' }}
        open={open}
        onClose={this.onCloseModal}
        little
      >
        {/* About you: What role you are, who do you know*/}
        <Text style={styles.sectionHeader}>ABOUT YOU</Text>
        <View style={styles.modalSection}>
          <View style={styles.withIcon}>
            <Text style={styles.modalAboutYouText}>
              <Text>You are </Text>
              <Text style={styles.colorYellow}>{myInfo.roleName}</Text>
            </Text>
            <Image source={{ uri: myIcon, height: 48, width: 48 }} />
          </View>
          <Text style={[styles.modalAboutYouText, styles.marginBottom10]}>{myInfo.knowMessage}</Text>
          {myInfo.knowPlayers ? (
            <View>
              {myInfo.knowPlayers.map(playerKey => {
                const playerInfo = players.find(player => player.key === playerKey);
                return <Player player={playerInfo} key={playerInfo.key} withReady={false} listView={true} />;
              })}
            </View>
          ) : null}
        </View>
        {/* Overview: What roles are in this game*/}
        <Text style={styles.sectionHeader}>OVERVIEW</Text>
        <View style={styles.modalSection}>
          <Text style={[styles.modalOverviewText, styles.marginBottom10]}>Total Players: {players.length}</Text>
          <View style={styles.withIcon}>
            <Image source={{ uri: goodIcon, height: 36, width: 36 }} />
            <Text style={styles.modalOverviewText}>Good Roles</Text>
          </View>
          <Text style={[styles.modalOverviewText, styles.colorLightGray, styles.marginBottom10]}>
            {deduplicateJoinArray(overviewInfo.goodList)}
          </Text>
          <View style={styles.withIcon}>
            <Image source={{ uri: badIcon, height: 36, width: 36 }} />
            <Text style={styles.modalOverviewText}>Evil Roles</Text>
          </View>
          <Text style={[styles.modalOverviewText, styles.colorLightGray]}>
            {deduplicateJoinArray(overviewInfo.evilList)}
          </Text>
        </View>
      </Modal>
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
    gameUpdateListener: () => dispatch(onGameUpdateAction()),
    gameEndListener: () => dispatch(onGameEndAction())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
