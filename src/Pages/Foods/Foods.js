import React, { useContext, useEffect } from 'react';
// import Card from '../../Components/Card/Card';
// import Button from '../../Components/Button/Button';
import RecipesContext from '../../Context/RecipesContext';
// import fetchMealsDrinks from '../../Helpers/Fetchs';
import Header from '../../Components/Header/Header';
import FooterMenu from '../../Components/FooterMenu/FooterMenu';
// import getRecipes from '../../Helpers/API';

function Foods() {
  // const [itens, setItens] = useState();
  // const [finalItens, setFinalItens] = useState();
  // const [atualCategory, setAtualCategory] = useState();
  // const [categories, setCategories] = useState();
  const { setSiteValue } = useContext(RecipesContext);

  useEffect(() => {
    setSiteValue('meal');
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
