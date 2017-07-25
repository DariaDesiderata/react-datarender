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
        <Container>
          {this.state.apiData
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
