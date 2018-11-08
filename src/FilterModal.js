import React, { Component } from 'react'

class FilterModal extends Component {
	render() {
		return(
			<div className={this.props.show ? "modal display-block" : "modal display-none"}>
				<section className="modal-main">
				{this.props.filters.map((option, index) => {
					return(
						<label className="filter-list" key={option}>
							<input type="checkbox" onChange={this.props.changeFunction} name={option} aria-label={option} value={option}/>{option}
						</label>
					)
				})}
					<button onClick={this.props.handleClose}>Close</button>
				</section>
			</div>
		)
	}
}

export default FilterModal