import {
  INIT_APP,
  LOGIN,
  SIGNUP,
  TRENDING_MOVIES,
  MOVIES_ALL,
  MOVIE_DETAILS,
} from './actions';

const initialState = {
  username: null,
  email: null,
  password: null,
  phoneNumber: null,
  trendingData: {},
  allData: {},
  movieDetails: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case INIT_APP:
      console.log('App Initialized');

    case LOGIN:
      return {
        ...state,
        username: action.username,
        email: action.email,
        password: action.password,
        phoneNumber: action.phoneNumber,
      };

    case TRENDING_MOVIES:
      return {
        ...state,
        trendingData: action.trendingData,
      };

    case MOVIES_ALL:
      return {
        ...state,
        allData: action.allData,
      };

    case MOVIE_DETAILS:
      return {
        ...state,
        movieDetails: action.movieDetails,
      };

    default:
      return state;
  }
};
