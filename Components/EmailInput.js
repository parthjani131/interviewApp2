import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

import colors from '../Config/Colors';

const EmailInput = props => {
  return (
    <TextInput
      style={{...styles.inputContainer, ...props.style}}
      placeholder={props.placeholder}
      placeholderTextColor={colors.lightBlack50}
      id={props.id}
      value={props.value}
      onChangeText={props.onChangeText}
      keyboardType={props.keyboardType ? props.keyboardType : 'email-address'}
      required
      email
      autoCapitalize="none"
      autoCompleteType="username"
    />
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    height: 40,
    width: '100%',
    marginTop: 10,
    marginBottom: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.lightBlack50,
    alignItems: 'center',
    color: colors.black,
  },
});

export default EmailInput;
