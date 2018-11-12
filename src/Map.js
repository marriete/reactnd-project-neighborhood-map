import React, { Component } from 'react'
import Marker from './Marker.js'

class Map extends Component {
	createInfoWindow = () => {
    window.google.maps.InfoWindow.prototype.opened = false
    var infoWindow = new window.google.maps.InfoWindow()
    return infoWindow
	}

	onScriptLoad = () => {
		const map = new window.google.maps.Map(
			document.getElementById(this.props.id),
			this.props.options)
		const infoWindow = this.createInfoWindow()
		this.props.saveMap(map, infoWindow)
	}

	componentDidMount() {
		if (!window.google) {
			var script = document.createElement('script')
			script.type = 'text/javascript'
			script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyA45Kaoio3gDd4K2qUppRAPv7qhKkzOh90`
			var x = document.getElementsByTagName('script')[0]
			x.parentNode.insertBefore(script, x)

			script.addEventListener('load', event => {
				this.onScriptLoad()
			})
		} else {
			this.onScriptLoad()
		}
	}

	render() {
		return (
			<div id={this.props.id} >
				{this.props.markers.map((marker, index) => (
					<Marker
						marker={marker}
						map={this.props.map}
						googleMarker={typeof this.props.googleMarkers[index] !== "undefined" ? this.props.googleMarkers[index] : null}
						googleMarkers={this.props.googleMarkers}
						createMarker={this.props.createMarker}
						infoWindow={this.props.infoWindow}
						infoWindowListener={this.props.infoWindowListener}
						returnPhoneNumber={this.props.returnPhoneNumber}
						addGoogleMarker={this.props.addGoogleMarker}
						showSelectMarkers={this.props.showSelectMarkers}
						initialized={this.props.initialized}
						toggleInit={this.props.toggleInit}
						key={marker.id} />
				))}
			</div>
		)
	}
}

export default Map