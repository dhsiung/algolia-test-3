import './pagination.css';
import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Row, Col, Button } from 'reactstrap';

export default class Pagination extends Component {

  activeBackBtn() {
    return this.props.currPage > 0 ? '' : 'disabled';
  }

  activeNextBtn() {
    return this.props.currPage < this.props.totalPages ? '' : 'disabled';
  }

  prevPageHandler = (e) => {
    if (e.currentTarget.classList.contains('disabled')) { return }
    this.props.updatePageNum(this.props.currPage - 1);
  }

  nextPageHandler = (e) => {
    if (e.currentTarget.classList.contains('disabled')) { return }
    this.props.updatePageNum(this.props.currPage + 1);
    window.scrollTo(0,0);
  }

  render() {
    return (
      <Row>
        <Col md='6'>
          <Button outline color="secondary" className={this.activeBackBtn()}
            onClick={this.prevPageHandler.bind(this)}
          >
            Previous Page
          </Button>
        </Col>
        <Col md='6'>
          <Button outline color="secondary" className={this.activeNextBtn()}
            onClick={this.nextPageHandler.bind(this)}
          >
            Next Page
          </Button>
        </Col>
      </Row>
    );
  }
}

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  currPage: PropTypes.number.isRequired,
  updatePageNum: PropTypes.func.isRequired,
};

Pagination.defaultProps = {
  totalPages: 0,
  currPage: 0,
};
