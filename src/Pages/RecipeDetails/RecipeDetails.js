import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../../Components/Button/Button';
import styles from './styles.module.css';

import { cardRecomendatioConstructor,
  ingredientDivConstructor,
  videoDivConstructor,
  fetchApi,
  getRecommendations,
  handleStartButton,
  recipeButtonName } from '../../Helpers/RecipeDetailsFunctions';
import FavoriteButton from '../../Components/FavoriteButton/FavoriteButton';
import { saveInProgressRecipe } from '../../Helpers/localStorageSaves';
import ShareButton from '../../Components/ShareButton/ShareButton';

function RecipeDetails({ match }) {
  const pagePath = match.params;
  const [recipe, setRecipe] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [measure, setMeasure] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [showStart, setShowStart] = useState(true);
  const { type: pageType, id: pageId } = pagePath;
  const history = useHistory();
  let type;
  if (pageType === 'foods') {
    type = 'Meal';
  } else {
    type = 'Drink';
  }

  useEffect(() => {
    recipeButtonName(type, pageId, setShowStart);
    fetchApi(setRecipe, setIngredients, setMeasure, pagePath);
    getRecommendations(pagePath, setRecommended);
  }, []);

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
                type={ `${type === 'Meal' ? 'food' : 'drink'}` }
                nationality={ recipe[0].strArea || '' }
                category={ recipe[0].strCategory || '' }
                alcoholicOrNot={ recipe[0].strAlcoholic || '' }
                name={ recipe[0][`str${type}`] }
                image={ recipe[0][`str${type}Thumb`] }
              />
              <ShareButton recipeLink={ `http://localhost:3000/${type === 'Meal' ? 'foods' : 'drinks'}/${pageId}` } />
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
              text={ showStart ? 'Start Recipe' : 'Continue Recipe' }
              name="start-recipe"
              dataTest="start-recipe-btn"
              onClick={ () => handleStartButton(
                element[`id${type}`], type, history, saveInProgressRecipe,
              ) }
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
