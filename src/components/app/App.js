import React, { Component } from 'react';
import { Col, Row } from "reactstrap";
import algoliasearch from 'algoliasearch';
import algoliasearchHelper from 'algoliasearch-helper';
import SearchBar from '../search_bar/search_bar';
import RestaurantList from '../restaurant_list/restaurant_list';
import Pagination from '../pagination/pagination';
import PaymentFilter from '../payment_filter/payment_filter';
import RankingFilter from '../ranking_filter/ranking_filter';
import FoodTypeFilter from '../food_type_filter/food_type_filter';
import './App.css';

class App extends Component {

  // Static Vars
  // TODO: Move this into a non-version control environment variable

  static ENV_VARS = { algolia: {
    appId: '7TU0P6ANQY',
    apiKey: 'a90b9a9f9adb4032864dd8dc455f76e6',
    indexName: 'rest_test'
  }}

  constructor(props) {
    super(props);

    this.state = {
      currPage: 0,
      foodTypeCounter: [],
      lat: null,
      lng: null,
      queryTime: 0,
      results: [],
      totalPages: 0,
      topResult: [],
      totalHits: 0,
      // Below are filter states
      autocompleteFilters: [],
      foodTypeFilter: '',
      paymentFilter: '',
      rankFilter: '',
    }
  }

  componentDidMount() {
    this._search();
    this._setGeolocation();
  }

  _setGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }, this._search);
      })
    }
  }


  _search = () => {
    const query = this.state.autocompleteFilters;

    const client = algoliasearch('7TU0P6ANQY', 'a90b9a9f9adb4032864dd8dc455f76e6');
    const helper = algoliasearchHelper(client, 'rest_test', {
      facets: ['food_type', 'stars_count'],
      disjunctiveFacets: ['payment_options'],
      maxValuesPerFacet: 7,
      getRankingInfo: true,
      hitsPerPage: 10,
    })

    this.addGeolocationFilters(helper);
    this.addPaymentFilters(helper);
    this.addRankFilters(helper);
    this.addFoodTypeFilters(helper);

    helper.setQuery(query).setPage(this.state.currPage).search().on('result', content => {
      this.setState({
        foodTypeCounter: content.getFacetValues('food_type', {sortBy: ['count:desc']}),
        results: content.hits,
        totalPages: content.nbPages,
        queryTime: content.processingTimeMS,
        totalHits: content.nbHits,
      });
    })
  }

  // Filter helpers

  addGeolocationFilters = (helper) => {
    if (this.state.lat && this.state.lng) {
      const coordinates = `${this.state.lat}, ${this.state.lng}`;
      helper.setQueryParameter('aroundLatLng', coordinates);
    } else {
      helper.setQueryParameter('aroundLatLngViaIP', true);
    }
  }

  addFoodTypeFilters = (helper) => {
    if (this.state.foodTypeFilter) {
      helper.addFacetRefinement('food_type', this.state.foodTypeFilter);
    }
  }

  addRankFilters = (helper) => {
    if (this.state.rankFilter) {
      helper.addNumericRefinement('stars_count', '>=', this.state.rankFilter);
    }
  }

  addPaymentFilters = (helper) => {
    if (this.state.paymentFilter) {
      helper.addDisjunctiveFacetRefinement("payment_options", this.state.paymentFilter);

      // treat carte blanche and diners club as discover cards
      if (this.state.paymentFilter === 'discover') {
        helper.addDisjunctiveFacetRefinement("payment_options", 'carte blanche');
        helper.addDisjunctiveFacetRefinement("payment_options", 'diners club');
      }
    }
  }

  // Update state helpers

  // Query is an array of filters from the suggestion
  // name, food_type, and neighborhood
  updateAutocompleteSearch = (query) => {
    this.setState({autocompleteFilters: query, currPage: 0});
    this._search();
  }

  updatePageNum = (num) => {
    this.setState({currPage: num}, this._search);
  }

  updatePayment = (paymentType) => {
    this.setState({paymentFilter: paymentType}, this._search);
  }

  updateRank = (rank) => {
    this.setState({rankFilter: rank}, this._search);
  }

  updateFoodType = (foodType) => {
    this.setState({foodTypeFilter: foodType}, this._search);
  }

  assignTopResult = (suggestion) => {
    this.setState({topResult: suggestion});
  }

  orderedResults = () => {
    let seenSuggestions = {};
    const allResults = this.state.topResult.concat(this.state.results);
    return allResults.filter(result => {
      if (seenSuggestions[result.objectID] === undefined) {
        seenSuggestions[result.objectID] = true;
        return true;
      } else {
        return false;
      }
    })
  }

  // function combineJSONData(rest_A, rest_B) {

  //   const sortedRestaurant1 = rest_A.sort((a, b) => {
  //     return parseInt(a.objectID) - parseInt(b.objectID)
  //   })
  //   const sortedRestaurant2 = rest_B.sort((rest1, rest2) => {
  //     return parseInt(rest1.objectID) - parseInt(rest2.objectID)
  //   })
  //   return sortedRestaurant1.map((rest, idx) => {
  //     return Object.assign(rest, sortedRestaurant2[idx])
  //   })
  // }



  render() {


    return (
      <div className="App">
        <div className="main-container">
          <Row>
            <Col sm='12'>
              <SearchBar
                algoliaVars={App.ENV_VARS.algolia}
                assignTopResult={this.assignTopResult}
                updateAutocompleteSearch={this.updateAutocompleteSearch}
              />
            </Col>
          </Row>
          <Row>
          <Col>
             <Row>
              <Col sm='3' id='sidebar' className='border-right'>
                <FoodTypeFilter updateFoodType={this.updateFoodType} foodTypeCounter={this.state.foodTypeCounter}/>
                <RankingFilter updateRank={this.updateRank} />
                <PaymentFilter updatePayment={this.updatePayment} />
              </Col>
              <Col sm='9'>

                <Row className='pr-2 text-left m-2 pt-3 border-bottom'>
                  <Col md={5} className='pl-0'>
                    <span>
                      {this.state.totalHits} results found
                    </span>
                    <span> in {this.state.queryTime / 1000.0} seconds </span>
                  </Col>
                  <Col md={{size: 2, offset: 5}}> <img className="float-right" src="https://www.algolia.com/static_assets/images/pricing/pricing_new/algolia-powered-by-14773f38.svg" alt='algolia-brand'></img> </Col>
                </Row>

                <RestaurantList restaurants={this.orderedResults().slice(0, 10)}/>
                <Pagination
                  currPage={this.state.currPage}
                  totalPages={this.state.totalPages}
                  updatePageNum={this.updatePageNum} />
              </Col>
              </Row>

           </Col>
           </Row>
          </div>
        </div>

    );
  }
}

export default App;
