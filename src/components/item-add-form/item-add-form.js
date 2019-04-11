import React, { Component } from 'react';

import './item-add-form.css';

export default class ItemAddForm extends Component {

  state = {
    label: ''
  }

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value
    })
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onItemAdded(this.state.label);
    this.setState({
      label: ''
    })
  }

  render() {
    return (
      <form className="d-flex item-add-form"
            onSubmit={this.onSubmit}>
        <input type="text"
          className="form-control"
          placeholder="What need to do?"
          onChange={this.onLabelChange}
          value={this.state.label} />
         <button className="btn btn-outline-secondary"
           type="submit">
           Add
         </button>
      </form>
    )
  }
}
