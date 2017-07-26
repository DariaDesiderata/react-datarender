import React, { Component } from 'react';
import ShowCard from './ShowCard';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

class TabContent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { products } = this.props;
    const getKey = (value, obj) => {
      for (let prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          if (obj[prop] === value) return prop;
        }
      }
    };
    const showProduct = products.map(item => {
      let priceObj = {
        half_gram: item.price_half_gram,
        gram: item.price_gram,
        two_grams: item.price_two_grams,
        eighth: item.price_eighth,
        quarter: item.price_quarter,
        half_ounce: item.price_half_ounce,
        ounce: item.price_ounce,
        each: item.price_unit
      };
      let arr = Object.values(priceObj);
      let lowestPrice = Math.min(...arr.filter(Boolean));
      let unit = getKey(lowestPrice, priceObj);

      return (
        <ShowCard
          key={item.id}
          item={item}
          lowestPrice={lowestPrice}
          unit={unit}
        />
      );
    });
    return (
      <Container>
        {showProduct}
      </Container>
    );
  }
}

export default TabContent;
