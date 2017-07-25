import React, { Component } from 'react';
import ShowCard from './ShowCard';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
      products: []
    };
    this.handleSearchTermChange = this.handleSearchTermChange.bind(this);
    this.handleSort = this.handleSort.bind(this);
  }

  handleSearchTermChange(event) {
    this.setState({ searchTerm: event.target.value });
  }
  handleSort(event) {
    if (event.target.value === 'ascending') {
      this.setState(prevState => {
        this.state.products.sort((a, b) => {
          let priceA = a.price_gram ? a.price_gram : a.price_unit;
          let priceB = b.price_gram ? b.price_gram : b.price_unit;
          return priceA - priceB;
        });
      });
    } else if (event.target.value === 'descending') {
      this.setState(prevState => {
        this.state.products.sort((a, b) => {
          let priceA = a.price_gram ? a.price_gram : a.price_unit;
          let priceB = b.price_gram ? b.price_gram : b.price_unit;
          return priceB - priceA;
        });
      });
    } else {
      this.setState(prevState => {
        this.state.products.sort((a, b) => {
          let prodA = a.name.toUpperCase();
          let prodB = b.name.toUpperCase();
          return prodA < prodB ? -1 : prodA > prodB ? 1 : 0;
        });
      });
    }
  }

  componentDidMount() {
    axios
      .get(
        'https://weedmaps.com/dispensaries/native-roots-apothecary/menu_items.json'
      )
      .then(res => {
        this.setState({ products: res.data });
      });
  }
  render() {
    return (
      <div className="search">
        <input
          onChange={this.handleSearchTermChange}
          value={this.state.searchTerm}
          type="text"
          placeholder="Search"
        />
        <div className="sortBy">
          <span>Sort</span>
          <select onChange={this.handleSort}>
            <option value="alphabetically">Alphabetically</option>
            <option value="ascending">Price: lowest to highest</option>
            <option value="descending">Price: highest to lowest</option>
          </select>
        </div>
        <Container>
          {this.state.products
            .filter(
              item =>
                `${item.name} ${item.description}`
                  .toUpperCase()
                  .indexOf(this.state.searchTerm.toUpperCase()) >= 0
            )
            .map(item => <ShowCard key={item.id} item={item} />)}
        </Container>
      </div>
    );
  }
}

export default Search;
