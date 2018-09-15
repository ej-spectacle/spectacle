import axios from 'axios';

const GET_PURCHASED_ORDERS = "GET_PURCHASED_ORDERS";

const getOrderHistory = orders => {
    return {
        type: GET_PURCHASED_ORDERS,
        orders: orders
    }
};

export const fetchOrderHistory = (id) => async dispatch => {
    console.log('dispatched!')
    try {
        const orders = await axios.get(`/api/users/${id}/orders`);
        dispatch(getOrderHistory(orders.data));
    } catch(err){
        console.log(err);
    }
};

export default function(state = [], action){
    switch(action.type){
        case GET_PURCHASED_ORDERS:
            return action.orders;
        default:
            return state;
        
    }
}


