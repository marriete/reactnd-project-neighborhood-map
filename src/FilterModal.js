import React, { Component } from 'react'

class FilterModal extends Component {
	render() {
		return(
			<div className={this.props.show ? "modal display-block" : "modal display-none"}>
				<section className="modal-main">
					{this.props.children}
					<button onClick={this.props.handleClose}>Close</button>
				</section>
			</div>
		)
	}
}

export default FilterModal