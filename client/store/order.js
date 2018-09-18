import axios from 'axios';
import history from '../history';
import { addCompletedOrder } from './completedOrders'

const GET_ORDERS = 'GET_ORDERS';
const ADD_ORDER = 'ADD_ORDER';
const REMOVE_ORDER = 'REMOVE_ORDER';
const CLEAR_CART = 'CLEAR_CART';
const PURCHASE_ORDER = 'PURCHASE_ORDER';
const UPDATE_ORDER = 'UPDATE_ORDER';

const getOrders = orders => {
  return {
    type: GET_ORDERS,
    orders,
  };
};

const addOrder = order => {
  return {
    type: ADD_ORDER,
    order,
  };
};

const removeOrder = id => {
  return {
    type: REMOVE_ORDER,
    id,
  };
};

export const clearCart = () => {
  return {
    type: CLEAR_CART,
  };
};

const purchaseOrder = id => ({
  type: PURCHASE_ORDER,
  id,
});

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

export const fetchCart = id => async dispatch => {
  try {
    const res = await axios.get(`/api/users/${id}/cart`);
    const cart = res.data.filter(order => !order.refNumber);
    dispatch(getOrders(cart));
  } catch (error) {
    console.log(error);
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

export const purchase = order => async dispatch => {
  try {
    await axios.put(`/api/orders/${order.id}`, order);
    dispatch(addCompletedOrder(order));
    dispatch(purchaseOrder(order.id));
  } catch (error) {
    console.log(error);
  }
};

export const deleteOrder = id => async dispatch => {
  try {
    await axios.delete(`/api/orders/${id}`);
    dispatch(removeOrder(id));
  } catch (error) {
    console.log(error);
  }
};

export default function(state = [], action) {
  switch (action.type) {
    case GET_ORDERS:
      return action.orders;
    case ADD_ORDER:
      return [...state, action.order];
    case REMOVE_ORDER:
      return state.filter(order => order.id !== action.id);
    case CLEAR_CART:
      return [];
    case PURCHASE_ORDER:
      return state.filter(order => order.id !== action.id);
    case UPDATE_ORDER:
      return action.order;
    default:
      return state;
  }
}
