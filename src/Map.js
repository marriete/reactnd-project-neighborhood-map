import React, { Component } from 'react'

class Map extends Component {
	onScriptLoad() {
		const map = new window.google.maps.Map(
			document.getElementById(this.props.id),
			this.props.options);
		this.props.onMapLoad(map)
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
			<div id={this.props.id} ></div>
		)
	}
}

export default Map