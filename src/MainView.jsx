/* eslint-diasble */

import React, { Component } from 'react';
import Sort from './Sort';
import Search from './Search';
import TabContent from './TabContent';
import axios from 'axios';
import styled from 'styled-components';
import { userSelectedTab } from './redux/actions/tabs/tabs.action';
import Store from './redux/store/store';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

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
    Store.dispatch(userSelectedTab(tabNum));
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
          <Button onClick={this.selectTab.bind(this, null)}>See all</Button>
          <Button onClick={this.selectTab.bind(this, 1)}>Indica</Button>
          <Button onClick={this.selectTab.bind(this, 2)}>Sativa</Button>
          <Button onClick={this.selectTab.bind(this, 3)}>Hybrid</Button>
          <Button onClick={this.selectTab.bind(this, 5)}>Extract</Button>
          <Button onClick={this.selectTab.bind(this, 4)}>Edible</Button>
          <Button onClick={this.selectTab.bind(this, 9)}>Tincture</Button>
          <Button onClick={this.selectTab.bind(this, 11)}>Topicals</Button>
          <Button onClick={this.selectTab.bind(this, 99)}>Grow</Button>
          <Button onClick={this.selectTab.bind(this, 10)}>Gear</Button>
          <Button onClick={this.selectTab.bind(this, 12)}>Preroll</Button>
        </div>
        <TabContent products={filteredProducts} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  let { currentTab } = state;
  return currentTab;
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      userSelectedTab
    },
    dispatch
  );
}

// export default MainView;

export default connect(mapStateToProps, matchDispatchToProps)(MainView);
