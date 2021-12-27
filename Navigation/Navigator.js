import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/Ionicons';

import colors from '../Config/Colors';
import HomeScreen from '../Screens/HomeScreen';
import LoginScreen from '../Screens/LoginScreen';
import RegisterScreen from '../Screens/RegisterScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import DetailScreen from '../Screens/DetailScreen';

const AuthNavigator = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    Register: {
      screen: RegisterScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        headerShown: true,
      },
    },
  },
  {
    defaultNavigationOptions: {
      animationEnabled: false,
      headerStyle: {
        backgroundColor: colors.buttonColor,
      },
      headerTintColor: colors.white,
      headerTitleAlign: 'center',
    },
  },
);

const HomeNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Details: {
      screen: DetailScreen,
      navigationOptions: {
        headerTitle: 'Movie Details',
      },
    },
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: colors.buttonColor,
      },
      headerTintColor: colors.white,
      headerTitleAlign: 'center',
    },
  },
);

const BottomTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeNavigator,
      navigationOptions: {
        tabBarIcon: ({tintColor, focused}) => (
          <Icon name="home" size={30} color={tintColor} />
        ),
      },
    },
    Login: {
      screen: AuthNavigator,
      navigationOptions: {
        tabBarIcon: ({tintColor, focused}) => (
          <Icon name="person" size={30} color={tintColor} />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: colors.white,
      inactiveTintColor: colors.textColor,
      showLabel: false,
      style: {
        height: 75,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.buttonColor,
      },
    },
  },
);

const SampleNavigator = createStackNavigator(
  {
    Sample: LoginScreen,
  },
  {
    defaultNavigationOptions: {
      headerShown: true,
      headerTitle: 'Create Event',
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: colors.cardBackground,
      },
      headerTintColor: colors.backgroundColor,
    },
  },
);

export default createAppContainer(BottomTabNavigator);
