import React, { Component } from 'react'
import ListItem from './ListItem.js'

class ListView extends Component {
	render() {
		return (
			<div>
				{this.props.markers.map((marker, index) => (
					<ListItem key={index} marker={marker} />
				))}
			</div>
		)
	}
}

export default ListView