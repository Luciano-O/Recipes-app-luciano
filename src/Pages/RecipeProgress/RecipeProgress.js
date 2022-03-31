import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FavoriteButton from '../../Components/FavoriteButton/FavoriteButton';
import Header from '../../Components/Header/Header';
import ProgressDetails from '../../Components/ProgressDetails/ProgressDetails';
import ShareButton from '../../Components/ShareButton/ShareButton';
import getRecipes from '../../Helpers/API';

// 52844
// 17222

function RecipeProgress() {
  const { recipeId, type } = useParams();
  const [recipe, setRecipe] = useState();
  const [ingredients, setIngredients] = useState();
  const [ingredientsQuant, setIngredientsQuant] = useState();

  const setType = () => {
    if (type === 'foods') {
      return 'meal';
    }
    return 'cocktail';
  };

  const thisType = setType();

  useEffect(() => {
    if (thisType === 'meal') {
      const MAX_ING = 29;
      const MAX_QUANT = 49;
      const MIN_ING = 9;
      const MIN_QUANT = 29;
      const bringItem = async () => {
        const { meals } = await getRecipes(thisType, 'lookup', `i=${recipeId}`);
        const value = Object.values(meals);
        const ingValues = Object.values(value[0]).slice(MIN_QUANT, MAX_QUANT);
        const quantValue = Object.values(value[0]).slice(MIN_ING, MAX_ING);
        setIngredients(ingValues.filter((item) => item));
        setIngredientsQuant(quantValue.filter((item) => item));
        setRecipe(meals[0]);
      };
      bringItem();
    } else {
      const MAX_ING = 32;
      const MAX_QUANT = 48;
      const MIN_ING = 17;
      const MIN_QUANT = 32;
      const bringItem = async () => {
        const { drinks } = await getRecipes(thisType, 'lookup', `i=${recipeId}`);
        const value = Object.values(drinks);
        const ingValues = Object.values(value[0]).slice(MIN_QUANT, MAX_QUANT);
        const quantValue = Object.values(value[0]).slice(MIN_ING, MAX_ING);
        setIngredients(ingValues.filter((item) => item));
        setIngredientsQuant(quantValue.filter((item) => item));
        setRecipe(drinks[0]);
      };
      bringItem();
    }
  }, []);

  const mealsInfo = () => (
    <>
      <FavoriteButton
        id={ recipeId }
        type="meal"
        nationality={ recipe.strArea }
        category={ recipe.strCategory }
        alcoholicOrNot="food"
        name={ recipe.strMeal }
        image={ recipe.strMealThumb }
      />
      <ProgressDetails
        img={ recipe.strMealThumb }
        title={ recipe.strMeal }
        categoryStr={ recipe.strCategory }
        recipeIngredients={ ingredients }
        recipeQuants={ ingredientsQuant }
        instructions={ recipe.strInstructions }
      />
    </>
  );

  const drinksInfo = () => (
    <>
      <FavoriteButton
        id={ recipeId }
        type="cocktail"
        nationality={ recipe.strArea }
        category={ recipe.strCategory }
        alcoholicOrNot={ recipe.strAlcoholic }
        name={ recipe.strDrink }
        image={ recipe.strDrinkThumb }
      />
      <ProgressDetails
        img={ recipe.strDrinkThumb }
        title={ recipe.strDrink }
        categoryStr={ recipe.strCategory }
        recipeIngredients={ ingredients }
        recipeQuants={ ingredientsQuant }
        instructions={ recipe.strInstructions }
      />
    </>
  );

  return (
    <div>
      <Header />
      <h1>RecipeProgress</h1>
      <ShareButton recipeLink={ `http://localhost:3000/${type}/${recipeId}` } />
      {recipe && (thisType === 'meal' ? mealsInfo() : drinksInfo())}
    </div>
  );
}

export default RecipeProgress;
