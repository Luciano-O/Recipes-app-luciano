import PropTypes from 'prop-types';
import React from 'react';

function Button(props) {
  const { text, onClick, dataTest, className, name, disabled } = props;
  return (
    <button
      type="button"
      name={ name }
      disabled={ disabled }
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
  disabled: PropTypes.bool.isRequired,
};
export default Button;
