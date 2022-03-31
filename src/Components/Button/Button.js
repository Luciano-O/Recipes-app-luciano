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

Button.defaultProps = {
  name: '',
  disabled: false,
  className: '',
  onClick: () => {},
};

Button.propTypes = {
  className: PropTypes.string,
  dataTest: PropTypes.string.isRequired,
  name: PropTypes.string,
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};
export default Button;
