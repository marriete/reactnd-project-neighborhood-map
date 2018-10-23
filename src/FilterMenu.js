import React, { Component } from 'react'
import navImage from './imgs/NavImage.png'

class FilterMenu extends Component {
	render() {
		return (
			<div id='nav'>
				<img src={navImage} alt="" />
			</div>
		)
	}
}

export default FilterMenu