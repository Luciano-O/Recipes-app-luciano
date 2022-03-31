import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import Button from '../../Components/Button/Button';
import styles from './styles.module.css';
// import getRecipes from '../../Helpers/API';
import { cardRecomendatioConstructor,
  ingredientDivConstructor,
  videoDivConstructor,
  fetchApi,
  getRecommendations } from '../../Helpers/RecipeDetailsFunctions';
import FavoriteButton from '../../Components/FavoriteButton/FavoriteButton';

// import { addInProgressRecipe } from '../../Helpers/localStorageSaves';

function RecipeDetails({ match }) {
  const pagePath = match.params;
  const [recipe, setRecipe] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [measure, setMeasure] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const { type: pageType } = pagePath;
  const history = useHistory();
  const copy = clipboardCopy;
  let type;
  if (pageType === 'foods') {
    type = 'Meal';
  } else {
    type = 'Drink';
  }

  if (!JSON.parse(localStorage.getItem('inProgressRecipes'))) {
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      cocktails: {},
      meals: {},
    }));
  }

  useEffect(() => {
    fetchApi(setRecipe, setIngredients, setMeasure, pagePath);
    getRecommendations(pagePath, setRecommended);
  }, []);

  function handleStartButton(id) {
    if (type === 'Meal') {
      history.push(`/foods/${id}/in-progress`);
    } else {
      history.push(`/drinks/${id}/in-progress`);
    }
  }

  function handleShareClick() {
    copy(window.location.href);
    global.alert('Link copied!');
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
              <FavoriteButton
                id={ recipe[0][`id${type}`] }
                type="cocktail"
                nationality={ recipe[0].strArea }
                category={ recipe[0].strCategory }
                alcoholicOrNot={ recipe[0].strAlcoholic }
                name={ recipe[0][`str${type}`] }
                image={ recipe[0][`str${type}Thumb`] }
              />
              <button onClick={ handleShareClick } data-testid="share-btn" type="button">
                <img src="../../images/shareIcon.svg" alt="share" />
              </button>
              <button data-testid="favorite-btn" type="button">
                <img src="../../images/whiteHeartIcon.svg" alt="favorite" />
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
            {ingredientDivConstructor(ingredients, measure)}
          </div>
          <div>
            <h1>Instructions</h1>
            <div data-testid="instructions">{element.strInstructions}</div>
          </div>
          <div className={ styles.RecomendationDiv }>
            {pageType === 'foods' ? videoDivConstructor() : null}
            <div className={ styles.RecomendationCards }>
              <h1>Recommended</h1>
              <div
                className={ styles.Card }
              >
                {cardRecomendatioConstructor(recommended, type)}
              </div>
            </div>
            <Button
              className={ styles.StartRecipeButton }
              text="Start Recipe"
              name="start-recipe"
              dataTest="start-recipe-btn"
              onClick={ () => handleStartButton(element[`id${type}`]) }
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
