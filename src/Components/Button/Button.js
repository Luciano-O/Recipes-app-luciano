import PropTypes from 'prop-types';
import React from 'react';

function Button(props) {
  const { text, onClick, dataTestId, className, name } = props;
  return (
    <button
      type="button"
      name={ name }
      data-testid={ dataTestId }
      className={ className }
      onClick={ onClick() }
    >
      {text}
    </button>
  );
}

Button.defaultProps = {
  dataTestId: 'text',
};

Button.propTypes = {
  className: PropTypes.string.isRequired,
  dataTestId: PropTypes.string,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};
export default Button;
