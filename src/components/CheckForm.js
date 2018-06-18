import React from 'react';
import PropTypes from 'prop-types';

import './CheckForm.css';

class CheckForm extends React.Component {
  static propTypes = {
    subtotal: PropTypes.string,
    tax: PropTypes.string,
    tip: PropTypes.string,
    split: PropTypes.string,
    updateCheckCallback: PropTypes.func.isRequired,
  };

  onInputChange = (event) => {
    const key = event.target.name;
    const value = event.target.value;
    this.props.updateCheckCallback(key, value);
  };

  // Inputs all look pretty much the same, so we'll
  // use a helepr method to construct them.
  buildInput(name, text) {
    return (
      <div>
        <label htmlFor={name} className="text-box">
          {text}
        </label>
        <input
          name={name}
          value={this.props[name]}
          onChange={this.onInputChange}
          />
      </div>
    );
  }

  render() {
    return (
      <form className="check-form">
        {this.buildInput('subtotal', 'Price before tax / tip')}
        {this.buildInput('tip', 'Tip percentage')}
        {this.buildInput('tax', 'Tax percentage')}
        {this.buildInput('split', 'Split how many ways')}
      </form>
    )
  }
}


export default CheckForm;
