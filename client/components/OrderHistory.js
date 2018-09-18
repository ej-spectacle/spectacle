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
            <div className="order-group-container">
              {this.props.completedOrders.map(orderGroup => {
                let orderTotal = 0;
                return (
                  <div className="order-group" key={orderGroup[0].refNumber}>
                    <div className="order-heading">
                      <h4>Purchased On: {orderGroup[0].purchaseDate.slice(0, 10)}</h4>
                      <p>Reference Number: {orderGroup[0].refNumber}</p>
                    </div>
                    <table>
                      <tbody>
                        <tr>
                          <th />
                          <th>Item Name</th>
                          <th>Price</th>
                        </tr>
                        {orderGroup.map(order => {
                          orderTotal += order.price;
                          return (
                            <tr key={`order${order.id}`}>
                              <td>
                                <img src={order.glass.imageUrl} />
                              </td>
                              <td>{order.glass.name}</td>
                              <td>${order.price}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                    <h4>Order Total: ${orderTotal}</h4>
                  </div>
                );
              })}
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
