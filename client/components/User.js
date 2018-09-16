import React, { Component } from 'react';
import { fetchUsers } from '../store';
import { connect } from 'react-redux';

class User extends Component {
  componentDidMount() {
    this.props.getUsers();
  }

  render() {
    console.log('my users', this.props);

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
              <h1>This is the User Dashboard</h1>
              <h3>Order History</h3>
              <h3>Edit Profile Info</h3>
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
