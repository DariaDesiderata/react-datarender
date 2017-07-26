import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 32%;
  border: 2px solid hsla(151, 17%, 83%, 0.85);
  border-radius: 4px;
  margin: 25px;
  padding: 10px;
  overflow: hidden;
`;

const ShowCard = props =>
  <Wrapper>
    <div>
      <h3>
        Product name: {props.item.name}
      </h3>
      <h4>
        Description: {props.item.body}
      </h4>
      <p>
        Price:{' '}
        {props.unit !== undefined
          ? `$${props.lowestPrice} for ${props.unit}`
          : 'call'}
      </p>
    </div>
  </Wrapper>;

export default ShowCard;
