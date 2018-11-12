import React, { Component } from 'react'

class Marker extends Component {
	state = {
		initialMarker: null,
		googleMarker: null
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.initialMarker !== this.props.marker) {
			this.setState({initialMarker: this.props.marker})
			if (this.props.map !== null && this.state.googleMarker === null) {
				if ( this.props.initialized === true ) {
					let marker =this.props.googleMarker
					this.setState({googleMarker: marker})
				} else {
					let marker = this.props.createMarker(this.props.map, this.props.marker)
					this.props.infoWindowListener(this.content(), marker, this.props.map, this.props.infoWindow)
					this.setState({googleMarker: marker}, () => {
						if(this.props.initialized === false) {
								this.props.addGoogleMarker(this.state.googleMarker)
								this.props.toggleInit()
						}
					})
				}
				this.props.showSelectMarkers()
			}
		}
	}

	content() {
		if (this.props.marker.hours) {
			return (
			`
			<div class="infoWindow">
				<img class="info-image" src="${this.props.marker.image_url}" alt="${this.props.marker.name}" />
				<h2 class="info-name">${this.props.marker.name}</h2>
				<p class="info-phone">${this.props.returnPhoneNumber(this.props.marker.phone)}</p>
				${this.props.marker.hours[0]['is_open_now'] ? "<p class='info-open'>We're OPEN! :)</p>" : "<p class='info-open'>We're CLOSED! :(</p>"}
			</div>
			`
			)
		} else {
			return (
			`
			<div class="infoWindow">
				<img class="info-image" src="${this.props.marker.image_url}" alt="${this.props.marker.name}" />
				<h2 class="info-name">${this.props.marker.name}</h2>
				<p class="info-phone">${this.props.returnPhoneNumber(this.props.marker.phone)}</p>
				<p>No hours to report</p>
			</div>
			`
			)
		}
	}

	render() {
		return (
			<div>
				{/*<InfoWindow map={this.props.map} marker={this.props.googleMarker} marker={this.props.marker} returnPhoneNumber={this.props.returnPhoneNumber} createInfoWindow={this.props.createInfoWindow} />*/}
			</div>
		)
	}
}

export default Marker