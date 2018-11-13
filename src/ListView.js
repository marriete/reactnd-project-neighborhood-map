import React, { Component } from 'react'
import ListItem from './ListItem.js'
import { Link } from 'react-router-dom'

class ListView extends Component {
	render() {
		return (
			<div className="list-view">
				<Link className="close-list" to="/">Close</Link>
				{this.props.markers.map((marker, index) => (
					<ListItem
						key={index}
						marker={marker}
						googleMarkers={this.props.googleMarkers}
						index={index}
						returnPhoneNumber={this.props.returnPhoneNumber}
						history={this.props.history} />
				))}
			</div>
		)
	}
}

export default ListView