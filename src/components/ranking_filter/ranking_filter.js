import React, { Component } from 'react';
import Stars from 'react-stars';
import { Row, Col } from 'reactstrap';

export default class RankingFilter extends Component {
  static RANKS = [0, 1, 2, 3, 4, 5];


  constructor(props) {
   super(props);

   this.state = { activeRank: null }
   this.updateRank = this.updateRank.bind(this);
  }

  updateRank = (rank) => {
    if (this.state.activeRank === rank) {
      // Resets the payment filter if already active
      this.setState({activeRank: null});
      this.props.updateRank('');
    } else {
      this.setState({activeRank: rank});
      this.props.updateRank(rank);
    }
  }

  active = (rank) => {
    if (this.state.activeRank === rank) {
      return 'active';
    } else {
      return '';
    }
  }

  renderRankFilter = () => {
    return RankingFilter.RANKS.map((rank, idx) => {
      return(
        <Row className={this.active(rank) + ' filter-option'}
          onClick={() => {this.updateRank(rank)}}
          key={idx}
        >
          <Col md={12}>
            <Stars edit={false} value={rank}/>
          </Col>
        </Row>
      )
    })
  }

  render() {
    const rankFilter = this.renderRankFilter();
    return (
      <div className='results-filter'>
        <div className='filter-title'> Rating </div>
        <div className='filter-options'>{rankFilter}</div>
      </div>
    );
  }

}
