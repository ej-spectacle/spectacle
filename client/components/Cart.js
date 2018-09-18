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
    if (this.props.user.id) {
      console.log('in handle user delete');
      console.log(this.props.user.id);
      this.props.removeOrder(id, this.props.user.id);
    } else {
      this.props.removeOrder(id);
    }
  }

  render() {
    const cart = this.props.cart || [];
    let total = 0;

    return cart.length ? (
      <div className="cart-container products-container">
        <div className="cart-items">
          {cart.map(order => {
            total += order.glass.price;

            return (
              <div className="cart-single" key={order.id}>
                <img src={order.glass.imageUrl} />
                <div className="cart-single-info">
                  <h3>{order.glass.name}</h3>
                  <h3>${order.glass.price}</h3>
                  <button type="submit" onClick={() => this.handleDelete(order.id)}>
                    Delete
                </button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="cart-total">
          <h2>Total: ${total}</h2>
          <button type="submit">
            <NavLink to="/checkout">Checkout</NavLink>
          </button>
        </div>
      </div>
    ) : (
        <div>
          <h3>Your cart is empty.</h3>
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
    removeOrder: (id, userId = 0) => dispatch(deleteOrder(id, userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
