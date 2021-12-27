import {BASE_URL, API_KEY} from '../Config/Api';

export const INIT_APP = 'INIT_APP';
export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
export const TRENDING_MOVIES = 'TRENDING_MOVIES';
export const MOVIES_ALL = 'MOVIES_ALL';
export const MOVIE_DETAILS = 'MOVIE_DETAILS';

export const initApp = () => {
  return dispatch => {
    dispatch({type: INIT_APP});
  };
};

export const login = (username, email, password, phoneNumber) => {
  return dispatch => {
    dispatch({
      type: LOGIN,
      username: username,
      email: email,
      password: password,
      phoneNumber: phoneNumber,
    });
  };
};

export const getTrendingMovies = () => {
  return async dispatch => {
    const response = await fetch(
      BASE_URL + `/trending/movie/week?api_key=` + API_KEY,
    );

    if (!response.ok) {
      const errorResData = await response.json();
      console.log(errorResData);
      throw new Error('Failed To Get Trending Movies List');
    }

    const resData = await response.json();
    const statusCode = response.status;

    dispatch({
      type: TRENDING_MOVIES,
      trendingData: resData,
    });
  };
};

export const getAllMovies = () => {
  return async dispatch => {
    const response = await fetch(
      BASE_URL + `/discover/movie?api_key=` + API_KEY + `&with_genres=35`,
    );

    if (!response.ok) {
      const errorResData = await response.json();
      console.log(errorResData);
      throw new Error('Failed To Get All Movies List');
    }

    const resData = await response.json();
    const statusCode = response.status;

    dispatch({
      type: MOVIES_ALL,
      allData: resData,
    });
  };
};

export const getMovieDetails = movieId => {
  return async dispatch => {
    const response = await fetch(
      BASE_URL + `/movie/${movieId}?api_key=` + API_KEY,
    );

    if (!response.ok) {
      const errorResData = await response.json();
      console.log(errorResData);
      throw new Error('Failed To Get Movie Details');
    }

    const resData = await response.json();
    const statusCode = response.status;
    console.log('from getMovieDetails request :', resData);

    dispatch({
      type: MOVIE_DETAILS,
      movieDetails: resData,
    });
  };
};
