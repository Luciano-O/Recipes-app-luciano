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
      const { meals } = await getRecipes(siteValue, 'filter', `c=${target.name}`);
      setApiValue(meals);
      setFinalItems(meals.slice(0, MAX_LENGTH));
      setCategoryButtonActive(target.name);
    } else {
      const final = await getRecipes('meal', 'search', 's=');
      setApiValue(final);
      setFirst12(final?.meals?.slice(0, MAX_LENGTH));
      setFinalItems(final?.meals?.slice(0, MAX_LENGTH));
      setCategoryButtonActive('');
    }
  };

  useEffect(() => {
    setSiteValue('meal');
    const bringItens = async () => {
      const final = await getRecipes('meal', 'search', 's=');
      setApiValue(final);
      setFirst12(final?.meals?.slice(0, MAX_LENGTH));
      setFinalItems(final?.meals?.slice(0, MAX_LENGTH));
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
      <button type="button" data-testid="All-category-filter">All</button>
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
