import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../../Components/Button/Button';
import { saveEmail,
  saveTokenDrink,
  saveTokenFood } from '../../Helpers/localStorageSaves';

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);
  const { history } = props;

  useEffect(() => {
    const checkDisbale = () => {
      const limitEmail = -1;
      const limitPassword = 7;
      const checkEmail = email === ''
      || email.indexOf('@') === limitEmail
      || email.indexOf('.') === limitEmail
      || email.indexOf('.') === email.length - 1;
      if (checkEmail || password.length < limitPassword) {
        setDisabled(true);
      } else { setDisabled(false); }
    };
    checkDisbale();
  }, [email, password]);

  const handleClick = () => {
    saveTokenDrink();
    saveTokenFood();
    saveEmail(email);
    history.push('/foods');
  };

  return (
    <form>
      <input
        data-testid="email-input"
        value={ email }
        onChange={ ({ target }) => setEmail(target.value) }
        type="email"
        placeholder="Email"
      />
      <input
        data-testid="password-input"
        value={ password }
        onChange={ ({ target }) => setPassword(target.value) }
        type="password"
        placeholder="Senha"
      />
      <Button
        className="styles.testButton"
        text="Enter"
        name="lalaland"
        disabled={ disabled }
        dataTest="login-submit-btn"
        onClick={ handleClick }
      />

    </form>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
