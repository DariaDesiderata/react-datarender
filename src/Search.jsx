import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
  min-width: 18%;
  border: 2px solid hsla(151, 17%, 83%, 0.85);
  border-radius: 4px;
  margin: 25px;
  padding: 10px;
  overflow: hidden;
`;

const Search = props =>
  <Input
    onChange={props.handleSearchTermChange}
    value={props.value}
    type="text"
    placeholder="Search"
  />;

export default Search;
