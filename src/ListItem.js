import React, { Component } from 'react'

class ListItem extends Component {

	// Function used to take Yelp's array of location's time information and return the associated day
	returnDay = (dayValue) => {
		switch(dayValue) {
			case 0:
				return "Monday"
			case 1:
				return "Tuesday"
			case 2:
				return "Wednesday"
			case 3:
				return "Thursday"
			case 4:
				return "Friday"
			case 5:
				return "Saturday"
			case 6:
				return "Sunday"
			default:
				return null
		}
	}

	// Function used to return Standard Time from Military Time
	returnStandardTime = (militaryTime) => {
		var hours24 = parseInt(militaryTime.substring(0,2),10)
		var hours = ((hours24 + 11) % 12) + 1
		var meridiem = hours24 > 11 ? "PM" : "AM"
		var minutes = militaryTime.substring(2)

		return hours + ":" + minutes + " " + meridiem
	}

	// Function used to return the Yelp png file of the corresponding Yelp rating
	returnYelpRating = (ratingValue, images) => {
		switch(ratingValue % 1) {
			case 0:
				return images["regular_" + ratingValue + ".png"]
			case 0.5:
				return images["regular_" + parseInt(ratingValue) + "_half.png"]
			default:
				return null
		}
	}

	// Function used to import all Yelp png images from file structure
	importAllImages = (r) => {
		let images = {}
		r.keys().map((item, index) => { return images[item.replace('./', '')] = r(item) })
		return images
	}

	// On click function to trigger associated marker's 'click' event handler and redirects user to map page
	onClick = (marker, googleMarkers) => {
		googleMarkers.forEach((gmark) => {
			if(gmark.title === marker.name) {
				window.google.maps.event.trigger(gmark, 'click')
				this.props.history.push('/')
			}
		})
	}

	handleKeyPress = (event, marker, googleMarkers) => {
	  console.log('Function entered')
	  if(event.key === 'Enter'){
	    this.onClick(marker, googleMarkers)
	  }
	}

	render() {
		const {marker, index, googleMarkers} = this.props
		const images = this.importAllImages(require.context('./icons/yelp_stars/web_and_ios/regular/', false, /\.(png|jpe?g|svg)$/))

		return (
			<div className="list-item" tabIndex="0" onClick={() => this.onClick(marker, googleMarkers)} onKeyPress={(event) => this.handleKeyPress(event, marker, googleMarkers)}>
				<div className="list-item-image">
					<img src={marker.image_url} alt={marker.name} />
				</div>
				<div className="list-item-info">
					<span className="list-item-name list-item-mutual">{index+1}. {marker.name}</span>
					<img className="list-item-rating list-item-mutual" src={this.returnYelpRating(marker.rating, images)} alt="Yelp Rating"/>
					<span className="list-item-type list-item-mutual">{marker.categories[0].title}</span>
					<span className="list-item-phone list-item-mutual">{this.props.returnPhoneNumber(marker.phone)}</span>
					<span className="list-item-address list-item-mutual">{marker.location.address1}</span>
					<span className="list-item-city list-item-mutual">{marker.location.city}, {marker.location.state} {marker.location.zip_code}</span>
				</div>
				{(typeof marker.hours !== "undefined") ?
					<div className="list-item-extra">
						<table>
							<tbody>
								<tr>
									<td className="list-item-strong">Day of the Week</td>
									<td className="list-item-strong">Opening Time</td>
									<td className="list-item-strong">Closing Time</td>
								</tr>
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