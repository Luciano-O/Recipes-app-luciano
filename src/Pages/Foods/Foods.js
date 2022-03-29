import React, { useContext, useEffect, useState } from 'react';
import Card from '../../Components/Card/Card';
import Button from '../../Components/Button/Button';
import RecipesContext from '../../Context/RecipesContext';
import Header from '../../Components/Header/Header';
import FooterMenu from '../../Components/FooterMenu/FooterMenu';
import getRecipes from '../../Helpers/API';

const MAX_LENGTH = 12;
const MAX_LENGTH_C = 5;

function Foods() {
  // const [atualCategory, setAtualCategory] = useState();
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
    const { meals } = await getRecipes(siteValue, 'filter', `c=${target.name}`);
    setApiValue(meals);
    setFinalItems(meals.slice(0, MAX_LENGTH));
    setIsCategoryButtonActive(!isCategoryButtonActive);
  };

  function showedItems() {
    if (isCategoryButtonActive) {
      setFinalItems(bringItens()?.meals?.slice(0, MAX_LENGTH_C));
    } else {
      setFinalItems(first12);
    }
  }

  useEffect(() => {
    showedItems();
    setSiteValue('meal');
    const bringItens = async () => {
      const final = await getRecipes('meal', 'search', 's=');
      setApiValue(final);
      setFirst12(final?.meals?.slice(0, MAX_LENGTH));
      setFinalItems(final?.meals?.slice(0, MAX_LENGTH));
      return final;
    };
    const bringCategories = async () => {
      const final = await getRecipes('meal', 'list', 'c=list');
      setCategories(final?.meals?.slice(0, MAX_LENGTH_C));
    };
    bringCategories();
    bringItens();
  }, []);

  // useEffect(() => {
  //   const attOtherItens = () => {
  //     setFinalItems(apiValue.meals);
  //   };
  //   console.log('oi');
  //   attOtherItens();
  // }, [apiValue]);

  return (
    <div>
      <Header
        title="Foods"
      />
      <h1>{ siteValue }</h1>
      {categories && categories.map(({ strCategory }) => (<Button
        key={ strCategory }
        className="0"
        name={ strCategory }
        onClick={ handleCategoryClick }
        dataTest={ `${strCategory}-category-filter` }
        text={ strCategory }
      />)) }
      {finalItems?.map(({ idMeal, strMealThumb, strMeal }, index) => (
        <Card
          index={ index }
          key={ idMeal }
          thumb={ strMealThumb }
          title={ strMeal }
        />
      ))}
      <FooterMenu />
    </div>
  );
}

export default Foods;
