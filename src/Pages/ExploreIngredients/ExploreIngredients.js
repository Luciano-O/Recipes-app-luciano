import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../Components/Header/Header';
import FooterMenu from '../../Components/FooterMenu/FooterMenu';
import getRecipes from '../../Helpers/API';
import styles from './styles.module.css';
import RecipesContext from '../../Context/RecipesContext';
import Card from '../../Components/Card/Card';

function ExploreIngredients({ match }) {
  const MAX_LENGTH = 12;
  const history = useHistory();
  const { setIngredientsApi,
    ingredientsApi,
    setRecipesByIngridients,
  } = useContext(RecipesContext);
  const pageTitle = match.params.type;

  useEffect(() => {
    const bringIgredients = async () => {
      if (pageTitle === 'foods') {
        const { meals } = await getRecipes('meal', 'list', 'i=list');
        setIngredientsApi(meals?.slice(0, MAX_LENGTH));
      } else {
        const { drinks } = await getRecipes('cocktail', 'list', 'i=list');
        setIngredientsApi(drinks?.slice(0, MAX_LENGTH));
      }
    };
    bringIgredients();
  }, []);

  function handleClick(ing) {
    if (pageTitle === 'foods') {
      setRecipesByIngridients(ing);
      history.push('/foods');
    } else {
      setRecipesByIngridients(ing);
      history.push('/drinks');
    }
  }

  return (
    <div className={ styles.explore_ingred_container }>
      <Header title="Explore Ingredients" searchBtnExists />
      {ingredientsApi.length && ingredientsApi.map((ing, index) => {
        let cardIngredient;
        if (pageTitle === 'foods') {
          cardIngredient = (
            <Card
              key={ index }
              onClick={ () => handleClick(ing.strIngredient) }
              datatestRecipeCard={ `${index}-ingredient-card` }
              thumb={ `https://www.themealdb.com/images/ingredients/${ing.strIngredient}-Small.png` }
              title={ ing.strIngredient }
              datatestCardImage={ `${index}-card-img` }
              datatestCardName={ `${index}-card-name` }
            />
          );
        } else if (pageTitle === 'drinks') {
          cardIngredient = (
            <Card
              key={ index }
              onClick={ () => handleClick(ing.strIngredient1) }
              datatestRecipeCard={ `${index}-ingredient-card` }
              thumb={ `https://www.thecocktaildb.com/images/ingredients/${ing.strIngredient1}-Small.png` }
              title={ ing.strIngredient1 }
              datatestCardImage={ `${index}-card-img` }
              datatestCardName={ `${index}-card-name` }
            />
          );
        }
        return cardIngredient;
      })}
      <FooterMenu />
    </div>
  );
}

ExploreIngredients.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      type: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ExploreIngredients;
