import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteOrder, fetchCart } from '../store/order';
import { NavLink } from 'react-router-dom';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(id) {
    this.props.removeOrder(id);
  }

  render() {
    const cart = this.props.cart || [];

    return (
      <div className="cart-container">
        <div className="cart-items">
          {cart.map(order => {
            return (
              <div className="cart-single" key={order.id}>
                <img src={order.glass.imageUrl} />
                <h3>{order.glass.name}</h3>
                <h3>{order.glass.price}</h3>
                <button type="submit" onClick={() => this.handleDelete(order.id)}>
                  Delete
                </button>
              </div>
            );
          })}
        </div>
        <div className="cart-purchase">
          <button>
            <NavLink to="/checkout">Checkout</NavLink>
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    cart: state.cart,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCart: id => dispatch(fetchCart(id)),
    removeOrder: id => dispatch(deleteOrder(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
