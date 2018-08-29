import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';

export default class PaymentFilter extends Component {
  static PAYMENT_OPTIONS = ['AMEX', 'Discover', 'MasterCard', 'Visa']

  constructor(props) {
   super(props);

   this.state = { activePayment: null }
   this.updatePayment = this.updatePayment.bind(this);
  }

  updatePayment = (opt) => {
    if (this.state.activePayment === opt) {
      // Resets the payment filter if already active
      this.setState({activePayment: null});
      this.props.updatePayment('');
    } else {
      this.setState({activePayment: opt});
      this.props.updatePayment(opt);
    }
  }

  active = (paymentType) => {
    if (this.state.activePayment === paymentType) {
      return 'active';
    } else {
      return '';
    }
  }

  renderPaymentOptions = () => {
    return PaymentFilter.PAYMENT_OPTIONS.map((opt, idx) => {
      return(
        <Row key={idx} className={this.active(opt) + ' filter-option'}
          onClick={() => {this.updatePayment(opt)}}
        >
          <Col md={12}>{opt}</Col>
        </Row>
      )
    })
  }

  render() {
    const paymentOptions = this.renderPaymentOptions();
    return (
      <div className='results-filter'>
        <div className='filter-title'> Payment Options </div>
        <div className='filter-options'>{paymentOptions}</div>
      </div>
    );
  }

}
