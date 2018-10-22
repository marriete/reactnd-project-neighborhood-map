import React, { Component } from 'react';
import Map from './Map.js'
import './App.css';

class App extends Component {
  state = {
    markers: [
      {title: "Dunkin' Donuts", position: {lat: 39.639102, lng: -84.225591}},
      {title: "Chick-Fil-A", position: {lat: 39.629376, lng: -84.195062}}
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
        <Map
          id="map"
          options={{
            center: {lat: 39.63867, lng: -84.215963},
            zoom: 15
          }}
          createMarker={this.createMarker}
          markers={this.state.markers} />
      </div>
    );
  }
}

export default App;
