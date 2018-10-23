import React, { Component } from 'react';
import Map from './Map.js'
import FilterMenu from './FilterMenu.js'
import './App.css';
import { Route, Link } from 'react-router-dom'

class App extends Component {
  state = {
    markers: [
      {title: "Dunkin' Donuts", position: {lat: 39.639102, lng: -84.225591}},
      {title: "Chick-Fil-A", position: {lat: 39.629376, lng: -84.195062}},
      {title: "YMCA", position: {lat: 39.665685, lng: -84.240122}},
      {title: "Kroger", position: {lat: 39.601971, lng: -84.230185}},
      {title: "Meijer", position: {lat: 39.67104, lng: -84.220165}},
      {title: "Walmart Supercenter", position: {lat: 39.630666, lng: -84.212289}},
      {title: "Dayton Mall", position: {lat: 39.633682, lng: -84.220963}},
      {title: "Rusty Bucket Tavern", position: {lat: 39.636468, lng: -84.221696}},
      {title: "Rave Cinemas Dayton South and XD", position: {lat: 39.643232, lng: -84.228703}}
    ]
  }

  createMarker = (map, mark) => {
    var marker = new window.google.maps.Marker({
      position: mark.position,
      map: map,
      title: mark.title
    })
  }

  render() {
    return (
      <div className="App">
        <Route exact path="/" render={() => (
          <section>
            <Map
              id="map"
              options={{
                center: {lat: 39.63867, lng: -84.215963},
                zoom: 13
              }}
              createMarker={this.createMarker}
              markers={this.state.markers} />
            <FilterMenu />
          </section>
        )} />
        <Route path="/list" render={() => (
          <div></div>
        )} />
      </div>
    );
  }
}

export default App;
