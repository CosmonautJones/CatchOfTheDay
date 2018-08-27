import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AddFishForm from './AddFishForm';

class Inventory extends Component {
  constructor() {
    super();
    this.renderInventory = this.renderInventory.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e, key) {
    const fish = this.props.fishes[key];
    // take a copy of the fish and update with the new data
    const updatedFish = {
      ...fish,
      // Vid 20
      [e.target.name]: e.target.value
    };
    this.props.updateFish(key, updatedFish);
  }

  renderInventory(key) {
    const fish = this.props.fishes[key];
    return (
      <div className="fish-edit" key={key}>
        <input
          type="text"
          name="name"
          value={fish.name}
          placeholder="Fish Name"
          onChange={e => this.handleChange(e, key)}
        />
        <input
          type="text"
          name="price"
          value={fish.price}
          placeholder="Fish Price"
          onChange={e => this.handleChange(e, key)}
        />
        <select
          type="text"
          name="status"
          value={fish.status}
          onChange={e => this.handleChange(e, key)}
          placeholder="Fish Status">
          <option value="avaliable">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea
          name="desc"
          value={fish.desc}
          placeholder="Fish Description"
          onChange={e => this.handleChange(e, key)}
        />
        <input
          type="text"
          name="image"
          value={fish.image}
          placeholder="Fish Image"
          onChange={e => this.handleChange(e, key)}
        />
        <button onClick={() => this.props.removeFish(key)}>Remove Fish</button>
      </div>
    );
  }

  render() {
    return (
      <div>
        <h2>Inventory</h2>
        {Object.keys(this.props.fishes).map(this.renderInventory)}
        <AddFishForm
          addFish={this.props.addFish}
          loadSamples={this.props.loadSamples}
        />
        <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
      </div>
    );
  }
}

Inventory.propTypes = {
  fishes: PropTypes.object.isRequired,
  updateFish: PropTypes.func.isRequired,
  addFish: PropTypes.func.isRequired,
  loadSamples: PropTypes.func.isRequired,
}

export default Inventory;
