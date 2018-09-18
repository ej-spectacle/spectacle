import React, { Component } from 'react';
import { connect } from 'react-redux';

class ConfirmationPage extends Component {
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
    };
  }

  componentDidMount() {
    this.setState({
      ...this.props.user,
    });
  }

  render() {
    const { user, order } = this.props;
    console.log('state', this.state);

    return (
      <div>
        <h1>Thank you for your order!</h1>
        <h4>Order reference is #{order ? order.refNumber : 555}</h4>
        <div className="confirmation-page-container">
          <div className="confirmation-page-shipping">
            <h1>Shipment Details</h1>
            {!this.state.user ? null : (
              <ul>
                <li>
                  {this.state.firstName} {this.state.lastName}
                </li>
                <li>{this.state.address}</li>
                <li>
                  {this.state.city}, {this.state.state} {this.state.zip}
                </li>
                <li>{this.state.email}</li>
              </ul>
            )}
          </div>

          <div className="confirmation-page-items">
            <h1>Ordered Items</h1>
            {/* <ul>
              {orders.length
                ? null
                : orders.map(order => {
                    return (
                      <li className="order-item" key={order.id}>
                        {order.id}
                      </li>
                    );
                  })}
            </ul> */}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    order: state.order,
    user: state.user,
    cart: state.cart,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateUser: user => {
      dispatch(update(user));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmationPage);
