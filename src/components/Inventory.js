import React, { Component } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import base from '../base';

import AddFishForm from './AddFishForm';

class Inventory extends Component {
  constructor() {
    super();
    this.state = {
      uid: null,
      owner: null
    };

    this.renderInventory = this.renderInventory.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderLogin = this.renderLogin.bind(this);
    this.oAuthConnect = this.oAuthConnect.bind(this);
    this.authenticate = this.authenticate.bind(this);
    // this.authHandler = this.authHandler.bind(this);
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
  
  authenticate(prov) {
    let provider;
    if (prov === 'facebook') {
      provider = new firebase.auth.FacebookAuthProvider();
    }
    if (prov === 'github') {
      provider = new firebase.auth.GithubAuthProvider();
    }
    console.log(`Trying to log in with ${prov}`);
    
    this.oAuthConnect(provider);
    // base.signInWithPopup(provider, this.authHandler);
  }
  
  oAuthConnect(provider) {
    let userID;
    let ownerName;
    let that = this;
    // get proper storename
    const storeName = this.props.storeId
      .split('')
      .splice(7)
      .join('');

    // grap store info
    const storeRef = firebase.database().ref('store/' + storeName);

    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function(authData) {
        // query the firebase database once for the store data
        return storeRef.once('value', sanpshot => {
          const data = sanpshot.val() || {};
          // claim for ownner if no owner already
          if (!data.owner) {
            storeRef.set({
              owner: authData.user.uid,
            });
          }
          userID = authData.user.uid;
          ownerName = data.owner || authData.user.uid
          that.setState({
            uid: userID,
            owner: ownerName
          })
          
          console.log('Success');
        });
      })
      .catch(function(error) {
        console.log('AUTH DATA ERROR:');
        console.error(error);
      });
    }

    renderLogin() {
    return (
      <nav className="login">
        <h2>Inventory</h2>
        <p>Sign in to manage your store's inventory</p>
        <button className="github" onClick={() => this.authenticate('github')}>
          Login With Github
        </button>
        <button
          className="facebook"
          onClick={() => this.authenticate('facebook')}>
          Login With Facebook
        </button>
        {/* <button
          className="twitter"
          onClick={() => this.authenticate('twitter')}>
          Login With Twitter
        </button> */}
      </nav>
    );
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
    const logout = <button>Log Out!</button>;
    // Check if they are not logged in at all | uid == user ID
    if (!this.state.uid) {
      return <div>{this.renderLogin()}</div>;
    }

    // Check if they are the owner of the store
    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry you aren't the owner of this store!</p>
          {logout}
        </div>
      );
    }

    return (
      <div>
        <h2>Inventory</h2>
        {logout}
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
  storeId: PropTypes.string.isRequired
};

export default Inventory;
