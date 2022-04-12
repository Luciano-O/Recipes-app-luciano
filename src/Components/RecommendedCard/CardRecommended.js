import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../../Context/RecipesContext';
import CardComponent from '../Card/Card';

function CardRecommended(props) {
  const { match } = props;
  const pagePath = match.params;
  const { type: pageType } = pagePath;
  const { recommended } = useContext(RecipesContext);
  const history = useHistory();
  let type;
  if (pageType === 'foods') {
    type = 'Meal';
  } else {
    type = 'Drink';
  }
  function test() {
    let recomendations;
    if (type === 'Meal') {
      recomendations = recommended.map((item, i3) => (
        <CardComponent
          key={ i3 }
          datatestRecipeCard={ `${i3}-recomendation-card` }
          datatestCardImage={ `${i3}-recomendation-img` }
          datatestCardName={ `${i3}-recomendation-title` }
          title={ item.strDrink }
          thumb={ item.strDrinkThumb }
          category={ item.strAlcoholic }
          hidden={ false }
          onClick={ () => history.push(`/drinks/${item.idDrink}`) }
        />
      ));
      return recomendations;
    }
    recomendations = recommended.map((item, i3) => (
      <CardComponent
        key={ i3 }
        datatestRecipeCard={ `${i3}-recomendation-card` }
        datatestCardImage={ `${i3}-recomendation-img` }
        datatestCardName={ `${i3}-recomendation-title` }
        title={ item.strMeal }
        thumb={ item.strMealThumb }
        category={ item.strCategory }
        hidden={ false }
        onClick={ () => history.push(`/foods/${item.idMeal}`) }
      />
    ));
    return recomendations;
  }

  return (
    <div>{test()}</div>
  );
}

CardRecommended.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
      type: PropTypes.string,
    }),
  }).isRequired,
};

export default CardRecommended;
