import React, { Component } from 'react';

import './item-status-filter.css';

export default class ItemStatusFilter extends Component {

  state = {
    filter: 'all'
  }

  onFilterChange = (e) => {
    const filter = e.target.value;
    this.setState({
      filter
    })
    this.props.onFilterChange(filter);
  }

  render() {
    const { filter } = this.state;
    const activeClass = 'btn btn-info';
    const defaultClass = 'btn btn-outline-secondary';
    return (
      <form onClick={this.onFilterChange} className="btn-group">
        <button type="button"
                className={filter === 'all' ? activeClass : defaultClass}
                value="all">All</button>
        <button type="button"
                className={filter === 'active' ? activeClass : defaultClass}
                value="active">Active</button>
        <button type="button"
                className={filter === 'done' ? activeClass : defaultClass}
                value="done">Done</button>
      </form>
    );
  }
}
