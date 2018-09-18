import React, { Component } from 'react';
import { connect } from 'react-redux';
import CheckoutForm from './CheckoutForm';
import { auth, update, purchase, guest, purchaseGlasses } from '../store';
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
        userId: order.user.id,
        purchaseDate,
        refNumber,
      });
      this.props.purchaseGlasses({ ...order.glass, available: false })
    });
  }



  handleChange(evt) {
    const user = this.state.user;
    user[evt.target.name] = evt.target.value;
    this.setState({ user });
  }

  async handleSubmit(evt) {
    const { isLoggedIn, updateUser, createGuest } = this.props;
    evt.preventDefault();

    if (isLoggedIn) {
      await updateUser(this.state.user);
    } else {
      await createGuest(this.state.user);
    }

    await this.purchase();
    this.setState({ submitted: true });
    this.props.history.push('/confirmation-page')
  }

  render() {
    const createdGuest = this.props.user;

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
  isLoggedIn: state.user.isLoggedIn,
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
  purchaseGlasses: glasses => {
    dispatch(purchaseGlasses(glasses))
  }
});

export default connect(mapState, mapDispatch)(Checkout);
