import React, { Component } from 'react';
import PropTypes from 'prop-types';
import base from '../base';

import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';

class App extends Component {
  constructor() {
    super();
    // initialState
    this.state = {
      fishes: {},
      order: {}
    };

    this.addFish = this.addFish.bind(this);
    this.updateFish = this.updateFish.bind(this);
    this.removeFish = this.removeFish.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.addToOrder = this.addToOrder.bind(this);
    this.removeFromOrder = this.removeFromOrder.bind(this);
  }

  componentWillMount() {
    console.log("PATH", this.props.history.location.pathname)

    // runs right before app is rendered
    this.ref = base.syncState(
      `${this.props.history.location.pathname}/fishes`,
      {
        context: this,
        state: 'fishes'
      }
    );

    // check if items are in localStorage
    const localStorageRef = localStorage.getItem(
      `order-${this.props.history.location.pathname}`
    );

    if (localStorageRef) {
      // update app component
      this.setState({
        order: JSON.parse(localStorageRef)
      });
    }
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  // Could use shouldComponentUpdate to prevent mutiple render states
  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem(
      `order-${this.props.history.location.pathname}`,
      JSON.stringify(nextState.order)
    );
  }

  addFish(fish) {
    // update our state
    const fishes = { ...this.state.fishes };
    // add our new fish
    const timestamp = Date.now();
    fishes[`fish-${timestamp}`] = fish;
    // set state
    //        state itself: varible ^ of new state
    this.setState({ fishes: fishes });
  }

  updateFish(key, updatedFish) {
    const fishes = { ...this.state.fishes };
    fishes[key] = updatedFish;
    this.setState({ fishes });
  }

  removeFish(key) {
    const fishes = { ...this.state.fishes };
    // to work with firebase, we need to set the value of the fish to null instead of delete fishes[key]
    fishes[key] = null;
    this.setState({ fishes });
  }

  loadSamples() {
    this.setState({
      fishes: sampleFishes
    });
  }

  addToOrder(key) {
    // take a copy of state
    const order = { ...this.state.order };
    // update or add the new number of fish order
    order[key] = order[key] + 1 || 1;
    // update our state
    this.setState({ order });
  }

  removeFromOrder(key) {
    const order = { ...this.state.order };
    // since firebase isn't dealing with order we can use delete
    delete order[key];
    this.setState({ order });
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="list-of-fishes">
            {Object.keys(this.state.fishes).map(fish => (
              <Fish
                key={fish}
                details={this.state.fishes[fish]}
                fishIndex={fish}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}
          params={this.props.location.pathname}
        />
        <Inventory
          addFish={this.addFish}
          loadSamples={this.loadSamples}
          fishes={this.state.fishes}
          updateFish={this.updateFish}
          removeFish={this.removeFish}
          storeId={this.props.history.location.pathname}
        />
      </div>
    );
  }
}

App.propTypes = {
  history: PropTypes.object.isRequired
};

export default App;
