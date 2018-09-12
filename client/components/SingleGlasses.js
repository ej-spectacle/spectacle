import React, { Component } from 'react';
import { fetchSingleGlasses } from '../store/glasses';
import { connect } from 'react-redux';

class SingleGlasses extends Component {
  render() {
    const { singleGlasses } = this.props;

    return (
      <div className="single-glasses-container">
        <img className="single-glasses-image" src={singleGlasses.imageUrl} />
        <div className="single-glasses-info">
          <h3>{singleGlasses.name}</h3>
          <h4>{singleGlasses.price}</h4>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  singleGlasses: state.singleGlasses,
});

const mapDispatchToProps = dispatch => ({
  getSingleGlasses: id => dispatch(fetchSingleGlasses(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleGlasses);
