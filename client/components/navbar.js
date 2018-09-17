import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout, me, fetchCart } from '../store';

class Navbar extends Component {
  render() {
    const { handleClick, isLoggedIn, user, cartCount } = this.props;
    if (this.props.user.id) this.props.fetchCart(this.props.user.id);

    return (
      <div>
        <h1>Elton John Sunglasses</h1>
        <nav>
          <div className="nav-left">
            <Link to="/">Home</Link>
            <Link to="/glasses">Glasses</Link>
          </div>
          <div className="nav-right">
            {isLoggedIn ? (
              <div>
                {/* The navbar will show these links after you log in */}
                <div className="dropdown">
                  <button type="submit" className="dropbtn">
                    {user.email}
                  </button>
                  <div className="dropdown-content">
                    <a href="/dashboard">Dashboard</a>
                    <a href="/orders">Order History</a>
                  </div>
                </div>
                <a href="#" onClick={handleClick}>
                  Logout
                </a>
              </div>
            ) : (
              <div>
                {/* The navbar will show these links before you log in */}
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
              </div>
            )}
            <Link to="/cart">Cart{`(${cartCount})`}</Link>
          </div>
        </nav>
        <hr />
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.password,
    user: state.user,
    cartCount: state.cart.length,
  };
};

const mapDispatch = dispatch => {
  return {
    handleClick: () => {
      dispatch(logout());
    },
    fetchCart: id => {
      dispatch(fetchCart(id));
    },
    getUser: () => {
      dispatch(me());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};
