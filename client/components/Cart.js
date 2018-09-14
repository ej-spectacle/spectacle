import React, { Component } from 'react';
import { connect } from 'react-redux';

class Cart extends Component {
  componentDidMount() {}
  render() {
    const orders = this.props.orders || [];

    return (
      <div>
        {orders.map(order => {
          return (
            <li key={order.id}>
              {order.id} {order.price}
            </li>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    orders: state.orders,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
