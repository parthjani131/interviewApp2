import React, {useState} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import colors from '../Config/Colors';

const PasswordInput = props => {
  const [passwordSecure, setPasswordSecure] = useState(true);

  return (
    <View style={{...styles.passwordView, ...props.style}}>
      <TextInput
        style={styles.passwordInput}
        placeholder={props.placeholder}
        placeholderTextColor={colors.lightBlack50}
        id={props.id}
        value={props.value}
        onChangeText={props.onChangeText}
        keyboardType="default"
        secureTextEntry={passwordSecure}
        required
        autoCapitalize="none"
      />
      {passwordSecure ? (
        <Icon
          name="eye-outline"
          size={18}
          color={colors.lightBlack50}
          style={styles.eyeIcon}
          onPress={() => {
            setPasswordSecure(!passwordSecure);
          }}
        />
      ) : (
        <Icon
          name="eye-off-outline"
          size={18}
          color={colors.lightBlack50}
          style={styles.eyeIcon}
          onPress={() => {
            setPasswordSecure(!passwordSecure);
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  passwordView: {
    flexDirection: 'row',
    height: 40,
    width: '100%',
    marginTop: 10,
    marginBottom: 5,
    paddingLeft: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.lightBlack50,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  passwordInput: {
    color: colors.black,
    height: 40,
    width: '90%',
  },
  eyeIcon: {
    width: '10%',
  },
});

export default PasswordInput;
