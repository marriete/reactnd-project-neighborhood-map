import React, { Component } from 'react'
import InfoWindow from './InfoWindow.js'

class Marker extends Component {
	state = {
		initialMarker: null,
		googleMarker: null
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.initialMarker !== this.props.marker) {
			this.setState({initialMarker: this.props.marker})
			let marker = this.props.createMarker(this.props.map, this.props.marker)
			this.setState({googleMarker: marker})
		}
	}

	render() {
		return (
			<div>
				{this.state.googleMarker ? <InfoWindow map={this.props.map} marker={this.state.googleMarker} markerInfo={this.props.marker} returnPhoneNumber={this.props.returnPhoneNumber} createInfoWindow={this.props.createInfoWindow} /> : <div></div>}
			</div>
		)
	}
}

export default Marker