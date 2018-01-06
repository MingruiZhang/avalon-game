/**
 * WARNING: THIS IS A ADMIN COMPONENT USED IN PREPARE SCREEN
 */

import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import * as Styles from '../styles';
import { createEmitSocket } from '../utils';

/**
 * Stylesheet
 */
const styles = StyleSheet.create({
  panelContainer: {
    position: 'absolute',
    top: 20,
    left: 10,
    flexDirection: 'row'
  },
  addButtonStyle: {
    backgroundColor: Styles.Color.SaffronYellow,
    height: 40,
    width: 40,
    borderRadius: '50%',
    marginRight: 10
  },
  removeButtonStyle: {
    backgroundColor: Styles.Color.DeepGray,
    height: 40,
    width: 40,
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
  render() {
    return (
      <View style={styles.panelContainer}>
        <TouchableOpacity
          style={styles.addButtonStyle}
          onPress={() => {
            createEmitSocket('clientAddDummyPlayer');
          }}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
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
