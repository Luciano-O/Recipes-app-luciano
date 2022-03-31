import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import Button from '../../Components/Button/Button';
import styles from './styles.module.css';
// import { addInProgressRecipe } from '../../Helpers/localStorageSaves';
import { cardRecomendatioConstructor,
  ingredientDivConstructor,
  videoDivConstructor,
  fetchApi,
  getRecommendations } from '../../Helpers/RecipeDetailsFunctions';

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
    global.alert('"Link copied!"');
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
