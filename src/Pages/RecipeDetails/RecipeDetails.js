import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ButtonComponent from '../../Components/Button/Button';
import styles from './styles.module.css';

import { CardRecomendatioConstructor,
  ingredientDivConstructor,
  videoDivConstructor,
  fetchApi,
  getRecommendations,
  handleStartButton,
  recipeButtonName } from '../../Helpers/RecipeDetailsFunctions/RecipeDetailsFunctions';
import FavoriteButton from '../../Components/FavoriteButton/FavoriteButton';
import { saveInProgressRecipe } from '../../Helpers/localStorageSaves';
import ShareButton from '../../Components/ShareButton/ShareButton';
import RecipesContext from '../../Context/RecipesContext';
// import CardRecommended from '../../Components/RecommendedCard/CardRecommended';

function RecipeDetails(props) {
  const { match } = props;
  const pagePath = match.params;
  const [recipe, setRecipe] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [measure, setMeasure] = useState([]);
  const [showStart, setShowStart] = useState(true);
  const { type: pageType, id: pageId } = pagePath;
  const { recommended, setRecommended } = useContext(RecipesContext);
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
  }, [pageId, pagePath, type, setRecommended]);

  return (
    <div className={ styles.RecipeDetailsPage }>
      {recipe.map((element, index) => (
        <div key={ index }>
          <div className={ styles.RecipeHeader }>
            <div className={ styles.RecipePhoto }>
              <img
                data-testid="recipe-photo"
                src={ element[`str${type}Thumb`] }
                alt={ element[`str${type}`] }
              />
            </div>
            <div className={ styles.RecipeDetailsInfo }>
              <h1 data-testid="recipe-title">{ element[`str${type}`] }</h1>
              <h3
                data-testid="recipe-category"
              >
                {type === 'Meal' ? element.strCategory : element.strAlcoholic}
              </h3>
              <div className={ styles.RecipeDetailsInfoButtons }>
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
            </div>
          </div>
          <div className={ styles.RecipeDetailsMain }>
            <div className={ styles.RecipeDetailsIngredients }>
              <h1>Ingredients</h1>
              <ul>
                {ingredientDivConstructor(ingredients, measure)}
              </ul>
            </div>
            <div>
              <h1>Instructions</h1>
              <div
                data-testid="instructions"
                className={ styles.RecipeDetailsInstructions }
              >
                <p>
                  {element.strInstructions}
                </p>
              </div>
            </div>
            <div className={ styles.RecomendationDiv }>
              {pageType === 'foods' ? videoDivConstructor(element.strYoutube) : null}
              <div className={ styles.RecomendationCards }>
                <h1>Recommended</h1>
                <div
                  className={ styles.Card }
                >
                  {/* <CardRecommended { ...props } /> */}
                  {CardRecomendatioConstructor(recommended, type)}
                </div>
              </div>
            </div>
          </div>
          <div className={ styles.StartRecipeButtonDiv }>
            <ButtonComponent
              className={ styles.StartRecipeButton }
              text={ showStart ? 'Start Recipe' : 'Continue Recipe' }
              name="start-recipe"
              dataTest="start-recipe-btn"
              onClick={ () => handleStartButton(
                element[`id${type}`], type, history, saveInProgressRecipe,
              ) }
              variant="orange2"
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
