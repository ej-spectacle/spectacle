import React, { Component } from 'react';
import { connect } from 'react-redux';
import CheckoutForm from './CheckoutForm';
import { auth, update, purchase } from '../store';
import { sha256 } from 'js-sha256';

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zip: '',
      },
      isLoading: true,
    };
    this.isValid = this.isValid.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.purchase = this.purchase.bind(this)
  }

  componentDidMount() {
    this.setState({ user: { ...this.props.user }, isLoading: false });
  }

  purchase() {
    const purchaseDate = new Date();
    const refNumber = sha256(`${purchaseDate} ${this.props.user.email}`);
    const orders = this.props.cart || [];
    orders.map(order => {
      this.props.purchaseOrder({
        ...order,
        price: order.glass.price,
        purchaseDate,
        refNumber,
      });
    });
  }

  isValid() {
    const { firstName, lastName, email, address, city, state, zip } = this.state.user
    if (firstName.length > 0 && lastName.length > 0 && email.length > 0 && address.length > 0 && city.length > 0 && state.length > 0 && zip > 0) {
      return true
    }
    return false
  }

  handleChange(evt) {
    const user = this.state.user
    user[evt.target.name] = evt.target.value
    this.setState({ user });
  }

  handleSubmit(evt) {
    const { isLoggedIn, updateUser, checkout, orders } = this.props;
    evt.preventDefault()

    if (this.isValid()) {
      if (isLoggedIn) {
        updateUser(this.state.user);
      } else {
        const guest = this.state.user
      }
      this.purchase();
    } else return null;
  }

  render() {
    return (
      <div>
        {!this.state.isLoading ? (
          <CheckoutForm
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            user={this.state.user}
            cartCount={this.props.cartCount}
          />
        ) : null}
      </div>
    );
  }
}

const mapState = state => ({
  isLoggedIn: !!state.user.id,
  user: state.user,
  cartCount: state.cart.length,
  cart: state.cart
});

const mapDispatch = dispatch => ({
  updateUser: (user) => {
    dispatch(update(user));
  },
  createUser: (email, password, method) => {
    dispatch(auth(email, password, method));
  },
  purchaseOrder: (order) => {
    dispatch(purchase(order))
  },
});

export default connect(mapState, mapDispatch)(Checkout);
