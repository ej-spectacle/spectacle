import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_GLASSES = 'GET_GLASSES';
const GET_SINGLE_GLASSES = 'GET_SINGLE_GLASSES';
const UPDATE_GLASSES = 'UPDATE_GLASSES';

/**
 * ACTION CREATORS
 */
const getGlasses = glasses => ({ type: GET_GLASSES, glasses });
const getSingleGlasses = singleGlasses => ({ type: GET_SINGLE_GLASSES, singleGlasses });
const updateGlasses = glasses => ({ type: UPDATE_GLASSES, glasses });

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

export const purchaseGlasses = glasses => async dispatch => {
  try {
    const res = await axios.put(`/api/glasses/${glasses.id}`, glasses);
    dispatch(updateGlasses(res.data));
  } catch (err) {
    console.log('Error updating glasses', err);
  }
};

/**
 * REDUCER
 */
export default function(state = [], action) {
  switch (action.type) {
    case GET_GLASSES:
      return action.glasses;
    case GET_SINGLE_GLASSES:
      return [action.singleGlasses];
    case UPDATE_GLASSES:
      const updatedGlasses = state.filter(glasses => glasses.id !== action.glasses.id);
      return [...updatedGlasses, action.glasses];
    default:
      return state;
  }
}
