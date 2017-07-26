import React, { Component } from 'react';
import ShowCard from './ShowCard';
import Sort from './Sort';
import Search from './Search';
import TabContent from './TabContent';
import axios from 'axios';
import styled from 'styled-components';

const Button = styled.button`
  height: 40px;
  min-width: 8%;
  margin: 5px;
  padding: 5px;
  cursor: pointer;
  border-radius: 5px;
  background-color: hsla(147, 46%, 50%, 1);
`;

class MainView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
      products: [],
      selectedTab: null
    };
    this.handleSearchTermChange = this.handleSearchTermChange.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.selectTab = this.selectTab.bind(this);
  }

  handleSearchTermChange(event) {
    this.setState({
      searchTerm: event.target.value
    });
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

  selectTab(tabNum) {
    this.setState({
      selectedTab: tabNum
    });
  }

  componentDidMount() {
    axios
      .get(
        'https://weedmaps.com/dispensaries/native-roots-apothecary/menu_items.json'
      )
      .then(res => {
        this.setState({
          products: res.data
        });
      });
  }

  render() {
    const filteredProducts = this.state.products
      .filter(
        item =>
          `${item.name}`
            .toUpperCase()
            .indexOf(this.state.searchTerm.toUpperCase()) >= 0
      )
      .filter(
        item =>
          item.menu_item_category_id === this.state.selectedTab
            ? item
            : this.state.selectedTab === null ? item : null
      );

    return (
      <div className="main">
        <Search
          handleSearchTermChange={this.handleSearchTermChange}
          value={this.state.searchTerm}
        />
        <Sort handleSort={this.handleSort} />
        <div className="tab">
          <Button className="tablinks" onClick={this.selectTab.bind(this, 1)}>
            Indica
          </Button>
          <Button className="tablinks" onClick={this.selectTab.bind(this, 2)}>
            Sativa
          </Button>
          <Button className="tablinks" onClick={this.selectTab.bind(this, 3)}>
            Hybrid
          </Button>
          <Button className="tablinks" onClick={this.selectTab.bind(this, 4)}>
            Extract
          </Button>
          <Button className="tablinks">Edible</Button>
          <Button className="tablinks">Tincture</Button>
          <Button className="tablinks">Topicals</Button>
          <Button className="tablinks">Grow</Button>
          <Button className="tablinks">Gear</Button>
          <Button className="tablinks">Preroll</Button>
        </div>
        <TabContent products={filteredProducts} />
      </div>
    );
  }
}

export default MainView;
