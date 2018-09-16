import React from 'react';

const CheckoutForm = props => {
  const { handleChange, handleSubmit, cartCount, user } = props;
  console.log('USER', user);
  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <h1>Checkout</h1>
      </div>
      <div className="row">
        <div className="col-75">
          <div className="container">
            <form>
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
                  />
                  <label htmlFor="adress">
                    <i className="fa fa-address-card-o" /> Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={user.address}
                    placeholder="542 W. 15th Street"
                    onChange={handleChange}
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
                      />
                    </div>
                  </div>
                </div>
              </div>
              <input type="submit" value="Purchase" className="btn" onClick={handleSubmit} />
            </form>
          </div>
        </div>
        <div className="col-25">
          <div className="container">
            <h4>
              Cart{' '}
              <span className="price" style={{ color: 'black' }}>
                <i className="fa fa-shopping-cart" /> <b>{cartCount}</b>
              </span>
            </h4>
            <p>
              <a href="#">Product 1</a> <span className="price">$15</span>
            </p>
            <p>
              <a href="#">Product 2</a> <span className="price">$5</span>
            </p>
            <p>
              <a href="#">Product 3</a> <span className="price">$8</span>
            </p>
            <p>
              <a href="#">Product 4</a> <span className="price">$2</span>
            </p>
            <hr />
            <p>
              Total{' '}
              <span className="price" style={{ color: 'black' }}>
                <b>$30</b>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
