import React from 'react';
import Button from '../../Components/Button/Button';

function Login() {
  function teste({ target }) {
    console.log(target);
  }
  return (
    <div>
      <h1>testes</h1>
      <Button
        className="styles.testButton"
        text="teste"
        name="lalaland"
        dataTest="teste"
        onClick={ () => teste }
      />
    </div>
  );
}

export default Login;
