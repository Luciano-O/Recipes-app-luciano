import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { FormControl, InputGroup } from 'react-bootstrap';
import ButtonComponent from '../../Components/Button/Button';
import { saveEmail,
  saveTokenDrink,
  saveTokenFood } from '../../Helpers/localStorageSaves';
import styles from './styles.module.css';
import logo from '../../images/undraw_cooking_lyxy.svg';
// import logo2 from '../../images/undraw_breakfast_psiw.svg';

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
    <div className={ styles.LoginBodyDiv }>
      <div className={ styles.Logo }>
        <img src={ logo } alt="cooking logo" />
        <h1>BAKED</h1>
      </div>
      <div className={ styles.LoginDiv }>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">
            <FontAwesomeIcon icon={ faEnvelope } />
          </InputGroup.Text>
          <FormControl
            data-testid="email-input"
            value={ email }
            onChange={ ({ target }) => setEmail(target.value) }
            type="email"
            placeholder="Email"
            aria-label="Email"
            aria-describedby="basic-addon1"
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">
            <FontAwesomeIcon icon={ faLock } />
          </InputGroup.Text>
          <FormControl
            data-testid="password-input"
            value={ password }
            onChange={ ({ target }) => setPassword(target.value) }
            type="password"
            placeholder="Senha"
            aria-label="password"
            aria-describedby="basic-addon1"
          />
        </InputGroup>
        <ButtonComponent
          className="styles.testButton"
          text="Enter"
          name="lalaland"
          disabled={ disabled }
          dataTest="login-submit-btn"
          onClick={ handleClick }
          variant="orange2"
        />
      </div>
    </div>
    // <form>
    //   <input
    //     data-testid="email-input"
    //     value={ email }
    //     onChange={ ({ target }) => setEmail(target.value) }
    //     type="email"
    //     placeholder="Email"
    //   />
    //   <input
    //     data-testid="password-input"
    //     value={ password }
    //     onChange={ ({ target }) => setPassword(target.value) }
    //     type="password"
    //     placeholder="Senha"
    //   />
    //   <Button
    //     className="styles.testButton"
    //     text="Enter"
    //     name="lalaland"
    //     disabled={ disabled }
    //     dataTest="login-submit-btn"
    //     onClick={ handleClick }
    //   />

  // </form>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
