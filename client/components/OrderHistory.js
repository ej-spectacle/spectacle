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
          {this.props.completedOrders.length > 0 ? (
            <table>
              <tbody>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Date Purchased</th>
                  <th>Reference #</th>
                </tr>
                {this.props.completedOrders.map(order => {
                  return (
                    <tr key={order.id}>
                      <td>{order.glass.name}</td>
                      <td>$3500</td>
                      <td>{order.purchaseDate.slice(0, 10)}</td>
                      <td>{order.refNumber}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
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
