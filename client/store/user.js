import axios from 'axios';
import history from '../history';
import { clearCart } from './order';

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER';
const CREATE_GUEST_USER = 'CREATE_GUEST_USER';
const UPDATE_USER = 'UPDATE_USER';
const REMOVE_USER = 'REMOVE_USER';

/**
 * INITIAL STATE
 */
const defaultUser = {};

/**
 * ACTION CREATORS
 */
const getUser = user => ({ type: GET_USER, user });
const createGuestUser = user => ({ type: CREATE_GUEST_USER, user });
const updateUser = user => ({ type: UPDATE_USER, user });
const removeUser = () => ({ type: REMOVE_USER });

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me');
    dispatch(getUser(res.data || defaultUser));
  } catch (err) {
    console.error(err);
  }
};

export const guest = user => async dispatch => {
  try {
    const res = await axios.post('api/users', user);
    console.log('created guest', res.data);
    dispatch(createGuestUser({ ...res.data.user, wasCreated: res.data.wasCreated }));
    //dispatch(createGuestUser({ ...res.data }));
  } catch (err) {
    console.error(err);
  }
};

export const auth = (email, password, method) => async dispatch => {
  let res;
  try {
    res = await axios.post(`/auth/${method}`, { email, password });
  } catch (authError) {
    return dispatch(getUser({ error: authError }));
  }

  try {
    dispatch(getUser({ ...res.data, isLoggedIn: true }));
    history.push('/');
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr);
  }
};

export const update = user => async dispatch => {
  try {
    const res = await axios.put(`/api/users/${user.id}`, user);
    dispatch(updateUser(res.data));
  } catch (err) {
    console.error(err);
  }
};

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout');
    dispatch(removeUser());
    dispatch(clearCart());
    history.push('/login');
  } catch (err) {
    console.error(err);
  }
};

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case CREATE_GUEST_USER:
      return action.user;
    case REMOVE_USER:
      return defaultUser;
    case UPDATE_USER:
      return action.user;
    default:
      return state;
  }
}
