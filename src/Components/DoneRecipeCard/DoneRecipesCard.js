import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { readDoneRecipes } from '../../Helpers/localStorageSaves';
import ShareButton from '../ShareButton/ShareButton';
import styles from './styles.module.css';

function DoneRecipeCard({ filter }) {
  const history = useHistory();
  let doneRecipeInfo = readDoneRecipes();
  function FilterCards() {
    if (filter === 'drink') {
      doneRecipeInfo = readDoneRecipes && readDoneRecipes().filter(
        (recipe) => recipe.type.includes('drink'),
      );
    } if (filter === 'foods') {
      doneRecipeInfo = readDoneRecipes()?.filter(
        (recipe) => recipe.type.includes('food'),
      );
    }
  }
  FilterCards();
  function handleClick(id, type) {
    if (type.includes('food')) {
      history.push(`/foods/${id}`);
    } else {
      history.push(`/drinks/${id}`);
    }
  }
  return (
    <div className={ styles.DoneRecipeCard }>
      ;
      {doneRecipeInfo && doneRecipeInfo.map((recipe, index) => (
        <div
          key={ index }
          className={ styles.CardDiv }
        >
          <div
            className={ styles.CardImgDiv }
          >
            <img
              aria-hidden
              src={ recipe.image }
              alt={ recipe.name }
              data-testid={ `${index}-horizontal-image` }
              onClick={ () => handleClick(recipe.id, recipe.type) }
            />
          </div>
          <div className={ styles.CardInfoDiv }>
            <p
              className={ styles.CardInfoCategoryText }
              data-testid={ `${index}-horizontal-top-text` }
            >
              {recipe.type === 'drink'
                ? recipe.alcoholicOrNot : `${recipe.nationality} - ${recipe.category}` }
            </p>
            <p
              aria-hidden
              className={ styles.CardInfoTitleText }
              data-testid={ `${index}-horizontal-name` }
              onClick={ () => handleClick(recipe.id, recipe.type) }
            >
              {recipe.name}
            </p>
            <p
              className={ styles.CardInfoDateText }
              data-testid={ `${index}-horizontal-done-date` }
            >
              {recipe.doneDate}
            </p>
            <div className={ styles.CardTagsDiv }>
              {recipe.length && recipe.type === 'drink' ? null : recipe.tags.map(
                (tag, index2) => (
                  <p
                    key={ index2 }
                    data-testid={ `${index}-${tag}-horizontal-tag` }
                  >
                    {tag}
                  </p>
                ),
              )}
            </div>
            <ShareButton dataTest={ `${index}-horizontal-share-btn` } recipeLink={ `http://localhost:3000/${recipe.type}s/${recipe.id}` } />
          </div>
        </div>
      ))}
    </div>);
}

DoneRecipeCard.propTypes = {
  filter: PropTypes.string.isRequired,
};

export default DoneRecipeCard;
