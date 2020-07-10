import { USER_LOADED, USER_LOADING, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT_SUCCESS,
   REGISTER_SUCCESS, REGISTER_ERROR, EMAIL_SENT } from '../actions/types'

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  isLoading: false,
  user: null
}

export default function(state = initialState, action) {
  switch (action.type){
    case USER_LOADING:
    return{
      ...state,
      isLoading: true
    }
    case USER_LOADED:
    return{
      ...state,
      isAuthenticated: true,
      isLoading: false,
      user: action.payload
    }
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false
      }

    case AUTH_ERROR:
    case LOGIN_ERROR:
    case LOGOUT_SUCCESS:
    case REGISTER_ERROR:
    case EMAIL_SENT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false
      }

    default:
      return state;
  }
}
