import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';

import colors from '../Config/Colors';

const SubmitButton = props => {
  return (
    <TouchableOpacity
      style={styles.buttonView}
      activeOpacity={props.opacity ? props.opacity : 0.6}
      onPress={props.onPress}>
      {props.isLoading ? (
        <ActivityIndicator size="small" color={colors.white} />
      ) : (
        <Text style={{...styles.buttonText, ...props.style}}>
          {props.children}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonView: {
    height: 45,
    justifyContent: 'center',
    backgroundColor: colors.buttonColor,
    borderRadius: 10,
  },
  buttonText: {
    color: colors.white,
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default SubmitButton;
