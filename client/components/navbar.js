import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';

const Navbar = ({ handleClick, isLoggedIn, userEmail, cartCount }) => (
  <div>
    <h1>Elton John Sunglasses</h1>
    <nav>
      <div className="nav-left">
        <Link to="/home">Home</Link>
        <Link to="/glasses">Glasses</Link>
      </div>
      <div className="nav-right">
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <div className="dropdown">
              <button className="dropbtn">{userEmail}</button>
              <div className="dropdown-content">
                <a href="#">Dashboard</a>
                <a href="#">Order History</a>
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
        <a>Cart{`(${cartCount})`}</a>
      </div>
    </nav>
    <hr />
  </div>
);

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    userEmail: state.user.email,
    cartCount: state.order.length,
  };
};

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout());
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
