import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import { fetchCart } from '../store/order';

class Navbar extends Component {
  componentDidMount() {
    if (this.props.user.id) this.props.fetchCart(this.props.user.id);
  }

  render() {
    const { handleClick, isLoggedIn, user, cartCount } = this.props;

    return (
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
                  <button type="submit" className="dropbtn">
                    {user.email}
                  </button>
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
    isLoggedIn: !!state.user.id,
    user: state.user,
    cartCount: state.orders.length,
  };
};

const mapDispatch = dispatch => {
  return {
    handleClick: () => {
      dispatch(logout());
    },
    fetchCart: id => dispatch(fetchCart(id)),
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
