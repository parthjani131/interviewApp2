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

const LoginScreen = props => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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

  useEffect(() => {
    checkLoginUser();
  }, []);

  useEffect(() => {
    const onFocus = props.navigation.addListener('didFocus', () => {
      console.log('in Login Screen');
      checkLoginUser();
    });
  }, [props.navigation]);

  const checkLoginUser = async () => {
    const loginUser = await AsyncStorage.getItem('loginUser');
    if (loginUser) {
      console.log('in loginUser available');
      props.navigation.replace('Profile');
    }
  };

  const loginHandler = async () => {
    Keyboard.dismiss();
    console.log(username, password);
    if ((username && password) !== '') {
      console.log('in loginHandler');
      const loginUser = await AsyncStorage.getItem(username);
      const transformedData = JSON.parse(loginUser);
      console.log(transformedData);
      if (!loginUser) {
        Alert.alert('Invalid Username!', 'No user with this Username found!', [
          {
            text: 'Okay',
            onPress: () => {
              setUsername('');
              setPassword('');
            },
          },
        ]);
      } else {
        if (
          username === transformedData.savedUsername &&
          password === transformedData.savedPassword
        ) {
          await AsyncStorage.setItem(
            'loginUser',
            JSON.stringify({
              savedUsername: transformedData.savedUsername,
              savedEmail: transformedData.savedEmail,
              savedPassword: transformedData.savedPassword,
              savedPhoneNumber: transformedData.savedPhoneNumber,
            }),
          );
          Alert.alert('Login Successful!', 'User successfully Logged In!', [
            {
              text: 'Okay',
              onPress: () => {
                setUsername('');
                setPassword('');
                props.navigation.navigate('Home');
              },
            },
          ]);
        } else {
          Alert.alert('Login Failed!', 'Invalid login details!', [
            {
              text: 'Okay',
              onPress: () => {
                setUsername('');
                setPassword('');
              },
            },
          ]);
        }
      }
    } else {
      Alert.alert('Empty Field(s)', 'All fields are required to Login!', [
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
          <Text style={styles.titleText}>Login</Text>

          <EmailInput
            placeholder="Please Enter E-mail"
            id="username"
            value={username}
            onChangeText={text => setUsername(text)}
          />

          <PasswordInput
            placeholder="Please Enter Password"
            id="password"
            value={password}
            onChangeText={text => setPassword(text)}
          />

          <View style={styles.submitButton}>
            <SubmitButton isLoading={isLoading} onPress={loginHandler}>
              Login
            </SubmitButton>
          </View>
        </Card>
        <TouchableOpacity
          style={styles.switchText}
          activeOpacity={0.6}
          onPress={() => {
            setName('');
            setUsername('');
            setPassword('');
            props.navigation.navigate('Register');
          }}>
          <Text style={styles.commonText}>Switch to Sign Up</Text>
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
  switchText: {
    marginTop: 30,
  },
  submitButton: {
    marginTop: 10,
  },
});

export default LoginScreen;
