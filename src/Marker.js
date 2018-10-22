import React, { Component } from 'react'

class Marker extends Component {
	componentDidUpdate() {
		this.props.createMarker(this.props.map, this.props.marker)
	}

	render() {
		return (null)
	}
}

export default Marker