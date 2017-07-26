import React from 'react';

const Search = props =>
  <input
    onChange={props.handleSearchTermChange}
    value={props.value}
    type="text"
    placeholder="Search"
  />;

export default Search;
