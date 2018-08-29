import React, { Component } from 'react';
import './search_bar.css';
import AgAutocomplete from 'react-algoliasearch';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {searchValue: ''};
  }

  changeHandler = (event, suggestion) => {
    const query = [suggestion.food_type, suggestion.neighborhood, suggestion.area, suggestion.city];
    this.props.assignTopResult([suggestion]);
    this.props.updateAutocompleteSearch(query);
  }

  render() {
    return (
      <div id="search-container" className='p-4'>
        <AgAutocomplete
          apiKey={this.props.algoliaVars.apiKey}
          appId={this.props.algoliaVars.appId}
          displayKey="name"
          hitsPerPage={5}
          indices={[{index: this.props.algoliaVars.indexName}]}
          inputId="input-search"
          placeholder="Search for Restaurants by Name, Cuisine, Location"
          selected={this.changeHandler}
          clearOnSelected={true}
        />
      </div>

    );
  }
}
