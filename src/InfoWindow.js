import React, { Component } from 'react'

class InfoWindow extends Component {
	content() {
		if (this.props.markerInfo.hours) {
			return (
			`
			<div class="infoWindow">
				<img class="info-image" src="${this.props.markerInfo.image_url}" alt="${this.props.markerInfo.name}" />
				<h2 class="info-name">${this.props.markerInfo.name}</h2>
				<p class="info-phone">${this.props.returnPhoneNumber(this.props.markerInfo.phone)}</p>
					<table>
						<tr>
							<td>${this.props.markerInfo.hours}</td>
						</tr>
					</table>
			</div>
			`
			)
		} else {
			return (
			`
			<div class="infoWindow">
				<img class="info-image" src="${this.props.markerInfo.image_url}" alt="${this.props.markerInfo.name}" />
				<h2 class="info-name">${this.props.markerInfo.name}</h2>
				<p class="info-phone">${this.props.returnPhoneNumber(this.props.markerInfo.phone)}</p>
				<p>No hours to report</p>
			</div>
			`
			)
		}
	}

	componentDidUpdate() {
		this.props.createInfoWindow(this.content(), this.props.marker, this.props.map)
	}

	render() {
		return (null)
	}
}

export default InfoWindow