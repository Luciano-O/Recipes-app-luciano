import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../Components/Header/Header';
import FooterMenu from '../../Components/FooterMenu/FooterMenu';
import Button from '../../Components/Button/Button';
import { getRandomRecipe } from '../../Helpers/API';

function ExploreDetails({ match }) {
  const pageTitle = match.params.type;
  const history = useHistory();

  function handleClickIngred(type) {
    history.push(`/explore/${type}/ingredients`);
  }

  let foodOrDrink = '';
  if (pageTitle === 'drinks') {
    foodOrDrink = 'drinks';
  } else if (pageTitle === 'foods') {
    foodOrDrink = 'foods';
  }

  function handleClickNation(type) {
    history.push(`/explore/${type}/nationalities`);
  }

  async function handleClickRandom() {
    if (foodOrDrink === 'foods') {
      const { meals } = await getRandomRecipe('meal');
      const getMeallId = meals[0].idMeal;
      history.push(`/foods/${getMeallId}`);
    } else if (foodOrDrink === 'drinks') {
      const { drinks } = await getRandomRecipe('cocktail');
      const getDrinkId = drinks[0].idDrink;
      history.push(`/drinks/${getDrinkId}`);
    }
  }

  const nationalityBtn = (<Button
    dataTest="explore-by-nationality"
    onClick={ () => handleClickNation('foods') }
    name="explore-by-nationality-btn"
    className="none"
    text="By Nationality"
    disabled={ false }
  />);

  return (
    <div>
      <Header
        title={ `Explore ${pageTitle.charAt(0).toUpperCase() + pageTitle.slice(1)}` }
        searchBtnExists
      />
      <Button
        dataTest="explore-by-ingredient"
        onClick={ () => handleClickIngred(foodOrDrink) }
        name="explore-by-ingredient-btn"
        className="none"
        text="By Ingredient"
        disabled={ false }
      />
      { pageTitle === 'foods' ? nationalityBtn : null }
      <Button
        dataTest="explore-surprise"
        onClick={ () => handleClickRandom() }
        name="explore-surprise-btn"
        className="none"
        text="Surprise me!"
        disabled={ false }
      />
      <FooterMenu />
    </div>
  );
}

ExploreDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      type: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ExploreDetails;

// REFERENCIAS:
// TRANSFORMAR PRIMEIRA LETRA DA STRING EM UPPERCASE: https://flexiple.com/javascript-capitalize-first-letter/
