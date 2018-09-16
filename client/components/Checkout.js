import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';
import { auth, update, checkout } from '../store';

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
        zip: null,
      },
      isLoading: true,
    };
    // this.isValid = this.isValid.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    console.log('user:', this.state.user);
    this.setState({ user: { ...this.props.user }, isLoading: false });
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  handleSubmit(evt) {
    // const { isLoggedIn, updateUser, checkout, orders } = this.props;

    // if (this.isValid()) {
    //   evt.preventDefault()
    //   if (isLoggedIn) {
    //     updateUser(this.state);
    //     checkout(orders);
    //   }
    //   this.props
    // }
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
});

const mapDispatch = dispatch => ({
  updateUser: (user) => {
    dispatch(update(user));
  },
  createUser: (email, password, method) => {
    dispatch(auth(email, password, method));
  },
  checkout: (orders) => {
    dispatch(checkout(orders))
  }
});

export default connect(mapState, mapDispatch)(Checkout);
