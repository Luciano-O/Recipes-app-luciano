import React, { useContext, useEffect, useState } from 'react';
import Card from '../../Components/Card/Card';
import Button from '../../Components/Button/Button';
import RecipesContext from '../../Context/RecipesContext';
import fetchMealsDrinks from '../../Helpers/Fetchs';
import Header from '../../Components/Header/Header';
import FooterMenu from '../../Components/FooterMenu/FooterMenu';
import getRecipes from '../../Helpers/API';

function Foods() {
  const [itens, setItens] = useState();
  const [finalItens, setFinalItens] = useState();
  const [atualCategory, setAtualCategory] = useState();
  const [categories, setCategories] = useState();
  const { setSiteValue, siteValue } = useContext(RecipesContext);

  useEffect(() => {
    setSiteValue('meal');
    // const bringItens = async () => {
    //   const MAX_LENGTH = 13;
    //   const final = await getRecipes(siteValue, 'search', '');
    //   setItens(final);
    //   setFinalItens(final.slice(0, MAX_LENGTH));
    // };
    // const bringCategories = async () => {
    //   const MAX_LENGTH = 6;
    //   const final = await fetchMealsDrinks(type, 'list.php?c=list');
    //   setCategories(final.slice(0, MAX_LENGTH));
    // };
    // bringCategories();
    // bringItens();
  }, []);

  return (
    <div>
      <Header
        title="Foods"
      />
      {/* <h1>{ type }</h1>
      {categories
      && categories.map(({ strCategory }) => (<Button
        key={ strCategory }
        className="0"
        name={ strCategory }
        onClick={ ({ target }) => setAtualCategory(target.name) }
        dataTestId={ `${strCategory}-category-filter` }
        text={ strCategory }
      />)) } */}
      {/* {finalItens && (type === 'meals'
        ? finalItens.map(({ idMeal, strMealThumb, strMeal }) => (
          <Card
            key={ idMeal }
            thumb={ strMealThumb }
            str={ strMeal }
          />
        )) : finalItens.map(({ idDrinks, strDrinksThumb, strDrinks }) => (
          <Card
            key={ idDrinks }
            thumb={ strDrinksThumb }
            str={ strDrinks }
          />
        )))} */}
      <FooterMenu />
    </div>
  );
}

export default Foods;
