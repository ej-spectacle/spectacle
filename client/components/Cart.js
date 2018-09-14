import React, { Component } from 'react';
import { connect } from 'react-redux';

class Cart extends Component {
  render() {
    return <div>This is the cart component</div>;
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    orders: state.orders,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
