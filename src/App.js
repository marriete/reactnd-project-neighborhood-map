import React, { Component } from 'react';
import Map from './Map.js'
import FilterMenu from './FilterMenu.js'
import ListView from './ListView.js'
import './App.css';
import { Route, Link } from 'react-router-dom'
import FilterModal from './FilterModal.js'


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
      {title: "Cinemark - Dayton South", position: {lat: 39.643232, lng: -84.228703}, id: "9CiLinXhVODN0f4skzEthw"}
    ],
    yelpData: [],
    markers: [],
    filters: [],
    checkedFilters: [],
    loaded: false,
    show: false
  }

  getYelpData = (locations) => {
    let yelpData = [];

    locations.forEach((location, index) => {
      let config = {
        headers: {'Authorization': "Bearer 1rk0i7zyjBP9sW-Ji0lLaljcswABo0q42PQRS_lTSmR2t2eicmMnyI1Ux6_nL-djivA0n1YAlm-OoIzBKY9kzhwx5MGCZzm46Qk5wQIfA0BdoplrE_LWsFJs8IbPW3Yx"},
        params: {
          id: location.id
        }
      }

      var proxyUrl = "http://localhost:8080/";
      var targetUrl = `https://api.yelp.com/v3/businesses/${config.params.id}`;

      setTimeout(() => {
        fetch(proxyUrl + targetUrl, config)
        .then(response => {
          console.log("success")
          response.json().then(data => {
            yelpData.push(data);
            this.getFilters(data);
            this.setState(yelpData)
            if (index === 8) {
              this.setState({loaded: true})
            }
          })
        })
        .catch(event => {
          console.log("failure")
        })}, 400*index);
    })

    return yelpData;
  }

  getFilters = (data) => {
    data.categories.forEach((cat) => {
      if ( !this.state.filters.includes( cat.title )) {
        this.setState({ filters: [ ...this.state.filters, cat.title ]})
      }
    });
    this.getCheckedMarkers();
  }

  createMarker = (map, mark) => {
    var marker = new window.google.maps.Marker({
      position: {lat: mark.coordinates.latitude, lng: mark.coordinates.longitude},
      map: map,
      title: mark.name
    })

    return marker;
  }

  createInfoWindow = (content, marker, map) => {
    var infoWindow = new window.google.maps.InfoWindow({
      content: content
    });
    marker.addListener('click', function() {
      infoWindow.open(map, marker)
    });
  }

  returnPhoneNumber = (phoneNumber) => {
    var areaCode = phoneNumber.substring(2,5);
    var prefix = phoneNumber.substring(5,8);
    var line = phoneNumber.substring(8,12);

    return areaCode + "-" + prefix + "-" + line;
  }

  showModal = () => {
    this.setState({ show: true });
  }

  hideModal = () => {
    this.setState({ show: false });
  }

  containsObject = (objectArray, newObject) => {
    let testArray = objectArray.map(obj => {
      if (obj.id === newObject.id )
        return true
      else
        return false
    })
    if (testArray.includes(true))
      return true
    else
      return false
  }

  getCheckedMarkers = () => {
    let result = [];
    if ( this.state.checkedFilters.length === 0 ) {
      result = this.state.yelpData
    } else {
      this.state.checkedFilters.forEach((filterOption) => {
        let test = null;
        test = this.state.yelpData.filter(marker => {
          let booleanArray = []
          marker.categories.forEach((cat) => {
            if (cat.title === filterOption) {
              booleanArray = [...booleanArray, true]
            } else {
              booleanArray = [...booleanArray, false]
            }
          })
          return booleanArray.includes(true)
        })
        if ( !this.containsObject( result, test[0] ) ) {
          result = result.concat( test );
        }
      })
    }
    console.log(result)
    this.setState({markers: result})
  }

  checkboxChange = (e) => {
    console.log(e.target.checked)
    if (e.target.checked === true) {
      this.setState({checkedFilters: [...this.state.checkedFilters, e.target.value]}, () => {this.getCheckedMarkers()})
    } else {
      let temp = []
      temp = this.state.checkedFilters.filter((option) => {
        return e.target.value !== option
      })
      this.setState({checkedFilters: temp}, () => {this.getCheckedMarkers()})
    }
  }

  async componentWillMount() {
    let yelpData = await this.getYelpData(this.state.locations);
    this.setState({yelpData});
  }

  content() {
    return(
      <div className="App">
        <button className="filter-button" type="button" onClick={this.showModal}>Filters</button>
        <FilterModal show={this.state.show} handleClose={this.hideModal} changeFunction={this.checkboxChange} filters={this.state.filters} />
        <Route exact path="/" render={() => (
          <section>
            <Map
              id="map"
              options={{
                center: {lat: 39.63867, lng: -84.215963},
                zoom: 13
              }}
              createMarker={this.createMarker}
              createInfoWindow={this.createInfoWindow}
              returnPhoneNumber={this.returnPhoneNumber}
              markers={this.state.markers} />
            <Link type="button" className="to-list" to="/list">List View</Link>
          </section>
        )} />
        <Route path="/list" render={() => (
          <ListView
            markers={this.state.markers}
            returnPhoneNumber={this.returnPhoneNumber} />
        )} />
      </div>
    )
  }

  render() {
    return (
      <div className="App">
        {this.state.loaded ? this.content() : <div>Loading...</div>}
      </div>
    );
  }
}

export default App;
