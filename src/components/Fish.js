import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { formatPrice } from '../helpers';

class Fish extends Component {
  render() {
    const { details } = this.props; // same as -> const details = this.props.details;
    const isAvailable = details.status === 'available';
    const buttonText = isAvailable ? 'Add To Order' : 'Sold Out!';
    return (
      <li className="menu-fish">
        <img src={details.image} alt={details.name} />
        <h3 className="fish-name">
          {details.name}
          <span className="price">{formatPrice(details.price)}</span>
        </h3>
        <p>{details.desc}</p>
        <button
          onClick={() => this.props.addToOrder(this.props.fishIndex)}
          disabled={!isAvailable}>
          {buttonText}
        </button>
      </li>
    );
  }
}

Fish.propTypes = {
  details: PropTypes.object.isRequired,
  fishIndex: PropTypes.string.isRequired,
  addToOrder: PropTypes.func.isRequired
}

export default Fish;
