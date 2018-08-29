import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import Stars from 'react-stars';
import './restaurant.css';

export default class Restaurant extends Component {

  render() {
    const r = this.props.restaurant;
    return (
      <div>
        <Row className='restaurant'>
          <Col xs="3">
            <img className='rounded' src={r.image_url} alt={`${r.name}-thumbnail`}/>
          </Col>
          <Col xs="9">
              <Row className='ml-2'>
                <Col md='8'>
                  <div className='rest-attributes'>
                    <Row className='rest-title'>{r.name}</Row>
                    <Row className='rest-stars'>
                      <span className='rest-rating pr-3'>{Number.parseFloat(r.stars_count).toFixed(1)} </span>
                      <span className='pr-3'>
                        <Stars className='d-inline-block align-text-bottom'
                          edit={false}
                          value={Math.round(r.stars_count * 2) / 2}
                        />
                      </span>
                      <span className='pr-3'> ({r.reviews_count} reviews)</span>
                    </Row>
                    <Row className='rest-details'>
                      {r.price_range} | {r.food_type} | {r.dining_style}
                    </Row>
                  </div>
                </Col>

                <Col md='4'>
                  <div className='rest-secondary-attributes'> {r.phone_number} </div>
                  <div className='rest-secondary-attributes'> {r.address} </div>
                  <div className='rest-secondary-attributes'> {r.neighborhood} </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
    );
  }

}
