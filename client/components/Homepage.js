import React from 'react';
import { Link } from 'react-router-dom';

const Homepage = props => {
  return (
    <div className="homepage-container">
      <h1>The only place to find your pair of Elton John sunglasess</h1>
      <img src={'glasses.gif'} />
      <br />
      <Link to="/glasses">Browse collection</Link>
    </div>
  );
};

export default Homepage;
