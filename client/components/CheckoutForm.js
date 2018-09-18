import React from 'react';
import { Link } from 'react-router-dom';

const CheckoutForm = props => {
  const { handleChange, handleSubmit, cart, user, wasCreated } = props;
  const errMessage = wasCreated ? 'hidden' : 'error';
  let totalPrice = 0;

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <h1>Checkout</h1>
      </div>
      <div className="row">
        <div className="col-75">
          <div className="container">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-50">
                  <h3>Shipping Address</h3>
                  <label htmlFor="firstName">
                    <i className="fa fa-user" /> First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={user.firstName}
                    placeholder="John"
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="lastName">
                    <i className="fa fa-user" /> Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={user.lastName}
                    placeholder="Doe"
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="email">
                    <i className="fa fa-envelope" /> Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={user.email}
                    placeholder="john@example.com"
                    onChange={handleChange}
                    required
                  />
                  <span className={errMessage}>User with that email already exists.</span>
                  <label htmlFor="adress">
                    <i className="fa fa-address-card-o" /> Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={user.address}
                    placeholder="542 W. 15th Street"
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="city">
                    <i className="fa fa-institution" /> City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={user.city}
                    placeholder="New York"
                    onChange={handleChange}
                    required
                  />

                  <div className="row">
                    <div className="col-50">
                      <label htmlFor="state">State</label>
                      <input
                        type="text"
                        name="state"
                        value={user.state}
                        placeholder="NY"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-50">
                      <label htmlFor="zip">Zip</label>
                      <input
                        type="text"
                        name="zip"
                        value={user.zip}
                        placeholder="10001"
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
              <input type="submit" value="Purchase" className="btn" />
            </form>
          </div>
        </div>
        <div className="col-25">
          <div className="container">
            <h4>
              In Your Cart{' '}
              <span className="price" style={{ color: 'black' }}>
                <i className="fa fa-shopping-cart" /> <b>{cart.length}</b>
              </span>
            </h4>
            {cart.map(item => {
              totalPrice += item.glass.price;
              return <p key={item.id}>
                {console.log('item', item)}
                <Link to={`/glasses/${item.glass.id}`}>{item.glass.name}</Link> <span className="price">${`${item.glass.price}`}</span>
              </p>
            })
            }


            <hr />
            <p>
              <b>Total{' '}</b>
              <span className="price" style={{ color: 'black' }}>
                <b>${`${totalPrice}`}</b>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
