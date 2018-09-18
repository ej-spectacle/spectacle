import React, { Component } from 'react';
import { connect } from 'react-redux';

class ConfirmationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    const confirmedOrder = this.props.confirmedOrder;
    const user = this.props.confirmedOrder[0].user;

    return (
      <div>
        <h1>Thank you for your order!</h1>
        <h4>Order reference is #{confirmedOrder[0].refNumber}</h4>
        <div className="confirmation-page-container">
          <div className="confirmation-page-shipping">
            <h1>Shipment Details</h1>
            {!confirmedOrder ? null : (
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
              {!confirmedOrder.length
                ? null
                : confirmedOrder.map(item => {
                    return <li>{item.name}</li>;
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
    confirmedOrder: state.completedOrders,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmationPage);
