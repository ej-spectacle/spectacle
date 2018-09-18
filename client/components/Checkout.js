import React, { Component } from 'react';
import { connect } from 'react-redux';
import CheckoutForm from './CheckoutForm';
import { auth, update, purchase, guest } from '../store';
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
      submitted: false,
    };
    // this.isValid = this.isValid.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.purchase = this.purchase.bind(this);
  }

  componentDidMount() {
    this.setState({ user: { ...this.props.user }, isLoading: false });
  }

  purchase() {
    const purchaseDate = new Date();
    const refNumber = sha256(`${purchaseDate} ${this.props.user.email}`).slice(0, 10);
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

  // isValid() {
  //   const { firstName, lastName, email, address, city, state, zip } = this.state.user;
  //   if (
  //     firstName.length > 0 &&
  //     lastName.length > 0 &&
  //     email.length > 0 &&
  //     address.length > 0 &&
  //     city.length > 0 &&
  //     state.length > 0 &&
  //     zip > 0
  //   ) {
  //     return true;
  //   }
  //   return false;
  // }

  handleChange(evt) {
    const user = this.state.user;
    user[evt.target.name] = evt.target.value;
    this.setState({ user });
  }

  handleSubmit(evt) {
    const { isLoggedIn, updateUser, createGuest, user } = this.props;
    evt.preventDefault();

    // if (this.isValid()) {
    if (isLoggedIn) {
      updateUser(this.state.user);
    } else {
      createGuest(this.state.user);
    }
    this.purchase();
    this.setState({ submitted: true });
    this.props.history.push('/confirmation-page');

    // } else return null;
  }

  render() {
    const createdGuest = this.props.user;
    console.log(this.props);

    return (
      <div>
        {!this.state.isLoading ? (
          <CheckoutForm
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            user={this.state.user}
            cart={this.props.cart}
            wasCreated={this.state.submitted ? createdGuest.wasCreated : true}
          />
        ) : null}
      </div>
    );
  }
}

const mapState = state => ({
  isLoggedIn: !!state.user.id,
  user: state.user,
  cart: state.cart,
});

const mapDispatch = dispatch => ({
  updateUser: user => {
    dispatch(update(user));
  },
  createUser: (email, password, method) => {
    dispatch(auth(email, password, method));
  },
  purchaseOrder: order => {
    dispatch(purchase(order));
  },
  createGuest: user => {
    dispatch(guest(user));
  },
});

export default connect(mapState, mapDispatch)(Checkout);
