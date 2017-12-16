import React, { Component } from 'react';
import axios from 'axios';

function importAll(r) {
  let icons = {};
  r.keys().map((item, index) => { icons[item.replace('./', '')] = r(item); });
  return icons;
}
const icons = importAll(require.context('./icons', false, /\.(png)$/));

class FetchWeather extends Component {
  constructor(props) {
    super(props);

    this.state = {
      forecast: null,
      temp: "Farenheit"
    }

    this.toggleTemp = this.toggleTemp.bind(this);
  }

  async componentDidMount() {
    const res = await axios.get(
      "http://api.aerisapi.com/forecasts/11101?client_id=2Dk70ivyDNeHXRs87jMEa&client_secret=dB7b8Iw5IxDjeAdf5I9LdLOPPtPkKYVL6JgG7slz"
    );
    const [ forecast ] = res.data.response;
    this.setState({forecast});
  }

  toggleTemp(e) {
    e.preventDefault();
    let temp = this.state.temp === "Farenheit" ? "Celcius" : "Farenheit";
    this.setState({temp});
  }

  render () {
    const { forecast, temp } = this.state;
    const change = temp === "Farenheit" ? "Celcius" : "Farenheit";
    if (forecast === null) {
      return (
        <div>
          <h2>
            The Weather for your area is currently unavailable.
            Please check back soon.
          </h2>
        </div>
      );
    } else {
      return (
        <div className="weather-container">
            <WeatherInfo {...forecast} temp={temp.slice(0, 1)} />
          <button
            className="change-button"
            onClick={this.toggleTemp}>
            Click here to change your weather to {change}.
          </button>
        </div>
      )
    }
  }
}

export default FetchWeather;

const WeatherInfo = (forecast) => {
  const { periods, temp } = forecast;
  const week = periods.map((day, idx) => ( <WeatherItem key={idx} {...day} temp={temp} /> ));

  return (
    <div className="weather-week-container">
      {week}
    </div>
  )
}

const WeatherItem = ({minTempC, minTempF, maxTempC, maxTempF, dateTimeISO, icon, temp }) => {
  debugger
  let date = dateTimeISO.slice(0, dateTimeISO.indexOf("T"));
  const high = temp === "F" ? maxTempF : maxTempF;
  const low = temp === "F" ? maxTempC : minTempC;
  return (
    <div className="weather-item">
      <h3>{date}</h3>
      <img src={icons[`${icon}`]} alt="weather icon"/>
      <p className="min-max">High: {high}{`°${temp}`}</p>
      <p className="min-max">Low: {low}{`°${temp}`}</p>
    </div>
  )
}
