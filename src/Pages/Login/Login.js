import React, { useContext } from 'react';
import Button from '../../Components/Button/Button';
import RecipesContext from '../../Context/RecipesContext';
import getRecipes from '../../Helpers/API';

function Login() {
  const { siteValue } = useContext(RecipesContext);
  async function teste() {
    console.log(await getRecipes(siteValue, 'filter', 'i=chicken'));
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
