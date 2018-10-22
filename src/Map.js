import React, { Component } from 'react'
import Marker from './Marker.js'

class Map extends Component {
	state = {
		map: null
	}

	onScriptLoad() {
		const map = new window.google.maps.Map(
			document.getElementById(this.props.id),
			this.props.options);
		this.setState({map})
	}

	componentDidMount() {
		if (!window.google) {
			var script = document.createElement('script');
			script.type = 'text/javascript';
			script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyA45Kaoio3gDd4K2qUppRAPv7qhKkzOh90`;
			var x = document.getElementsByTagName('script')[0];
			x.parentNode.insertBefore(script, x);

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
					<Marker marker={marker} map={this.state.map} createMarker={this.props.createMarker} key={index} />
				))}
				}
			</div>
		)
	}
}

export default Map