import axios from 'axios';
import history from '../history';

const GET_ORDERS = 'GET_ORDERS';
const ADD_ORDER = 'ADD_ORDER';
const REMOVE_ORDER = 'REMOVE_ORDER';
const PURCHASE_ORDER = 'PURCHASE_ORDER';

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

const removeOrder = orderId => {
  return {
    type: REMOVE_ORDER,
    orderId,
  };
};

// const purchaseOrder = () => ({
//   type: PURCHASE_ORDER,
// });

//admin purposes
export const fetchAllOrders = () => async dispatch => {
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

// export const purchaseAllOrders = order => async dispatch => {
//   try {
//     await axios.put(`/api/orders/${order.id}`, order);
//     dispatch(purchaseOrder());
//   } catch (error) {
//     console.log(error);
//   }
// };

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
      return state.filter(order => order.id !== action.orderId);
    case PURCHASE_ORDER:
      return [];
    default:
      return state;
  }
}
