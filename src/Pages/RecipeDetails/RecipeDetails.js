import PropTypes from 'prop-types';
import React, { useEffect, useContext, useState } from 'react';
import Card from '../../Components/Card/Card';
import Button from '../../Components/Button/Button';
import styles from './styles.module.css';
import getRecipes from '../../Helpers/API';
import RecipesContext from '../../Context/RecipesContext';

const MAX_LENGTH = 6;

function RecipeDetails({ match }) {
  const pagePath = match.params;
  const [recipe, setRecipe] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [measure, setMeasure] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const { type: pageType, id: pageId } = pagePath;
  let type;
  if (pageType === 'foods') {
    type = 'Meal';
  } else {
    type = 'Drink';
  }

  const { setSiteValue } = useContext(RecipesContext);

  function ingredientsAndMeasure(keyType, text) {
    return (Object.entries(keyType[0]).filter(
      ([key, value]) => key.includes(text) && value,
    ));
  }

  useEffect(() => {
    async function fetchApi() {
      if (pageType === 'foods') {
        const { meals } = await getRecipes('meal', 'lookup', `i=${pageId}`);
        setRecipe(meals);
        setIngredients(ingredientsAndMeasure(meals, 'strIngredient'));
        setMeasure(ingredientsAndMeasure(meals, 'strMeasure'));
        setSiteValue('meal');
        const { drinks: recommendedDrinks } = await
        getRecipes('cocktail', 'search', 's=');
        setRecommended(recommendedDrinks?.slice(0, MAX_LENGTH));
      } else if (pageType === 'drinks') {
        const { drinks } = await getRecipes('cocktail', 'lookup', `i=${pageId}`);
        setRecipe(drinks);
        setIngredients(ingredientsAndMeasure(drinks, 'strIngredient'));
        setMeasure(ingredientsAndMeasure(drinks, 'strMeasure'));
        setSiteValue('cocktail');
        const { meals: recommendedDrinks } = await
        getRecipes('meal', 'search', 's=');
        setRecommended(recommendedDrinks?.slice(0, MAX_LENGTH));
      } return recipe;
    }
    fetchApi();
  }, []);

  const videoDiv = (
    <video
      controls
      src="/media/cc0-videos/friday.mp4"
    >
      <track
        default
        kind="captions"
        srcLang="en"
        src="/media/examples/friday.vtt"
        data-testid="video"
      />
      Sorry, your browser doesnt support embedded videos.
    </video>
  );

  const ingredientDiv = ingredients.map(([key, value], i) => (
    <div key={ key }>
      <p
        data-testid={ `${i}-ingredient-name-and-measure` }
      >
        {`${value} ${measure[i] && measure[i][1]}`}
      </p>
    </div>
  ));

  function cardRecomendatioConstructor() {
    let recomendations;
    if (type === 'Meal') {
      recomendations = recommended.map((item, i3) => (
        <Card
          key={ i3 }
          datatestRecipeCard={ `${i3}-recomendation-card` }
          datatestCardImage={ `${i3}-recomendation-img` }
          datatestCardName={ `${i3}-recomendation-title` }
          title={ item.strDrink }
          thumb={ item.strDrinkThumb }
        />
      ));
    } else {
      recomendations = recommended.map((item, i3) => (
        <Card
          key={ i3 }
          datatestRecipeCard={ `${i3}-recomendation-card` }
          datatestCardImage={ `${i3}-recomendation-img` }
          datatestCardName={ `${i3}-recomendation-title` }
          title={ item.strMeal }
          thumb={ item.strMealThumb }
        />
      ));
    } return recomendations;
  }
  return (
    <div>
      {recipe.map((element, index) => (
        <div key={ index }>
          <div className={ styles.RecipeHeader }>
            <img
              data-testid="recipe-photo"
              src={ element[`str${type}Thumb`] }
              alt={ element[`str${type}`] }
            />
            <div>
              <h1 data-testid="recipe-title">{ element[`str${type}`] }</h1>
              <button data-testid="share-btn" type="button">
                <img src="" alt={ index } />
              </button>
              <button data-testid="favorite-btn" type="button">
                <img src="" alt="" />
              </button>
            </div>
            <h3
              data-testid="recipe-category"
            >
              {type === 'Meal' ? element.strCategory : element.strAlcoholic}
            </h3>
          </div>
          <div>
            <h1>Ingredients</h1>
            {ingredientDiv}
          </div>
          <div>
            <h1>Instructions</h1>
            <div data-testid="instructions">{element.strInstructions}</div>
          </div>
          <div className={ styles.RecomendationDiv }>
            <h1>Video</h1>
            {pageType === 'foods' ? videoDiv : null}
            <div className={ styles.RecomendationCards }>
              <h1>Recommended</h1>
              <div className={ styles.Card }>{cardRecomendatioConstructor()}</div>
            </div>
            <Button
              className={ styles.StartRecipeButton }
              text="Start Recipe"
              name="start-recipe"
              dataTest="start-recipe-btn"
              // onClick={ () => handleNavigation('/done-recipes') }
            />
          </div>
        </div>))}
    </div>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
      type: PropTypes.string,
    }),
  }).isRequired,
};

export default RecipeDetails;
