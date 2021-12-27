import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Keyboard,
  StyleSheet,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Card from '../Components/Card';
import EmailInput from '../Components/EmailInput';
import PasswordInput from '../Components/PasswordInput';
import SubmitButton from '../Components/SubmitButton';
import colors from '../Config/Colors';
import * as actions from '../Store/actions';

const RegisterScreen = props => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      Alert.alert('An Error Occurred', error, [
        {
          text: 'Okay',
        },
      ]);
    }
  }, [error]);

  const registerHandler = async () => {
    Keyboard.dismiss();
    if (
      (username && email && password && confirmPassword && phoneNumber) !== ''
    ) {
      console.log('in registerHandler');
      if (password !== confirmPassword) {
        Alert.alert(
          "Passwords Don't Match",
          'Password and Confirm Password should be similar to Register!',
          [
            {
              text: 'Okay',
            },
          ],
        );
      } else {
        const userData = await AsyncStorage.getItem(username);
        if (userData) {
          Alert.alert('Already Registered!', 'User has already registered!', [
            {
              text: 'Okay',
              onPress: () => {
                setUsername('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
                setPhoneNumber('');
              },
            },
          ]);
        } else {
          await AsyncStorage.setItem(
            username,
            JSON.stringify({
              savedUsername: username,
              savedEmail: email,
              savedPassword: password,
              savedPhoneNumber: phoneNumber,
            }),
          );
          Alert.alert(
            'Registration Successful!',
            'User successfully registered!',
            [
              {
                text: 'Okay',
                onPress: () => {
                  setUsername('');
                  setEmail('');
                  setPassword('');
                  setConfirmPassword('');
                  setPhoneNumber('');
                  props.navigation.navigate('Login');
                },
              },
            ],
          );
        }
      }
    } else {
      Alert.alert('Empty Field(s)', 'All fields are required to Register!', [
        {
          text: 'Okay',
        },
      ]);
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.root}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}>
      <View style={styles.screen}>
        <Card style={styles.loginCard}>
          <Text style={styles.titleText}>Register</Text>

          <EmailInput
            placeholder="Please Enter Username"
            id="username"
            value={username}
            onChangeText={text => setUsername(text)}
          />

          <EmailInput
            placeholder="Please Enter E-mail"
            id="email"
            value={email}
            onChangeText={text => setEmail(text)}
          />

          <PasswordInput
            placeholder="Please Enter Password"
            id="password"
            value={password}
            onChangeText={text => setPassword(text)}
          />

          <PasswordInput
            placeholder="Please Confrim Password"
            id="confirmPassword"
            value={confirmPassword}
            onChangeText={text => setConfirmPassword(text)}
          />
          {password !== confirmPassword && (
            <Text style={styles.validationText}>
              Both passwords don't match!
            </Text>
          )}

          <EmailInput
            placeholder="Please Enter Phone Number"
            keyboardType="number-pad"
            id="phoneNumber"
            value={phoneNumber}
            onChangeText={text => setPhoneNumber(text)}
          />

          <View style={styles.submitButton}>
            <SubmitButton isLoading={isLoading} onPress={registerHandler}>
              Register
            </SubmitButton>
          </View>
        </Card>
        <TouchableOpacity
          style={styles.switchText}
          activeOpacity={0.6}
          onPress={() => {
            setUsername('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setPhoneNumber('');
            props.navigation.navigate('Login');
          }}>
          <Text style={styles.commonText}>Switch to Login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    flexGrow: 1,
  },
  screen: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  loginCardContainer: {
    height: '60%',
    // justifyContent: 'flex-end',
  },
  loginCard: {
    width: '80%',
    // height: '50%',
    backgroundColor: colors.cardBackground,
    padding: 20,
  },
  titleText: {
    color: colors.textColor,
    fontSize: 40,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  commonText: {
    fontSize: 16,
    color: colors.buttonColor,
    fontWeight: 'bold',
  },
  validationText: {
    fontSize: 12,
    color: colors.validationText,
  },
  switchText: {
    marginTop: 30,
  },
  submitButton: {
    marginTop: 10,
  },
});

export default RegisterScreen;
