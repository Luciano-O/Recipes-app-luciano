import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../Components/Header/Header';
import ProgressDetails from '../../Components/ProgressDetails/ProgressDetails';
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

  const handleClickShare = () => {
    navigator.clipboard.writeText(`localhost:3000/${type}/${recipeId}/in-progress`);
    global.alert('Link copied!');
  };

  const mealsInfo = () => (
    <ProgressDetails
      img={ recipe.strMealThumb }
      title={ recipe.strMeal }
      categoryStr={ recipe.strCategory }
      recipeIngredients={ ingredients }
      recipeQuants={ ingredientsQuant }
      instructions={ recipe.strInstructions }
      clickShare={ () => handleClickShare() }
    />
  );

  const drinksInfo = () => (
    <ProgressDetails
      img={ recipe.strDrinkThumb }
      title={ recipe.strDrink }
      categoryStr={ recipe.strCategory }
      recipeIngredients={ ingredients }
      recipeQuants={ ingredientsQuant }
      instructions={ recipe.strInstructions }
    />
  );

  return (
    <div>
      <Header />
      <h1>RecipeProgress</h1>
      {recipe && (thisType === 'meal' ? mealsInfo() : drinksInfo())}
    </div>
  );
}

export default RecipeProgress;
