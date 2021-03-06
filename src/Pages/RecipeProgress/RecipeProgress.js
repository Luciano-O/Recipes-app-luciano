import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
        const ingValues = Object.values(value[0]).slice(MIN_ING, MAX_ING);
        const quantValue = Object.values(value[0]).slice(MIN_QUANT, MAX_QUANT);
        setIngredients(ingValues.filter((item) => item && (item !== ' ')));
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
        const ingValues = Object.values(value[0]).slice(MIN_ING, MAX_ING);
        const quantValue = Object.values(value[0]).slice(MIN_QUANT, MAX_QUANT);
        setIngredients(ingValues.filter((item) => item && ((!item.includes('https://')))));
        setIngredientsQuant(quantValue.filter((item) => item));
        setRecipe(drinks[0]);
      };
      bringItem();
    }
  }, []);

  const mealsInfo = () => (
    <ProgressDetails
      img={ recipe.strMealThumb }
      title={ recipe.strMeal }
      categoryStr={ recipe.strCategory }
      type="meals"
      nationality={ recipe.strArea }
      category={ recipe.strCategory }
      alcoholicOrNot=""
      id={ recipeId }
      recipeIngredients={ ingredients }
      recipeQuants={ ingredientsQuant }
      instructions={ recipe.strInstructions }
      tags={ recipe.strTags }
    />
  );

  const drinksInfo = () => (
    <ProgressDetails
      img={ recipe.strDrinkThumb }
      title={ recipe.strDrink }
      categoryStr={ recipe.strCategory }
      type="cocktails"
      nationality={ recipe.strArea ? recipe.strArea : '' }
      alcoholicOrNot={ recipe.strAlcoholic }
      id={ recipeId }
      recipeIngredients={ ingredients }
      recipeQuants={ ingredientsQuant }
      instructions={ recipe.strInstructions }
      tags={ recipe.strTags }
    />
  );

  return (
    <div>
      {recipe && (thisType === 'meal' ? mealsInfo() : drinksInfo())}
    </div>
  );
}

export default RecipeProgress;
