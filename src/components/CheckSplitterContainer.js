import React from 'react';
import './CheckSplitterContainer.css';
import CheckForm from './CheckForm';
import SplitInfo from './SplitInfo';

const FORM_KEYS = ['subtotal', 'tip', 'tax', 'split'];
String.prototype.toDouble = function toDouble() { return parseInt(this * 100, 10) / 100 };

class CheckSplitterContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      subtotal: '0',
      tip: '20',
      tax: '10',
      split: '1',
    }
  }

  calculate = function(subtotal) {
    const subtotalAsCents = subtotal.toDouble();
    let total = subtotalAsCents;
    return {
      getPercentage: function(percentage) {
        const percentAmount = subtotalAsCents * (percentage / 100.0);
        total += percentAmount;
        return percentAmount;
      },
      getTotal: function() { return total },
      getSplit: function (splitBy) { return total / splitBy }
    }
  };

  updateCheck = (key, value) => {
    if (!FORM_KEYS.includes(key)) {
      throw new Error(`Invalid key "${key}" passed in to updateCheck (value "${value}")`);
    }
    console.log(`Updating check, ${key}: ${value}`);
    const update = {};
    update[key] = value;
    this.setState(update);
  };

  calculateSplit() {
    const check = this.calculate(this.state.subtotal);
    return {
      taxAmount: check.getPercentage(this.state.tax),
      tipAmount: check.getPercentage(this.state.tip),
      totalPrice: check.getTotal(),
      pricePerPerson: check.getSplit(this.state.split),
    }
  };

  render() {
    return(
      <div className="check-splitter-container">
        <CheckForm
          subtotal={this.state.subtotal}
          tip={this.state.tip}
          tax={this.state.tax}
          split={this.state.split}
          updateCheckCallback={this.updateCheck}
          />
        <SplitInfo info={this.calculateSplit()}/>
      </div>
    );
  }
}


export default CheckSplitterContainer;
