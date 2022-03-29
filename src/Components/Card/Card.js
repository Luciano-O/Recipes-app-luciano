import React from 'react';
import PropTypes from 'prop-types';

function Card(props) {
  const { thumb, title, index } = props;
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <img
        src={ thumb }
        data-testid={ `${index}-card-img` }
        alt={ title }
      />
      <h3 data-testid={ `${index}-card-name` }>{ title }</h3>
    </div>
  );
}

Card.propTypes = {
  thumb: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default Card;
