import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { getProgress, saveInProgressRecipe } from '../../Helpers/localStorageSaves';
import Button from '../Button/Button';

function ProgressDetails(props) {
  const {
    img,
    id,
    title,
    categoryStr,
    recipeIngredients,
    recipeQuants,
    instructions,
  } = props;
  const history = useHistory();
  const [progressToSave, setProgressToSave] = useState([]);

  useEffect(() => {
    if (getProgress()[id]) {
      setProgressToSave(getProgress()[id]);
    }
  }, []);

  const handleClick = (arr1, item) => {
    let arrChange;
    if (arr1.includes(item)) {
      arrChange = arr1.filter((item1) => item1 !== item);
      console.log(arrChange);
    } else {
      arrChange = arr1.concat(item);
    }
    setProgressToSave(arrChange);
    saveInProgressRecipe(id, arrChange);
  };

  const handleClickFinish = () => {
    history.push('/done-recipes');
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
              checked={ progressToSave && progressToSave.includes(item) }
              onChange={ () => handleClick(progressToSave, item) }
            />
            <label htmlFor={ `item ${index}` }>{`${item} ${recipeQuants[index]}`}</label>
          </li>)) }
      </ol>
      <p data-testid="instructions">
        {instructions}
      </p>
      <Button
        text="Finish recipe"
        dataTest="finish-recipe-btn"
        disabled={ progressToSave.length !== recipeIngredients.length }
        onClick={ handleClickFinish }
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
  id: PropTypes.number.isRequired,
};

export default ProgressDetails;
