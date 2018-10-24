import React, { Component } from 'react'
import NotFound from './imgs/NotFound.png'

class ListItem extends Component {
	render() {
		const {marker, index} = this.props;

		return (
			<div className="list-item">
				<div className="list-item-image">
					<img src={NotFound} alt=""/>
				</div>
				<div className="list-item-info">
					<span className="list-item-name">{index+1}. {marker.title}</span>
					<div className="list-item-rating">3.5</div>
					<span className="list-item-type">Restaurant</span>
					<span className="list-item-phone">111-111-1111</span>
					<span className="list-item-address">1111 Falling Water Lane</span>
					<span className="list-item-city">Dayton, OH</span>
				</div>
				<div className="list-item-extra">
					<p className="list-item-recent-review">Garbage</p>
				</div>
			</div>
		)
	}
}

export default ListItem