import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { addDoneRecipe, getProgress,
  saveInProgressRecipe } from '../../Helpers/localStorageSaves';
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
    type,
    nationality,
    alcoholicOrNot,
    tags,
  } = props;
  const history = useHistory();
  const [progressToSave, setProgressToSave] = useState([]);

  let drinkOrFood;
  if (type === 'meals') {
    drinkOrFood = 'foods';
  } else {
    drinkOrFood = 'drink';
  }

  useEffect(() => {
    if (getProgress()[type][id]) {
      setProgressToSave(getProgress()[type][id]);
    }
  }, []);

  const handleClick = (arr1, item) => {
    let arrChange;
    if (arr1.includes(item)) {
      arrChange = arr1.filter((item1) => item1 !== item);
    } else {
      arrChange = arr1?.concat(item);
    }
    setProgressToSave(arrChange);
    saveInProgressRecipe(type, id, arrChange);
  };

  const lsObjGenerator = () => {
    const doneDate = new Date(Date()).toLocaleDateString();

    const lsObj = { id,
      type: drinkOrFood,
      nationality,
      category: categoryStr,
      alcoholicOrNot,
      name: title,
      image: img,
      doneDate,
      tags: tags?.split(',') || [] };
    return lsObj;
  };

  const handleClickFinish = () => {
    addDoneRecipe(lsObjGenerator());
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
              defaultChecked={ progressToSave && progressToSave.includes(item) }
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

ProgressDetails.defaultProps = {
  id: ',',
  tags: '[]',
};

ProgressDetails.propTypes = {
  alcoholicOrNot: PropTypes.string.isRequired,
  categoryStr: PropTypes.string.isRequired,
  id: PropTypes.string,
  img: PropTypes.string.isRequired,
  instructions: PropTypes.string.isRequired,
  nationality: PropTypes.string.isRequired,
  recipeIngredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  recipeQuants: PropTypes.arrayOf(PropTypes.string).isRequired,
  tags: PropTypes.string,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default ProgressDetails;
