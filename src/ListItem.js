import React, { Component } from 'react'
import NotFound from './imgs/NotFound.png'

class ListItem extends Component {
	render() {
		const {marker, index} = this.props;

		return (
			<div className="list-item">
				<div className="list-item-image">
					<img src={marker.image_url} alt=""/>
				</div>
				<div className="list-item-info">
					<span className="list-item-name">{index+1}. {marker.name}</span>
					<div className="list-item-rating">{marker.rating}</div>
					<span className="list-item-type">Restaurant</span>
					<span className="list-item-phone">{marker.phone}</span>
					<span className="list-item-address">{marker.location.address1}</span>
					<span className="list-item-city">{marker.location.city} {marker.location.zip_code}</span>
				</div>
				{/*<div className="list-item-extra">
					<p className="list-item-recent-review">Garbage</p>
				</div>*/}
			</div>
		)
	}
}

export default ListItem