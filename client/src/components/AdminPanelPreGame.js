/**
 * WARNING: THIS IS A ADMIN COMPONENT USED IN PREPARE SCREEN
 */

import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import * as Styles from '../styles';
import { func } from 'prop-types';

/**
 * Stylesheet
 */
const styles = StyleSheet.create({
  panelContainer: {
    position: 'fixed',
    bottom: 200,
    right: 10,
    zIndex: 10
  },
  addButtonStyle: {
    backgroundColor: Styles.Color.SaffronYellow,
    height: 40,
    width: 40,
    borderRadius: '50%',
    margin: 10
  },
  removeButtonStyle: {
    backgroundColor: Styles.Color.DeepGray,
    height: 40,
    width: 40,
    margin: 10,
    borderRadius: '50%'
  },
  buttonText: {
    ...Styles.defaultTextStyles,
    fontFamily: Styles.FontFamily.SanFranciscoBold,
    paddingTop: 6
  }
});

/**
 * React Component
 */
export default class AdminPanelPreGame extends React.Component {
  static propTypes = {
    createEmitSocket: func.isRequired,
  };
  render() {
    const { createEmitSocket } = this.props;
    return (
      <View style={styles.panelContainer}>
        {/* Add Dummy Player */}
        <TouchableOpacity
          style={styles.addButtonStyle}
          onPress={() => {
            createEmitSocket('clientAddDummyPlayer');
          }}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
        {/* Remove Dummy Player */}
        <TouchableOpacity
          style={styles.removeButtonStyle}
          onPress={() => {
            createEmitSocket('clientRemoveDummyPlayer');
          }}
        >
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
