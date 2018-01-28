import React from 'react';
import { object, bool } from 'prop-types';
import { fetchAvatar } from '../utils';
import { StyleSheet, Text, View, Image } from 'react-native';
import * as Styles from '../styles';

/**
 * Stylesheet
 */
const styles = StyleSheet.create({
  nameText: {
    ...Styles.defaultTextStyles,
    fontSize: 17,
    paddingTop: 10
  },
  listNameText: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 'auto'
  },
  componentContainer: {
    paddingTop: 30
  },
  listContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10
  },
  avatarContainer: {
    alignSelf: 'center'
  },
  isMeBorder: {
    borderColor: Styles.Color.SaffronYellow,
    borderWidth: 3,
    borderRadius: '50%'
  },
  isMeText: {
    color: Styles.Color.SaffronYellow,
    fontFamily: Styles.FontFamily.SanFranciscoBold,
    paddingTop: 6
  },
  isReadyLabel: {
    ...Styles.defaultTextStyles,
    color: Styles.Color.DeepGray,
    fontFamily: Styles.FontFamily.SanFranciscoBold,
    fontSize: 11,
    position: 'absolute',
    backgroundColor: Styles.Color.SaffronYellow,
    borderRadius: 4,
    paddingTop: 1,
    paddingBottom: 1,
    paddingLeft: 5,
    paddingRight: 5,
    bottom: 24,
    alignSelf: 'center'
  }
});

/**
 * React Component
 */
export default class Player extends React.Component {
  static propTypes = {
    isMe: bool,
    withReady: bool,
    listView: bool,
    player: object.isRequired
  };

  static defaultProps = {
    isMe: false,
    listView: false,
    withReady: true
  };

  render() {
    const { isMe, player, withReady, listView } = this.props;
    const avatarSize = listView ? 32 : 50;
    return (
      <View style={[styles.componentContainer, listView && styles.listContainer]}>
        <View style={[styles.avatarContainer, isMe && styles.isMeBorder]}>
          <Image
            source={{
              uri: fetchAvatar(player.avatarId),
              height: avatarSize,
              width: avatarSize
            }}
          />
        </View>
        {player.isReady && withReady ? <Text style={styles.isReadyLabel}>Ready</Text> : null}
        <Text numberOfLines={1} style={[styles.nameText, isMe && styles.isMeText, listView && styles.listNameText]}>
          {player.name}
        </Text>
      </View>
    );
  }
}
