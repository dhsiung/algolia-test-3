import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Row, Col } from 'reactstrap';

export default class FoodTypeFilter extends Component {

  constructor(props) {
   super(props);

   this.state = { activeFoodType: null }
   this.updateFoodType = this.updateFoodType.bind(this);
  }

  updateFoodType = (name) => {
    if (this.state.activeFoodType === name) {
      // Resets the payment filter if already active
      this.setState({activeFoodType: null});
      this.props.updateFoodType('');
    } else {
      this.setState({activeFoodType: name});
      this.props.updateFoodType(name);
    }
  }

  active = (name) => {
    if (this.state.activeFoodType === name) {
      return 'active';
    } else {
      return '';
    }
  }

  renderFoodTypeFilter = () => {
    return this.props.foodTypeCounter.map((foodTypeObj, idx) => {
      const name = foodTypeObj.name;
      return (
        <Row className={this.active(name) + ' filter-option'}
          onClick={() => {this.updateFoodType(name)}}
          key={idx}
        >
          <Col md={10}>{name}</Col>
          <Col md={2}>({foodTypeObj.count})</Col>
        </Row>
      )
    });
  }

  render() {
    const foodTypeFilter = this.renderFoodTypeFilter();
    return (
      <div className='results-filter'>
        <div className='filter-title'> Cuisine/Food Type </div>
        <div className='filter-options'> {foodTypeFilter} </div>
      </div>
    );
  }

}

FoodTypeFilter.propTypes = {
  foodTypeCounter: PropTypes.array.isRequired,
  updateFoodType: PropTypes.func.isRequired,
};
