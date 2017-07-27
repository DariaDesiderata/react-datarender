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

      const lowestPrice = priceObj => {
        let lowestUnit = null;
        let lowestVal = null;
        Object.keys(priceObj).forEach(key => {
          const objValue = priceObj[key];
          if (
            lowestVal === null &&
            typeof objValue === 'number' &&
            objValue !== 0
          ) {
            lowestUnit = key;
            lowestVal = objValue;
          } else if (
            typeof lowestVal === 'number' &&
            (objValue > 0 && objValue < lowestVal)
          ) {
            lowestUnit = key;
            lowestVal = objValue;
          }
        });

        return { [lowestUnit]: lowestVal };
      };

      return (
        <ShowCard
          key={item.id}
          item={item}
          lowestPrice={lowestPrice(priceObj)}
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
