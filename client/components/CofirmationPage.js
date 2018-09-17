import React, { Component } from 'react';
import { connect } from 'react-redux';

class ConfirmationPage extends Component {
  render() {
    const { user, orders } = this.props;

    return (
      <div>
        <h1>Thank you for your order!</h1>
        <h4>Order reference is #{order.refNumber}</h4>
        <div className="confirmation-page-container">
          <div className="confirmation-page-shipping">
            <h1>Shipment Details</h1>
            {!this.props.user ? null : (
              <ul>
                <li>
                  {user.firstName} {user.lastName}
                </li>
                <li>{user.address}</li>
                <li>
                  {user.city}, {user.state} {user.zip}
                </li>
                <li>{user.email}</li>
              </ul>
            )}
          </div>

          <div className="confirmation-page-items">
            <h1>Ordered Items</h1>
            <ul>
              {!orders.length
                ? null
                : orders.map(order => {
                    return (
                      <li className="order-item" key={order.id}>
                        {order.id}
                      </li>
                    );
                  })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order,
    user: state.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmationPage);
