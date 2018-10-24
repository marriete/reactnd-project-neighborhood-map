import React, { Component } from 'react'

class ListItem extends Component {
	render() {
		const {marker} = this.props;

		return (
			<div className="list-item">
				<h3 className="list-item-index">{}</h3>
				<h2 className="list-item-name">{marker.title}</h2>
				<div className="list-item-rating">3.5</div>
				<span className="list-item-phone">954-294-4907</span>
				<span className="list-item-address">7302 Creek Water Drive</span>
				<span className="list-item-city">Dayton, OH</span>
				<p className="list-item-recent-review">Garbage</p>
			</div>
		)
	}
}

export default ListItem