import React from 'react';
import PropTypes from 'prop-types';
import './SplitInfo.css';

// Returns a String with the first character capitalized and a space in front of each subsequent
// uppercase letters.
String.prototype.formatField = function formatField() {
  return this.replace(/([A-Z])/g, ' $1').replace(/^(\w)?/, function(c) { return c.toUpperCase()});
};

// Returns a String of the US dollar equivalent to number (rounded to decimal places) and includes a
// '$' and commas when appropriate.
Number.prototype.toDollarsString = function toDollarsString() {
  return this.toLocaleString('en-US', {style:'currency', currency:'USD'});
};

// Provided amount must be a Sting or Number and represent a monetary value in US dollars.
// const formatAmount = (amount) => {
//   return typeof amount === 'number' ? amount.toMoney() : amount.toMoneyAsDouble().toMoney();
// };

function buildDisplay(description, amount) {
  const amountAsMoney =
    typeof amount === 'number' ? amount.toDollarsString() : amount.toDouble().toDollarsString();

  return (
    <article className="text-box" key={description}>
      {description.formatField()}: {amountAsMoney}
    </article>
  );
}

const SplitInfo = (props) => {
  const infoDisplay = Object.entries(props.info).map(([label, amount]) => buildDisplay(label, amount));

  return (
    <section>
      {infoDisplay}
    </section>
  );
};

SplitInfo.propTypes = {
  info: PropTypes.object.isRequired
};

export default SplitInfo;