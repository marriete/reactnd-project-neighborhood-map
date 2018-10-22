import React, { Component } from 'react';
import Map from './Map.js'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Map
          id="map"
          options={{
            center: {lat: 39.63867, lng: -84.215963},
            zoom: 15
          }}
          onMapLoad={map => {
            var marker = new window.google.maps.Marker({
              position: {lat: 39.63867, lng: -84.215963},
              map: map,
              title: 'Hello Dayton!'
            });
          }} />
      </div>
    );
  }
}

export default App;
