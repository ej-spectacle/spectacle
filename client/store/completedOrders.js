import axios from 'axios';

const GET_PURCHASED_ORDERS = 'GET_PURCHASED_ORDERS';
const ADD_COMPLETED_ORDER = 'ADD_COMPLETED_ORDER';

const getOrderHistory = orders => {
  return {
    type: GET_PURCHASED_ORDERS,
    orders: orders,
  };
};

export const addCompletedOrder = order => {
  return {
    type: ADD_COMPLETED_ORDER,
    order,
  };
};

export const fetchOrderHistory = id => async dispatch => {
  try {
    const orders = await axios.get(`/api/users/${id}/completed-orders`);
    dispatch(getOrderHistory(orders.data));
  } catch (err) {
    console.log(err);
  }
};

export default function(state = [], action) {
  switch (action.type) {
    case GET_PURCHASED_ORDERS:
      return action.orders;
    case ADD_COMPLETED_ORDER:
      return [...state, action.order];
    default:
      return state;
  }
}
