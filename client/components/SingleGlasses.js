import React, { Component } from 'react';
import { fetchSingleGlasses } from '../store/glasses';
import { postOrder } from '../store/order';
import { connect } from 'react-redux';

class SingleGlasses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inCart: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getSingleGlasses(Number(this.props.match.params.id));
  }

  handleSubmit() {
    const id = this.props.user.id;
    const singleGlasses = this.props.singleGlasses[0];
    const order = {
      glassId: singleGlasses.id,
      purchaseDate: Date.now(),
    };
    if (id) order.userId = id;
    this.props.postOrder(order);
  }
  render() {
    const singleGlasses = this.props.singleGlasses[0];

    return !singleGlasses ? null : (
      <div className="single-glasses-container">
        <img className="single-glasses-image" src={singleGlasses.imageUrl} />
        <div className="single-glasses-info">
          <h3>{singleGlasses.name}</h3>
          <h3>${singleGlasses.price}</h3>
        </div>
        <button
          type="submit"
          onClick={this.handleSubmit}
          disabled={
            this.props.orders.filter(order => order.glassId === singleGlasses.id).length === 1
              ? true
              : null
          }
        >
          Add To Cart
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  singleGlasses: state.glasses,
  user: state.user,
  orders: state.order,
});

const mapDispatchToProps = dispatch => ({
  getSingleGlasses: id => dispatch(fetchSingleGlasses(id)),
  postOrder: order => dispatch(postOrder(order)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleGlasses);
