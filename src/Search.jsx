import React, { Component } from 'react';
import ShowCard from './ShowCard';
import axios from 'axios';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
      apiData: []
    };
    this.handleSearchTermChange = this.handleSearchTermChange.bind(this);
  }
  handleSearchTermChange(event) {
    this.setState({ searchTerm: event.target.value });
  }
  componentDidMount() {
    axios
      .get(
        'https://weedmaps.com/dispensaries/native-roots-apothecary/menu_items.json'
      )
      .then(res => {
        this.setState({ apiData: res.data });
        console.log(res.data);
      });
  }
  render() {
    return (
      <div className="search">
        <header>
          <input
            onChange={this.handleSearchTermChange}
            value={this.state.searchTerm}
            type="text"
            placeholder="Search"
          />
        </header>
        <div>
          {this.state.apiData
            .filter(
              item =>
                `${item.name} ${item.description}`
                  .toUpperCase()
                  .indexOf(this.state.searchTerm.toUpperCase()) >= 0
            )
            .map(item => <ShowCard key={item.id} item={item} />)}
        </div>
      </div>
    );
  }
}

export default Search;
