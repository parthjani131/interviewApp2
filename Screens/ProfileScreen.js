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
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Card from '../Components/Card';
import SubmitButton from '../Components/SubmitButton';
import colors from '../Config/Colors';
import * as actions from '../Store/actions';

const ProfileScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

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
    getLoginUser();
  }, []);

  const getLoginUser = async () => {
    const loginUser = await AsyncStorage.getItem('loginUser');
    if (loginUser) {
      const transformedData = JSON.parse(loginUser);
      console.log(transformedData);
      const {savedUsername, savedEmail, savedPassword, savedPhoneNumber} =
        transformedData;
      setUsername(savedUsername);
      setEmail(savedEmail);
      setPassword(savedPassword);
      setPhoneNumber(savedPhoneNumber);
    }
  };

  const logoutHandler = () => {
    Alert.alert('Confirmation Required!', 'Are you sure you want to Logout?', [
      {
        text: 'Yes',
        onPress: async () => {
          console.log('in remove loginUser');
          await AsyncStorage.removeItem('loginUser');
          props.navigation.replace('Login');
        },
      },
      {
        text: 'No',
      },
    ]);
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.root}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}>
      <View style={styles.screen}>
        <View style={styles.contentContainer}>
          <Text style={styles.titleText}>Username:</Text>
          <Text style={styles.commonText}>{username}</Text>
          <Text style={styles.titleText}>E-mail:</Text>
          <Text style={styles.commonText}>{email}</Text>
          <Text style={styles.titleText}>Password:</Text>
          <Text style={styles.commonText}>{password}</Text>
          <Text style={styles.titleText}>Phone Number:</Text>
          <Text style={styles.commonText}>{phoneNumber}</Text>
        </View>
        <View style={styles.submitButtonContainer}>
          <View style={styles.submitButton}>
            <SubmitButton onPress={logoutHandler}>Logout</SubmitButton>
          </View>
        </View>
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
    height: '100%',
    backgroundColor: colors.backgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  titleText: {
    color: colors.textColor,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 50,
  },
  commonText: {
    fontSize: 40,
    color: colors.buttonColor,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  contentContainer: {
    height: '85%',
  },
  submitButtonContainer: {
    height: '15%',
    width: '100%',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButton: {
    width: '75%',
  },
});

export default ProfileScreen;
