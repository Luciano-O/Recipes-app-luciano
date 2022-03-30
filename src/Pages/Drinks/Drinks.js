import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
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
  const [categoryButtonActive, setCategoryButtonActive] = useState(false);
  const { setSiteValue,
    siteValue,
    setApiValue,
    finalItems,
    setFinalItems,
    setFirst12,
  } = useContext(RecipesContext);

  const handleCategoryClick = async ({ target }) => {
    if (categoryButtonActive !== target.name) {
      const { drinks } = await getRecipes(siteValue, 'filter', `c=${target.name}`);
      setApiValue(drinks);
      setFinalItems(drinks?.slice(0, MAX_LENGTH));
      setCategoryButtonActive(target.name);
    } else {
      const final = await getRecipes('cocktail', 'search', 's=');
      setApiValue(final);
      localStorage.setItem('first12', JSON.stringify(final.drinks.slice(0, MAX_LENGTH)));
      setFirst12(final?.drinks?.slice(0, MAX_LENGTH));
      setFinalItems(final?.drinks?.slice(0, MAX_LENGTH));
      setCategoryButtonActive('');
    }
  };

  const handleAllCategoryClick = async () => {
    const final = await getRecipes('cocktail', 'search', 's=');
    setApiValue(final);
    localStorage.setItem('first12', JSON.stringify(final.drinks.slice(0, MAX_LENGTH)));
    setFirst12(final?.drinks?.slice(0, MAX_LENGTH));
    setFinalItems(final?.drinks?.slice(0, MAX_LENGTH));
    setCategoryButtonActive('');
  };

  useEffect(() => {
    setSiteValue('cocktail');
    const bringItens = async () => {
      const final = await getRecipes('cocktail', 'search', 's=');
      setApiValue(final);
      setFirst12(final?.drinks?.slice(0, MAX_LENGTH));
      setFinalItems(final?.drinks?.slice(0, MAX_LENGTH));
    };
    const bringCategories = async () => {
      const final = await getRecipes('cocktail', 'list', 'c=list');
      setCategories(final.drinks.slice(0, MAX_LENGTH_C));
    };
    bringCategories();
    bringItens();
  }, []);

  console.log(finalItems);

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
      <Button
        dataTest="All-category-filter"
        onClick={ handleAllCategoryClick }
        name="all-category-btn"
        className="0"
        text="All"
      />
      {finalItems?.map(({ idDrink, strDrinkThumb, strDrink }, index) => (
        <Link to={`/drinks/${idDrink}`} key={ idDrink }>
          <Card
            thumb={ strDrinkThumb }
            title={ strDrink }
            index={ index }
          />
        </Link>
      ))}
      <FooterMenu />
    </div>
  );
}

export default Drinks;
