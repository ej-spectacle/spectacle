import axios from 'axios';
import history from '../history';

const GET_ORDERS = 'GET_ORDERS';
const ADD_ORDER = 'ADD_ORDER';
const UPDATE_ORDER = 'UPDATE_ORDER';

const getOrders = orders => {
  return {
    type: GET_ORDERS,
    orders,
  };
};

const addOrder = glasses => {
  return {
    type: ADD_ORDER,
    glasses,
  };
};

const updateOrder = order => {
  return {
    type: UPDATE_ORDER,
    order,
  };
};

export const fetchOrders = () => async dispatch => {
  try {
    const res = await axios.get('/api/orders');
    dispatch(getOrders(res.data));
  } catch (err) {
    console.log(err);
  }
};

export const postOrder = order => async dispatch => {
  try {
    const res = await axios.post('/api/orders', order);
    dispatch(addOrder(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const fetchCart = id => async dispatch => {
  try {
    const res = await axios.get(`/api/users/${id}/orders`);
    dispatch(getOrders(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const checkout = order => async dispatch => {
  try {
    const res = await axios.put(`/api/orders/${order.id}`, order);
    dispatch(updateOrder(res.data));
  } catch (error) {
    console.log(error);
  }
};

export default function(state = [], action) {
  switch (action.type) {
    case GET_ORDERS:
      return action.orders;
    case ADD_ORDER:
      return [...state, action.glasses];
    case UPDATE_ORDER:
      return action.order;
    default:
      return state;
  }
}
