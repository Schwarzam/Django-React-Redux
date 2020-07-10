import axios from 'axios';
import { returnErrors, createMessage } from './messages';

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  EMAIL_SENT
} from './types';

// CHECK TOKEN & LOAD USER
export const loadUser = () => (dispatch, getState) =>{
  // User Loading
  dispatch({ type: USER_LOADING })

  axios.get('/api/auth/user', tokenConfig(getState))
    .then(res => {
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    }).catch(err => {
      dispatch(returnErrors(err.response.data,err.response.status));
      dispatch({type: AUTH_ERROR})
  });
}

// CHECK TOKEN & LOAD USER
export const login = (username, password) => (dispatch) =>{
  const config = {
    headers:{
      'Content-Type': 'application/json'
    }
  }

  //
  const body = JSON.stringify({ username, password })
  axios.post('/api/auth/login',body, config)
    .then(res => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
    }).catch(err => {
      dispatch(returnErrors(err.response.data,err.response.status));
      dispatch({type: LOGIN_ERROR})
  });
};

// LOGOUT USER
export const logout = () => (dispatch, getState) =>{

  axios.post('/api/auth/logout', null, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: LOGOUT_SUCCESS
      });
    }).catch(err => {
      console.log(err);
  });
}

export const register = ({ username, password, email }) => (dispatch) =>{
  const config = {
    headers:{
      'Content-Type': 'application/json'
    }
  };

  //
  const body = JSON.stringify({ username, password, email })
  axios.post('/api/auth/register',body, config)
    .then(res => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
    }).catch(err => {
      dispatch(returnErrors(err.response.data,err.response.status));
      dispatch({type: REGISTER_ERROR})
  });
};

export const passreset = (email) => (dispatch) =>{
  const config = {
    headers:{
      'Content-Type': 'application/json'
    }
  }

  //
  const body = JSON.stringify({ email })
  axios.post('/api/reset-password/',body, config)
    .then(res => {
      dispatch({
        type: EMAIL_SENT,
        payload: res.data
      });
      dispatch(createMessage({ Emailsent: 'Email sent!' }));
    }).catch(err => dispatch(createMessage({ Emailerror: 'There was an error! Check if email is correct' })));
  };

export const passtoken = (newpassword, token) => (dispatch) =>{
  const config = {
    headers:{
      'Content-Type': 'application/json'
    }
  }
  const password = newpassword;
  //
  const body = JSON.stringify({ password, token })
  axios.post('/api/reset-password/confirm/',body, config)
    .then(res => {
      dispatch({
        type: EMAIL_SENT, //Email sent because it does the same thing on reducer
        payload: res.data
      });
      dispatch(createMessage({ passchanged: 'Password changed!' }));
    }).catch(err => dispatch(createMessage({ passerror: 'Password change Failed! Verifiy token' })));
  };

export const tokenConfig = getState =>{
  const token = getState().auth.token;

  const config = {
    headers:{
      'Content-Type': 'application/json'
    }
  };

  if (token) {
  config.headers['Authorization'] = `Token ${token}`;
  }

  return config
}
