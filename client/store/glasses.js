import axios from 'axios'
import history from '../history'

/**
 * INITIAL STATE
 */
const glasses = []

/**
 * ACTION TYPES
 */
const GET_GLASSES = 'GET_GLASSES'

/**
 * ACTION CREATORS
 */
const getGlasses = glasses => ({ type: GET_GLASSES, glasses })

/**
 * THUNK CREATORS
 */
export const fetchGlasses = () => async dispatch => {
  try {
    const res = await axios.get('/api/glasses')
    dispatch(getGlasses(res.data))
  } catch (err) {
    console.log('Error fetching glasses', err)
  }
}

/**
 * REDUCER
 */
export default function(state = glasses, action) {
  switch (action.type) {
    case GET_GLASSES:
      return action.glasses
    default:
      return state
  }
}
