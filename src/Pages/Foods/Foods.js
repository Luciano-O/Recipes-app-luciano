import React, { useContext, useEffect, useState } from 'react';
import Card from '../../Components/Card/Card';
import Button from '../../Components/Button/Button';
import RecipesContext from '../../Context/RecipesContext';
import Header from '../../Components/Header/Header';
import FooterMenu from '../../Components/FooterMenu/FooterMenu';
import getRecipes from '../../Helpers/API';

function Foods() {
  const MAX_LENGTH = 13;
  const [finalItens, setFinalItens] = useState();
  const [atualCategory, setAtualCategory] = useState();
  const [categories, setCategories] = useState();
  const { setSiteValue, siteValue, setApiValue } = useContext(RecipesContext);

  useEffect(() => {
    const attItens = async () => {
      const { meals } = await getRecipes('meal', 'filter', `c=${atualCategory}`);
      setApiValue(meals);
      setFinalItens(meals?.slice(0, MAX_LENGTH));
    };
    attItens();
  }, [atualCategory]);

  useEffect(() => {
    setSiteValue('meal');
    const bringItens = async () => {
      const final = await getRecipes('meal', 'search', 's=');
      setApiValue(final);
      setFinalItens(final?.meals?.slice(0, MAX_LENGTH));
    };
    const bringCategories = async () => {
      const MAX_LENGTH_C = 6;
      const final = await getRecipes('meal', 'list', 'c=list');
      setCategories(final?.meals?.slice(0, MAX_LENGTH_C));
    };
    bringCategories();
    bringItens();
  }, []);

  // useEffect(() => {
  //   const attOtherItens = () => {
  //     setFinalItens(apiValue.meals);
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
      {categories
      && categories.map(({ strCategory }) => (<Button
        key={ strCategory }
        className="0"
        name={ strCategory }
        onClick={ ({ target }) => setAtualCategory(target.name) }
        dataTestId={ `${strCategory}-category-filter` }
        text={ strCategory }
      />)) }
      {finalItens
         && finalItens.map(({ idMeal, strMealThumb, strMeal }, index) => (
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
