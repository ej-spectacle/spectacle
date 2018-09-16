import React from 'react';
import { connect } from 'react-redux';
import { fetchOrderHistory } from '../store/completedOrders';

class OrderHistory extends React.Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
    };
  }
  componentDidUpdate() {
    if (this.props.user.id) {
      if (!this.state.loaded) {
        this.props.fetchOrderHistory(this.props.user.id);
        this.setState({ loaded: true });
      }
    }
  }
  render() {
    if (this.props.user.id === undefined) {
      return <h2>Please sign in to view your orders</h2>;
    } else {
      return (
        <div className="orderHistory">
          <h2>Your Orders:</h2>
          <br/>
          {this.props.completedOrders.length > 0 ? (
            <div className="order-table-container">
              {this.props.completedOrders.map(orderGroup => {
                <h4>Reference #{orderGroup[0].refNumber}</h4>


                })
              }
            </div>
          ) : (
            <h4>No Orders Placed</h4>
          )}
        </div>
      );
    }
  }
}

const mapState = state => {
  return {
    user: state.user,
    completedOrders: state.completedOrders,
  };
};

const mapDispatch = dispatch => {
  return {
    fetchOrderHistory: id => dispatch(fetchOrderHistory(id)),
  };
};

module.exports = connect(mapState, mapDispatch)(OrderHistory);
