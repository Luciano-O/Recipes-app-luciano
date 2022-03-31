import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getProgress, saveInProgressRecipe } from '../../Helpers/localStorageSaves';
import Button from '../Button/Button';
import arr from './Data';

function ProgressDetails(props) {
  const {
    img,
    title,
    categoryStr,
    recipeIngredients,
    recipeQuants,
    instructions,
  } = props;
  let savedProgress = getProgress()[title];
  if (!savedProgress) {
    savedProgress = arr;
  }
  const [progress, setProgress] = useState(savedProgress);
  const [progressToSave, setProgressToSave] = useState(savedProgress);

  useEffect(() => {
    const set = () => {
      setProgress(getProgress[title]);
    };
    set();
  }, []);

  const handleClick = (arr1, index) => {
    const arrChange = arr1;
    if (arrChange[index]) {
      arrChange[index] = false;
    } else {
      arrChange[index] = true;
    }
    setProgressToSave(arrChange);
    saveInProgressRecipe(title, arrChange);
    setProgress(arr1[index]);
  };

  return (
    <div>
      <img
        src={ img }
        alt={ title }
        data-testid="recipe-photo"
      />
      <h2 data-testid="recipe-title">
        {title}
      </h2>
      <h3 data-testid="recipe-category">
        {categoryStr}
      </h3>
      <ol>
        { recipeIngredients.map((item, index) => (
          <li key={ index } data-testid={ `${index}-ingredient-step` }>
            <input
              type="checkbox"
              name={ `item ${index}` }
              checked={ progress && progress[index] }
              onChange={ () => handleClick(progressToSave, index) }
            />
            <label htmlFor={ `item ${index}` }>{`${item} ${recipeQuants[index]}`}</label>
          </li>)) }
      </ol>
      <p data-testid="instructions">
        {instructions}
      </p>
      <Button
        text="Done"
        dataTest="finish-recipe-btn"
      />
    </div>
  );
}

ProgressDetails.propTypes = {
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  recipeIngredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  recipeQuants: PropTypes.arrayOf(PropTypes.string).isRequired,
  categoryStr: PropTypes.string.isRequired,
  instructions: PropTypes.string.isRequired,
};

export default ProgressDetails;
