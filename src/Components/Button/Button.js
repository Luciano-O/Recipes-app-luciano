import PropTypes from 'prop-types';
import React from 'react';
import { Button } from 'react-bootstrap';

function ButtonComponent(props) {
  const { text, onClick, dataTest,
    className, name, disabled, variant, size, id } = props;
  return (
    <Button
      variant={ variant }
      type="button"
      name={ name }
      disabled={ disabled }
      data-testid={ dataTest }
      className={ className }
      onClick={ onClick }
      size={ size }
      id={ id }
    >
      {text}
    </Button>
  /*  <button
      type="button"
      name={ name }
      disabled={ disabled }
      data-testid={ dataTest }
      className={ className }
      onClick={ onClick }
    >
      {text}
    </button> */
  );
}

ButtonComponent.defaultProps = {
  id: '',
  name: '',
  disabled: false,
  className: '',
  onClick: () => {},
  variant: 'success',
  size: '',
};

ButtonComponent.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  dataTest: PropTypes.string.isRequired,
  name: PropTypes.string,
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  variant: PropTypes.string,
  size: PropTypes.string,
};
export default ButtonComponent;
