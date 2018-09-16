import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteOrder, purchaseAllOrders, fetchCart } from '../store/order';
import { sha256 } from 'js-sha256';
import { Link } from 'react-router-dom';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    //this.handlePurchase = this.handlePurchase.bind(this);
  }
  componentDidMount() {
    if (this.props.user.id) this.props.fetchCart(this.props.user.id);
  }
  handleDelete(id) {
    this.props.removeOrder(id);
  }
  // handlePurchase() {
  //   const purchaseDate = new Date();
  //   const refNumber = sha256(`${purchaseDate} ${this.props.user.email}`);
  //   const orders = this.props.orders || [];
  //   orders.map(order => {
  //     this.props.purchaseOrder({
  //       ...order,
  //       price: order.glass.price,
  //       purchaseDate,
  //       refNumber,
  //     });
  //   });
  // }
  render() {
    const orders = this.props.orders || [];

    return (
      <div className="cart-container">
        <div className="cart-items">
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
        <div className="cart-purchase">
          <Link to="/checkout">Checkout</Link>
        </div>
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
    fetchCart: id => dispatch(fetchCart(id)),
    removeOrder: id => dispatch(deleteOrder(id)),
    // purchaseOrder: order => dispatch(purchaseAllOrders(order)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
