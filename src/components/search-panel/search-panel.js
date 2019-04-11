import React, { Component } from 'react';

import './search-panel.css';

export default class SearchPanel extends Component {

	state = {
		searchInput: ''
	}

	onSearchChange = (e) => {
		const searchInput = e.target.value;
		this.setState({ searchInput });
		this.props.onSearchChange(searchInput);
	}

	render() {
		return (
			<input type="text"
				className="search-panel form-control"
				placeholder="Type here to search..."
				onChange={this.onSearchChange}/>
		);
	}
};
