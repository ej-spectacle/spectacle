import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchGlasses } from '../store';
import addCommasToNum from '../../utils';

class Glasses extends Component {
  componentDidMount() {
    this.props.getGlasses();
  }
  render() {
    const { allGlasses } = this.props;
    return (
      <div className="products-container">
        <h1>All Products</h1>
        <div className="all-products">
          {allGlasses.map(glasses => {
            return (
              <div className="single-card" key={glasses.id}>
                <NavLink to={`/glasses/${glasses.id}`} className="single-card-link-wrapper">
                  <img src={glasses.imageUrl} />
                  <h3>{glasses.name}</h3>
                </NavLink>
                <h3>${addCommasToNum(glasses.price)}</h3>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    allGlasses: state.glasses,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getGlasses: () => dispatch(fetchGlasses()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Glasses);
