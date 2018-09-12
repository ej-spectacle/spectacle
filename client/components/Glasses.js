import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { NavLink } from 'react-router-dom'
import { fetchGlasses } from '../store'

//CG: I shouldn't see any divs that don't a related identifier in a particular component.
class Glasses extends Component {
  componentDidMount() {
    //CG: checking if you have glasses already in your reducer. 
    // if(!this.props.allGlasses){
      this.props.getGlasses()
    // }
  }

  //CG: top-level usually denotes the component i'm in or the wrapper .
  //products-container
  //all-products
  //all-products-single-card
  //all-products-single-card-image
  //all-products-single-card-text
  render() {
    const { allGlasses } = this.props
    return (
      <div className="products">
        <h1>All Products</h1>
        <div className="all-products">
          {allGlasses.map(glasses => {
            return (
              <div className="single-product" key={glasses.id}>
                <img src={glasses.imageUrl} />
                <h3>{glasses.name}</h3>
                <h3>{glasses.price}</h3>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    allGlasses: state.glasses,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getGlasses: () => dispatch(fetchGlasses()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Glasses)
