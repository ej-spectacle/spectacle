import axios from 'axios';
import history from '../history';

/**
 * INITIAL STATE
 */
const initialState = {
  glasses: [],
  singleGlasses: {},
};

/**
 * ACTION TYPES
 */
const GET_GLASSES = 'GET_GLASSES';
const GET_SINGLE_GLASSES = 'GET_SINGLE_GLASSES';

/**
 * ACTION CREATORS
 */
const getGlasses = glasses => ({ type: GET_GLASSES, glasses });
const getSingleGlasses = singleGlasses => ({ type: GET_SINGLE_GLASSES, singleGlasses });

/**
 * THUNK CREATORS
 */
export const fetchGlasses = () => async dispatch => {
  try {
    const res = await axios.get('/api/glasses');
    dispatch(getGlasses(res.data));
  } catch (err) {
    console.log('Error fetching glasses', err);
  }
};

export const fetchSingleGlasses = id => async dispatch => {
  try {
    const res = await axios.get(`/api/glasses/${id}`);
    dispatch(getSingleGlasses(res.data));
  } catch (err) {
    console.log('Error fetching glasses', err);
  }
};

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_GLASSES:
      return { ...state, glasses: action.glasses };
    case GET_SINGLE_GLASSES:
      return { ...state, singleGlasses: action.singleGlasses };
    default:
      return state;
  }
}
