import React, { Component } from 'react'
import FocusLock from 'react-focus-lock'

class FilterModal extends Component {
	render() {
		return(
			<div className={this.props.show ? "modal display-block" : "modal display-none"}>
				<FocusLock>
					<section className="modal-main">
						<h1>Filter Markers</h1>
						{this.props.filters.map((option, index) => {
							return(
								<label className="filter-list" key={option}>
									<input className="filter-checkbox" type="checkbox" onChange={this.props.changeFunction} name={option} aria-label={option} value={option}/>{option}
								</label>
							)
						})}
						<button className="filter-close" onClick={this.props.handleClose}>Close</button>
					</section>
				</FocusLock>
			</div>
		)
	}
}

export default FilterModal