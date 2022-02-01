import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Keyboard,
  Image,
  FlatList,
  StyleSheet,
  TextInput,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import PushNotification from 'react-native-push-notification';

import Card from '../Components/Card';
import SubmitButton from '../Components/SubmitButton';
import colors from '../Config/Colors';
import * as actions from '../Store/actions';

const HomeScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [searchKey, setSearchKey] = useState('');

  const dispatch = useDispatch();

  const trendingMoviesList = useSelector(state => state.Reducers.trendingData);
  const allMoviesList = useSelector(state => state.Reducers.allData);
  console.log(allMoviesList.page, 'allMoviesList in screen');

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
    getTrendingMovieList();
    getAllMovieList();
    createChannels();
  }, []);

  useEffect(() => {
    const addOnFocus = props.navigation.addListener('didFocus', () => {
      getLoginUser();
      getTrendingMovieList();
      getAllMovieList();
    });
  }, [props.navigation]);

  const getLoginUser = async () => {
    const loginUser = await AsyncStorage.getItem('loginUser');
    if (loginUser) {
      const transformedData = JSON.parse(loginUser);
      console.log(transformedData, 'in Home Screen');
      const {savedUsername, savedEmail, savedPassword, savedPhoneNumber} =
        transformedData;
      setUsername(savedUsername);
      setEmail(savedEmail);
      setPassword(savedPassword);
      setPhoneNumber(savedPhoneNumber);
    } else {
      setUsername('');
      setEmail('');
      setPassword('');
      setPhoneNumber('');
    }
  };

  const getTrendingMovieList = async () => {
    try {
      await dispatch(actions.getTrendingMovies());
    } catch (err) {
      console.log(err);
    }
  };

  const getAllMovieList = async () => {
    try {
      await dispatch(actions.getAllMovies());
    } catch (err) {
      console.log(err);
    }
  };

  const createChannels = () => {
    PushNotification.createChannel({
      channelId: 'test-channel',
      channelName: 'Test Channel',
    });
  };

  const handleNotification = item => {
    PushNotification.localNotification({
      channelId: 'test-channel',
      title: 'You clicked on ' + item.title,
      message: 'Released on ' + item.release_date,
      bigText: 'Summury: ' + item.overview,
    });
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.root}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}>
      <View style={styles.screen}>
        <Text style={styles.titleText}>
          {username !== '' ? `Hello ${username},` : 'Hello,'}
        </Text>

        <View style={styles.searchBarContainer}>
          <TextInput
            style={styles.searchBarInput}
            placeholder="Search movies here"
            placeholderTextColor={colors.textColor50}
            id="searchKey"
            value={searchKey}
            onChangeText={text => setSearchKey(text)}
          />
          <View style={styles.iconContainer}>
            <Icon
              name="search"
              size={25}
              color={colors.cardBackground}
              onPress={() => {}}
            />
          </View>
        </View>

        <View style={styles.trendingContainer}>
          <Text style={styles.commonTextBig}>Trending Movies</Text>
          {trendingMoviesList ? (
            <FlatList
              data={
                !searchKey
                  ? trendingMoviesList.results
                  : trendingMoviesList.results.filter(item =>
                      item.title
                        .toLowerCase()
                        .includes(searchKey.toLowerCase()),
                    )
              }
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  activeOpacity={0.6}
                  // onPress={() => {
                  //   props.navigation.navigate('Details', {
                  //     movieId: item.id,
                  //   });
                  // }}
                  onPress={() => {
                    handleNotification(item);
                  }}
                  style={styles.trendingCardContainer}>
                  <Card style={styles.trendingCardView}>
                    <Image
                      source={{
                        uri: `https://image.tmdb.org/t/p/original${item.poster_path}`,
                      }}
                      resizeMode="cover"
                      style={{
                        height: 175,
                        width: 125,
                      }}
                    />
                  </Card>
                </TouchableOpacity>
              )}
            />
          ) : (
            console.log('TrendingMovieList in null')
          )}
        </View>

        <View style={styles.allMoviesContainer}>
          <Text style={styles.commonTextBig}>All Movies</Text>
          {allMoviesList ? (
            <FlatList
              data={
                !searchKey
                  ? allMoviesList.results
                  : allMoviesList.results.filter(item =>
                      item.title
                        .toLowerCase()
                        .includes(searchKey.toLowerCase()),
                    )
              }
              numColumns={2}
              showsVerticalScrollIndicator={false}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  activeOpacity={0.6}
                  // onPress={() => {
                  //   props.navigation.navigate('Details', {
                  //     movieId: item.id,
                  //   });
                  // }}
                  onPress={() => {
                    handleNotification(item);
                  }}
                  // onPress={() => {
                  //   console.log(item);
                  // }}
                  style={styles.allCardContainer}>
                  <Card style={styles.allCardView}>
                    <Image
                      source={{
                        uri: `https://image.tmdb.org/t/p/original${item.poster_path}`,
                      }}
                      resizeMode="cover"
                      style={{
                        height: 225,
                        width: 165,
                      }}
                    />
                  </Card>
                </TouchableOpacity>
              )}
            />
          ) : (
            console.log('AllMovieList in null')
          )}
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
    backgroundColor: colors.backgroundColor,
    paddingVertical: 20,
  },
  trendingCardContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  trendingCardView: {
    height: 175,
    width: 125,
    backgroundColor: colors.cardBackground,
    alignItems: 'center',
    marginRight: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },
  titleText: {
    color: colors.textColor,
    fontSize: 36,
    fontWeight: 'bold',
    marginHorizontal: 20,
  },
  commonTextBig: {
    fontSize: 22,
    color: colors.textColor,
    fontWeight: 'bold',
  },
  commonText: {
    fontSize: 16,
    color: colors.textColor,
    fontWeight: 'bold',
  },
  searchBarContainer: {
    height: 50,
    margin: 20,
    paddingLeft: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    borderRadius: 10,
  },
  iconContainer: {
    height: '100%',
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.buttonColor,
    borderRadius: 10,
  },
  searchBarInput: {
    width: '82%',
    color: colors.textColor,
    fontSize: 18,
  },
  trendingContainer: {
    marginHorizontal: 20,
  },
  allMoviesContainer: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  allCardContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  allCardView: {
    height: 225,
    width: 165,
    backgroundColor: colors.cardBackground,
    alignItems: 'center',
    marginHorizontal: 5,
    borderRadius: 10,
    overflow: 'hidden',
  },
  submitButton: {
    marginTop: 10,
  },
});

export default HomeScreen;
