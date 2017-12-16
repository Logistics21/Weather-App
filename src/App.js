import React, { Component } from 'react';
import FetchWeather from './fetchWeather';
import './App.css';
import './weatheritem.css';

class App extends Component {
  render() {
    return (
      <div>
      <header className="App">
        <p className="intro">
          The Weather as Brought to you By David Halsey
        </p>
      </header>
        <FetchWeather />
      </div>
    );
  }
}

export default App;
