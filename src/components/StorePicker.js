import React, { Component } from 'react';
import { getFunName } from '../helpers';

class StorePicker extends Component {
  // event is all the data
  goToStore(event) {
    // prevents the broswer from doing its default action such as sending data in form/refreshing
    event.preventDefault();
    // grab text from box
    const storeId = this.storeInput.value;
    console.log(storeId);
    // tranistion URL from '/' to '/store/:storeId'
    this.props.history.push(`/store/${storeId}`);
  }

  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore.bind(this)}>
        <h2>Please Enter A Store</h2>
        <input
          type="text"
          required={true}
          placeholder="Store Name"
          defaultValue={getFunName()}
          ref={input => {
            this.storeInput = input;
          }}
        />
        <button type="submit">Visit Store >></button>
      </form>
    );
  }
}

export default StorePicker;
