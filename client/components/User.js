import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { fetchUsers } from '../store';
import { connect } from 'react-redux';

class User extends Component {
  componentDidMount() {
    this.props.getUsers();
  }

  render() {
    return (
      <div>
        {this.props.currentUser ? (
          this.props.currentUser.isAdmin ? (
            <div className="admin-dashboard">
              <h1> Admin Dashboard</h1>
              <h2> Your Users</h2>
              {!this.props.users.length
                ? null
                : this.props.users.map(user => {
                    return (
                      <li className="admin-dashboard-user" key={user.id}>
                        {user.email}
                      </li>
                    );
                  })}
            </div>
          ) : (
            <div className="user-dashboard">
              <h1>Dashboard</h1>
              <div>
                <Link to="/orders">
                  <div className="dashboard-container-item">
                    <img className="icons" />
                    <span> Order History</span>
                  </div>
                </Link>
                <Link to="#">
                  <div className="dashboard-container-item">
                    <img className="icons" />
                    <span> Account Details</span>
                  </div>
                </Link>
                <Link to="#">
                  <div className="dashboard-container-item">
                    <img className="icons" />
                    <span> Payment Options</span>
                  </div>
                </Link>
              </div>
            </div>
          )
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.users,
    currentUser: state.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUsers: () => dispatch(fetchUsers()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
