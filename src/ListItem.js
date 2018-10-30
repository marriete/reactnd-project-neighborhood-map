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

	returnStandardTime(militaryTime) {
		var hours24 = parseInt(militaryTime.substring(0,2),10);
		var hours = ((hours24 + 11) % 12) + 1;
		var meridiem = hours24 > 11 ? "PM" : "AM";
		var minutes = militaryTime.substring(2);

		return hours + ":" + minutes + " " + meridiem;
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
					<span className="list-item-rating">{marker.rating}</span>
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
										<td>{this.returnStandardTime(content.start)}</td>
										<td>{this.returnStandardTime(content.end)}</td>
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