import React from 'react';
import { func, string, bool } from 'prop-types';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import * as Styles from '../styles';

/**
 * Stylesheet
 */
const styles = StyleSheet.create({
  button: {
    ...Styles.defaultTextStyles,
    fontFamily: Styles.FontFamily.SanFranciscoBold,
    backgroundColor: Styles.Color.SaffronYellow,
    borderRadius: 8,
    color: Styles.Color.DeepGray,
    padding: 16,
    margin: 12
  },
  darkMode: {
    fontFamily: Styles.FontFamily.SanFranciscoRegular,
    backgroundColor: Styles.Color.DeepGray,
    color: Styles.Color.White
  }
});

/**
 * React Component
 */
export default class FooterButton extends React.Component {
  static propTypes = {
    onClick: func.isRequired,
    buttonText: string.isRequired,
    darkMode: bool
  };

  render() {
    const { onClick, buttonText, darkMode } = this.props;
    const buttonStyle = darkMode ? [styles.button, styles.darkMode] : styles.button;
    return (
      <TouchableOpacity onPress={onClick}>
        <Text style={buttonStyle}>{buttonText}</Text>
      </TouchableOpacity>
    );
  }
}
