import React, { Component } from 'react'
import ListItem from './ListItem.js'
import { Link } from 'react-router-dom'

class ListView extends Component {
	render() {
		return (
			<div>
				<Link className="close-list" to="/">Close</Link>
				{this.props.markers.map((marker, index) => (
					<ListItem key={index} marker={marker} index={index} />
				))}
			</div>
		)
	}
}

export default ListView