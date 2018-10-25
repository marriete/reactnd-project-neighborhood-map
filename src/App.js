import React, { Component } from 'react';
import Map from './Map.js'
import FilterMenu from './FilterMenu.js'
import ListView from './ListView.js'
import './App.css';
import { Route, Link } from 'react-router-dom'


class App extends Component {
  state = {
    locations: [
      {title: "Dunkin' Donuts", position: {lat: 39.639102, lng: -84.225591}, id: "K1G-truG2BcJLhQMFGFa5A"},
      {title: "Chick-Fil-A", position: {lat: 39.629376, lng: -84.195062}, id: "IvcTWxI_QbOx0zi4zISi_w"},
      {title: "YMCA", position: {lat: 39.665685, lng: -84.240122}, id: "Nrei_iet_uUGferoEUyOIQ"},
      {title: "Kroger", position: {lat: 39.601971, lng: -84.230185}, id: "XYsa7IbSTiASyfAudt5xVg"},
      {title: "Meijer", position: {lat: 39.67104, lng: -84.220165}, id: "CXJxtvSZwB2s3RYueMVPaA"},
      {title: "Walmart Supercenter", position: {lat: 39.630666, lng: -84.212289}, id: "QkhYR_uPqnQLsedHE96bhw"},
      {title: "Dayton Mall", position: {lat: 39.633682, lng: -84.220963}, id: "qQn0TR-opTfiX02jJnbr0w"},
      {title: "Rusty Bucket Tavern", position: {lat: 39.636468, lng: -84.221696}, id: "-2Bl3K5TtKXE3oknF_sdIw"},
      {title: "Rave Cinemas Dayton South and XD", position: {lat: 39.643232, lng: -84.228703}, id: "0pFHC87CyM8KbHAuCC36sw"}
    ],
    markers: []
  }

  getYelpData = (locations) => {
    let markers = [];

    locations.forEach((location, index) => {
      let config = {
        headers: {'Authorization': "Bearer 1rk0i7zyjBP9sW-Ji0lLaljcswABo0q42PQRS_lTSmR2t2eicmMnyI1Ux6_nL-djivA0n1YAlm-OoIzBKY9kzhwx5MGCZzm46Qk5wQIfA0BdoplrE_LWsFJs8IbPW3Yx"},
        params: {
          id: location.id
        }
      }

      var proxyUrl = "http://localhost:8080/";
      var targetUrl = `https://api.yelp.com/v3/businesses/${config.params.id}`;

      setTimeout(function() {
        fetch(proxyUrl + targetUrl, config)
        .then(response => {
          console.log("success")
          response.json().then(data => {
            console.log(data)
            markers.push(data);
            console.log(markers);
          })
        })
        .catch(event => {
          console.log("failure")
        })}, 300*index);
    })

    return markers;
  }

  createMarker = (map, mark) => {
    var marker = new window.google.maps.Marker({
      position: mark.position,
      map: map,
      title: mark.title
    })
  }

  componentWillMount() {
    let markers = this.getYelpData(this.state.locations);
    this.setState({markers});
  }

  componentDidUpdate() {
    console.log(this.state);
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
              markers={this.state.locations} />
            <Link className="to-list" to="/list">List View</Link>
            {/*<FilterMenu />*/}
          </section>
        )} />
        <Route path="/list" render={() => (
          <ListView markers={this.state.markers} />
        )} />
      </div>
    );
  }
}

export default App;
