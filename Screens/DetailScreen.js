import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image,
  FlatList,
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

  const movieDetails = useSelector(state => state.Reducers.movieDetails);
  console.log(movieDetails, 'movieDetails in Screen');

  const movieId = props.navigation.getParam('movieId');

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
    getMovieDetails(movieId);
  }, []);

  useEffect(() => {
    const onFocus = props.navigation.addListener('didFocus', () => {
      console.log('in Details Screen');
      getMovieDetails(movieId);
    });
  }, [props.navigation]);

  const getMovieDetails = async movieId => {
    try {
      await dispatch(actions.getMovieDetails(movieId));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.root}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}>
      <View style={styles.screen}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/original${movieDetails.poster_path}`,
            }}
            resizeMode="cover"
            style={{
              height: 225,
              width: 160,
              borderRadius: 10,
            }}
          />
          <View>
            <FlatList
              data={movieDetails.genres}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              renderItem={({item, index}) => (
                <View style={styles.genresView}>
                  <Text style={styles.genresText}>{item.name}</Text>
                </View>
              )}
            />
            <Text style={styles.runtimeText1}>
              Runtime:{' '}
              <Text style={styles.runtimeText2}>
                {movieDetails.runtime} Minutes
              </Text>
            </Text>
          </View>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{movieDetails.original_title}</Text>
        </View>
        <View style={styles.overviewContainer}>
          <Text style={styles.commonText}>Overview</Text>
          <Text style={styles.overviewText}>{movieDetails.overview}</Text>
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
    padding: 20,
  },
  titleContainer: {
    width: '100%',
    height: 60,
    marginTop: 30,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: colors.cardBackground,
  },
  titleText: {
    color: colors.textColor,
    fontSize: 24,
    fontWeight: 'bold',
  },
  commonText: {
    fontSize: 22,
    color: colors.cardBackground,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 20,
  },
  genresView: {
    width: 80,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginBottom: 10,
    backgroundColor: colors.cardBackground,
    borderRadius: 5,
  },
  overviewContainer: {
    width: '100%',
    height: 275,
    backgroundColor: colors.textColor50,
    paddingHorizontal: 10,
    marginTop: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  genresText: {
    color: colors.textColor,
    fontSize: 16,
  },
  overviewText: {
    color: colors.cardBackground,
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  runtimeText1: {
    color: colors.textColor,
    fontSize: 16,
    marginLeft: 10,
  },
  runtimeText2: {
    color: colors.textColor,
    fontSize: 16,
    fontWeight: 'bold',
  },
  submitButton: {
    width: '75%',
  },
  imageContainer: {
    flexDirection: 'row',
  },
});

export default ProfileScreen;
