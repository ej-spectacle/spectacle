import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout, me, fetchCart } from '../store';

class Navbar extends Component {
  render() {
    const { handleClick, isLoggedIn, user, cartCount } = this.props;
    if (isLoggedIn) this.props.fetchCart(user.id);

    return (
      <div className='navbar'>
        <nav>
          <div className="nav-left nav-child">
            <Link to="/">Home</Link>
            <Link to="/glasses">Glasses</Link>
          </div>
          <div className="nav-center nav-child">
            <h1><b>Elton John Sunglasses</b></h1>
          </div>
          <div className="nav-right nav-child">
            {isLoggedIn ? (
              <div>
                {/* The navbar will show these links after you log in */}
                <div className="dropdown">
                  <button type="submit" className="dropbtn">
                    {user.email} <i className="arrow"></i>
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
            <Link to="/cart">
              <i className="fa fa-shopping-cart" /> Cart {`(${cartCount})`}
            </Link>
          </div>
        </nav>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: state.user.isLoggedIn,
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
