import React, { Component } from 'react';
import logo from './loading.png';
import './App.css';
import MainView from './MainView.jsx';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 99%;
  background-color: hsla(145, 86%, 37%, 1);
  border-radius: 4px;
  margin-bottom: 25px;
  overflow: hidden;
`;

class App extends Component {
  render() {
    return (
      <div className="App">
        <Wrapper className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Native Roots apothecary menu</h2>
        </Wrapper>
        <div>
          <MainView />
        </div>
      </div>
    );
  }
}

export default App;
