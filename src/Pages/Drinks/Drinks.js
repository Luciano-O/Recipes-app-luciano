import React, { useContext, useEffect, useState } from 'react';
import Card from '../../Components/Card/Card';
import Button from '../../Components/Button/Button';
import RecipesContext from '../../Context/RecipesContext';
import Header from '../../Components/Header/Header';
import FooterMenu from '../../Components/FooterMenu/FooterMenu';
import getRecipes from '../../Helpers/API';

function Drinks() {
  const MAX_LENGTH = 12;
  const [atualCategory, setAtualCategory] = useState();
  const [categories, setCategories] = useState();
  const { setSiteValue,
     siteValue,
     setApiValue,
     finalItems,
     setFinalItems,
     } = useContext(RecipesContext);

    const handleCategoryClick = async ({ target }) => {
      const { drinks } = await getRecipes('cocktail', 'filter', `c=${target.name}`);
      setApiValue(drinks);
      setAtualCategory(target.name)
      setFinalItems(drinks.slice(0, MAX_LENGTH));
    };

  useEffect(() => {
    setSiteValue('cocktail');
    const bringItens = async () => {
      const final = await getRecipes('cocktail', 'search', 's=');
      console.log(final);
      setApiValue(final);
      setFinalItems(final.drinks.slice(0, MAX_LENGTH));
    };
    const bringCategories = async () => {
      const MAX_LENGTH_C = 5;
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
      {categories?.map(({ strCategory }) => (<Button
        key={ strCategory }
        className="0"
        name={ strCategory }
        onClick={ handleCategoryClick }
        dataTest={ `${strCategory}-category-filter` }
        text={ strCategory }
      />)) }
      {finalItems?.map(({ idDrink, strDrinkThumb, strDrink }, index) => (
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
