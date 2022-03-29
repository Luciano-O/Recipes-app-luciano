import PropTypes from 'prop-types';
import React from 'react';

function Button(props) {
  const { text, onClick, dataTest, className, name } = props;
  return (
    <button
      type="button"
      name={ name }
      data-testid={ dataTest }
      className={ className }
      onClick={ onClick }
    >
      {text}
    </button>
  );
}

Button.propTypes = {
  className: PropTypes.string.isRequired,
  dataTest: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};
export default Button;
