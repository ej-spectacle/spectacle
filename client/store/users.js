import axios from 'axios';
import history from '../history';

const GET_USERS = 'GET_USERS';

/**
 * INITIAL STATE
 */
const defaultUser = {};
/**
 * ACTION CREATORS
 */
const getUsers = users => ({ type: GET_USERS, users });

/**
 * THUNK CREATORS
 */
export const fetchUsers = () => async dispatch => {
  try {
    const res = await axios.get('/api/users');
    dispatch(getUsers(res.data));
  } catch (err) {
    console.log(err);
  }
};

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USERS:
      return action.users;
    default:
      return state;
  }
}
