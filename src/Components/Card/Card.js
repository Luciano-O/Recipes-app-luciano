import React from 'react';
import PropTypes from 'prop-types';

function Card(props) {
  const { thumb, str } = props;
  return (
    <div>
      <img
        src={ thumb }
        alt={ str }
      />
      <h3>{ str }</h3>
    </div>
  );
}

Card.propTypes = {
  thumb: PropTypes.string.isRequired,
  str: PropTypes.string.isRequired,
};

export default Card;
