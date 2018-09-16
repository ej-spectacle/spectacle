import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteOrder } from '../store/order';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }
  handleDelete(id) {
    this.props.removeOrder(id);
  }
  render() {
    const orders = this.props.orders || [];

    return (
      <div className="cart-container">
        {orders.map(order => {
          return (
            <div className="cart-single" key={order.id}>
              <img src={order.glass.imageUrl} />
              <h3>{order.glass.name}</h3>
              <h3>{order.glass.price}</h3>
              <button type="submit" onClick={() => this.handleDelete(order.id)}>
                X
              </button>
            </div>
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
  return {
    removeOrder: id => dispatch(deleteOrder(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
