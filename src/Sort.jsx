import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.select`
  padding: 15px;
  margin: 10px;
  height: 40px;
  font-size: 1.2em;
`;
const Sort = props =>
  <div className="sortBy">
    <span>Sort </span>
    <Wrapper onChange={props.handleSort}>
      <option value="alphabetically">Alphabetically</option>
      <option value="ascending">Price: lowest to highest</option>
      <option value="descending">Price: highest to lowest</option>
    </Wrapper>
  </div>;

export default Sort;
