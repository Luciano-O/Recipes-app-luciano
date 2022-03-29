import React, { useContext, useEffect, useState } from 'react';
import Card from '../../Components/Card/Card';
import Button from '../../Components/Button/Button';
import RecipesContext from '../../Context/RecipesContext';
import Header from '../../Components/Header/Header';
import FooterMenu from '../../Components/FooterMenu/FooterMenu';
import getRecipes from '../../Helpers/API';

const MAX_LENGTH = 12;
const MAX_LENGTH_C = 5;

function Drinks() {
  // const [ atualCategory, setAtualCategory] = useState();
  const [categories, setCategories] = useState();
  const [isCategoryButtonActive, setIsCategoryButtonActive] = useState(false);
  const { setSiteValue,
    siteValue,
    setApiValue,
    finalItems,
    setFinalItems,
    first12,
    setFirst12,
  } = useContext(RecipesContext);

  const handleCategoryClick = async ({ target }) => {
    const { drinks } = await getRecipes(siteValue, 'filter', `c=${target.name}`);
    setApiValue(drinks);
    setFinalItems(drinks?.slice(0, MAX_LENGTH));
    setIsCategoryButtonActive(!isCategoryButtonActive);
  };

  function showedItems() {
    if (isCategoryButtonActive) {
      setFinalItems(bringItens()?.drinks?.slice(0, MAX_LENGTH_C));
    } else {
      setFinalItems(first12);
    }
  }

  useEffect(() => {
    showedItems();
    setSiteValue('cocktail');
    const bringItens = async () => {
      const final = await getRecipes('cocktail', 'search', 's=');
      setApiValue(final);
      localStorage.setItem('first12', JSON.stringify(final.drinks.slice(0, MAX_LENGTH)));
      setFirst12(final?.drinks?.slice(0, MAX_LENGTH));
      setFinalItems(final?.drinks?.slice(0, MAX_LENGTH));
    };
    const bringCategories = async () => {
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
      {categories && categories.map(({ strCategory }) => (<Button
        key={ strCategory }
        className="0"
        name={ strCategory }
        onClick={ handleCategoryClick }
        dataTest={ `${
          strCategory
        }-category-filter` }
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
