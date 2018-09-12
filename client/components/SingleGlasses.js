import React, { Component } from 'react';
import { fetchSingleGlasses } from '../store/glasses';
import { connect } from 'react-redux';

class SingleGlasses extends Component {
  componentDidMount() {
    this.props.getSingleGlasses(Number(this.props.match.params.id));
  }
  render() {
    const singleGlasses = this.props.singleGlasses[0];

    return !singleGlasses ? null : (
      <div className="single-glasses-container">
        <img className="single-glasses-image" src={singleGlasses.imageUrl} />
        <div className="single-glasses-info">
          <h3>{singleGlasses.name}</h3>
          <h4>{singleGlasses.price}</h4>
        </div>
        <button type="submit">Add To Cart</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { singleGlasses: state.glasses };
};

const mapDispatchToProps = dispatch => ({
  getSingleGlasses: id => dispatch(fetchSingleGlasses(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleGlasses);
