import React, { Component } from 'react'
import NotFound from './imgs/NotFound.png'

class ListItem extends Component {
	returnDay(dayValue) {
		switch(dayValue) {
			case 0:
				return "Monday";
				break;
			case 1:
				return "Tuesday";
				break;
			case 2:
				return "Wednesday";
				break;
			case 3:
				return "Thursday";
				break;
			case 4:
				return "Friday";
				break;
			case 5:
				return "Saturday";
				break;
			case 6:
				return "Sunday";
				break;
		}
	}

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
					<span className="list-item-type">{marker.categories[0].title}</span>
					<span className="list-item-phone">{marker.phone}</span>
					<span className="list-item-address">{marker.location.address1}</span>
					<span className="list-item-city">{marker.location.city}, {marker.location.state} {marker.location.zip_code}</span>
				</div>
				{(typeof marker.hours !== "undefined") ?
					<div className="list-item-extra">
						<table>
							<tbody>
								{marker.hours[0]['open'].map((content, index) => {
									return (
									<tr key={index}>
										<td>{this.returnDay(content.day)}</td>
										<td>{content.start}</td>
										<td>{content.end}</td>
									</tr>
								)})}
							</tbody>
						</table>
					</div>
				:
					<div className="list-item-extra">
						<p className="list-item-hours">No hours to report :(</p>
					</div>
				}
			</div>
		)
	}
}

export default ListItem