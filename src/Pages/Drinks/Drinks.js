import React, { useContext, useEffect, useState } from 'react';
import Card from '../../Components/Card/Card';
import Button from '../../Components/Button/Button';
import RecipesContext from '../../Context/RecipesContext';
import Header from '../../Components/Header/Header';
import FooterMenu from '../../Components/FooterMenu/FooterMenu';
import getRecipes from '../../Helpers/API';

function Drinks() {
  const MAX_LENGTH = 13;
  const [finalItens, setFinalItens] = useState();
  const [atualCategory, setAtualCategory] = useState();
  const [categories, setCategories] = useState();
  const { setSiteValue, siteValue, setApiValue } = useContext(RecipesContext);

  useEffect(() => {
    const attItens = async () => {
      const { drinks } = await getRecipes('cocktail', 'filter', `c=${atualCategory}`);
      setApiValue(drinks);
      setFinalItens(drinks.slice(0, MAX_LENGTH));
    };
    attItens();
  }, [atualCategory, setApiValue]);

  useEffect(() => {
    setSiteValue('cocktail');
    const bringItens = async () => {
      const final = await getRecipes('cocktail', 'search', 's=');
      console.log(final);
      setApiValue(final);
      setFinalItens(final.drinks.slice(0, MAX_LENGTH));
    };
    const bringCategories = async () => {
      const MAX_LENGTH_C = 6;
      const final = await getRecipes('cocktail', 'list', 'c=list');
      setCategories(final.drinks.slice(0, MAX_LENGTH_C));
      console.log(final);
    };
    bringCategories();
    bringItens();
  }, []);

  return (
    <div>
      <Header
        title="Drinks"
      />
      <h1>{ siteValue }</h1>
      {categories
      && categories.map(({ strCategory }) => (<Button
        key={ strCategory }
        className="0"
        name={ strCategory }
        onClick={ ({ target }) => setAtualCategory(target.name) }
        dataTestId={ `${strCategory}-category-filter` }
        text={ strCategory }
      />)) }
      { finalItens && finalItens.map(({ idDrink, strDrinkThumb, strDrink }, index) => (
        <Card
          key={ idDrink }
          thumb={ strDrinkThumb }
          title={ strDrink }
          index={ index }
        />
      ))}
      <FooterMenu />
    </div>
  );
}

export default Drinks;
