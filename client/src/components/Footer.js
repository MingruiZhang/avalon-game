import React from 'react';
import { StyleSheet, View } from 'react-native';

/**
 * Stylesheet
 */
const styles = StyleSheet.create({
  footerContainer: {
    flex: 1,
    justifyContent: 'flex-end'
  }
});

/**
 * React Component
 */
export default class Footer extends React.Component {
  render() {
    const { children } = this.props;
    return <View style={styles.footerContainer}>{children}</View>;
  }
}
