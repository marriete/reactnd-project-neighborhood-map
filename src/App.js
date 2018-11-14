import React, { Component } from 'react'
import Map from './Map.js'
import ListView from './ListView.js'
import './App.css'
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
    map: null,
    googleMarkers: [],
    infoWindows: [],
    infoWindow: null,
    checkedFilters: [],
    loaded: false,
    show: false,
    initialized: false
  }

  // Function to retrieve Yelp Data for provided locations in state
  getYelpData = (locations) => {
    let yelpData = []

    locations.forEach((location, index) => {
      let config = {
        headers: {'Authorization': "Bearer 1rk0i7zyjBP9sW-Ji0lLaljcswABo0q42PQRS_lTSmR2t2eicmMnyI1Ux6_nL-djivA0n1YAlm-OoIzBKY9kzhwx5MGCZzm46Qk5wQIfA0BdoplrE_LWsFJs8IbPW3Yx"},
        params: {
          id: location.id
        }
      }

      var proxyUrl = "http://localhost:8080/"
      var targetUrl = `https://api.yelp.com/v3/businesses/${config.params.id}`

      setTimeout(() => {
        fetch(proxyUrl + targetUrl, config)
        .then(response => {
          console.log("success")
          response.json().then(data => {
            yelpData.push(data)
            this.getFilters(data)
            this.setState(yelpData)
            if (index === 8) {
              this.setState({loaded: true})
            }
          })
        })
        .catch(event => {
          console.log("failure")
        })}, 500*index)
    })
    return yelpData
  }

  // Function to go through Yelp Data to find all potential Category filters for our modal window filter system
  getFilters = (data) => {
    data.categories.forEach((cat) => {
      if ( !this.state.filters.includes( cat.title )) {
        this.setState({ filters: [ ...this.state.filters, cat.title ]})
      }
    })
    this.getCheckedMarkers()
  }

  // Function used to determine when first rendering of map is completed
  toggleInit = () => {
    this.setState({initialized: true})
  }

  // Function used in child component to generate each Google marker
  createMarker = (map, mark) => {
    var icon = {
      url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
      scaledSize: new window.google.maps.Size(40, 40)
    }
    var marker = new window.google.maps.Marker({
      position: {lat: mark.coordinates.latitude, lng: mark.coordinates.longitude},
      map: map,
      title: mark.name,
      icon: icon
    })
    return marker
  }

  // Function used in child component to add shareable infoWindow event listener to each marker
  infoWindowListener = (content, marker, map, infoWindow) => {
    var redIcon = {
      url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
      scaledSize: new window.google.maps.Size(40, 40)
    }
    var yellowIcon = {
      url: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
      scaledSize: new window.google.maps.Size(40, 40)
    }
    marker.addListener('click', () => {
      if(infoWindow.opened){
        if(marker.getIcon().url === 'http://maps.google.com/mapfiles/ms/icons/red-dot.png') {
          window.google.maps.event.trigger(infoWindow, 'closeclick')
          infoWindow.setContent(content)
          marker.setIcon(yellowIcon)
          infoWindow.open(map, marker)
          infoWindow.opened = true
        } else {
          marker.setIcon(redIcon)
          infoWindow.close(map, marker)
          infoWindow.opened = false
        }
      }
      else{
        infoWindow.setContent(content)
        marker.setIcon(yellowIcon)
        infoWindow.open(map, marker)
        infoWindow.opened = true
      }
    })
    infoWindow.addListener('closeclick', function() {
      marker.setIcon(redIcon)
      infoWindow.close(map, marker)
      infoWindow.opened = false
    })
  }

  // Function used to return an international phone number in the standard xxx-xxx-xxxx string format
  returnPhoneNumber = (phoneNumber) => {
    var areaCode = phoneNumber.substring(2,5)
    var prefix = phoneNumber.substring(5,8)
    var line = phoneNumber.substring(8,12)

    return areaCode + "-" + prefix + "-" + line
  }

  // Function used to display filter modal
  showModal = () => {
    this.setState({ show: true })
  }

  // Function used to hide filter modal
  hideModal = () => {
    this.setState({ show: false })
  }

  // Function used to determine if an object belongs to a specific array of objects
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

  // Function used to pull out desired marker data depending on filter selections
  getCheckedMarkers = () => {
    let result = []
    if ( this.state.checkedFilters.length === 0 ) {
      result = this.state.yelpData
    } else {
      this.state.checkedFilters.forEach((filterOption) => {
        let test = null
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
        for(let i=0; i<test.length; i++) {
          if ( !this.containsObject( result, test[i] ) ) {
            result = result.concat( test[i] )
          }
        }
      })
    }
    this.setState({markers: result}, () => this.showSelectMarkers())
  }

  // Function used to add Google marker information to the state
  addGoogleMarker = (marker) => {
    this.setState((prevState) => ({
      googleMarkers: [...prevState.googleMarkers, marker]
    }))
  }

  // Function used to add Google map information to the state
  saveMap = (map, infoWindow) => {
    this.setState({
      map: map,
      infoWindow: infoWindow
    })
  }

  // Function used to handle checkbox click event
  checkboxChange = (e) => {
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

  // Function used to set all marker maps to null
  hideAllMarkers = () => {
    for(let i=0; i<this.state.googleMarkers.length; i++){
      if ( this.state.googleMarkers[i].map !== null)
        this.state.googleMarkers[i].setMap(null)
    }
  }

  // Function used to display specifically filtered markers
  showSelectMarkers = () => {
    if(this.state.initialized === true) {
      this.hideAllMarkers()
      let desiredMarkers = this.filterMarkers()
      for (let i=0; i < desiredMarkers.length; i++) {
        if (this.state.googleMarkers[desiredMarkers[i]].map === null)
          this.state.googleMarkers[desiredMarkers[i]].setMap(this.state.map)
      }
    }
  }

  // Function used to return an array of the filtered marker indexes
  filterMarkers = () => {
    return this.state.markers.map((marker) => {
      for(let i=0; i < this.state.googleMarkers.length; i++) {
        if (this.state.googleMarkers[i].title === marker.name) {
          return i
        }
      }
    })
  }

  async componentWillMount() {
    let yelpData = await this.getYelpData(this.state.locations)
    this.setState({yelpData})
  }

  content() {
    return(
      <div className="App">
        <button className="filter-button" type="button" onClick={this.showModal} onKeyPress={this.showModal}>Filter Markers</button>
        <FilterModal show={this.state.show} handleClose={this.hideModal} changeFunction={this.checkboxChange} filters={this.state.filters} />
        <Route exact path="/" render={() => (
          <section>
            <Link type="button" className="to-list" to="/list">List View</Link>
            <Map
              id="map"
              options={{
                center: {lat: 39.63867, lng: -84.215963},
                zoom: 13
              }}
              createMarker={this.createMarker}
              infoWindow={this.state.infoWindow}
              infoWindowListener={this.infoWindowListener}
              returnPhoneNumber={this.returnPhoneNumber}
              markers={this.state.yelpData}
              googleMarkers={this.state.googleMarkers !== [] ? this.state.googleMarkers : null}
              addGoogleMarker={this.addGoogleMarker}
              showSelectMarkers={this.showSelectMarkers}
              saveMap={this.saveMap}
              map={this.state.map}
              initialized={this.state.initialized}
              toggleInit={this.toggleInit} />
          </section>
        )} />
        <Route path="/list" render={({history}) => (
          <ListView
            markers={this.state.markers}
            googleMarkers={this.state.googleMarkers !== [] ? this.state.googleMarkers : null}
            returnPhoneNumber={this.returnPhoneNumber}
            history={history} />
        )} />
      </div>
    )
  }

  render() {
    return (
      <div className="App">
        {this.state.loaded ? this.content() :
          <div className="wrap">
            <div className="loading">
              <div className="bounceball"></div>
              <div className="text">LOADING...</div>
            </div>
          </div>}
      </div>
    )
  }
}

export default App
