import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ButtonComponent from '../../Components/Button/Button';
import Header from '../../Components/Header/Header';
import { getFavorites } from '../../Helpers/localStorageSaves';
import ShareButton from '../../Components/ShareButton/ShareButton';
import FavoriteButton from '../../Components/FavoriteButton/FavoriteButton';
import styles from './styles.module.css';

function FavoriteRecipes() {
  const [foods, setFoods] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [all, setAll] = useState([]);
  const [checkChange, setCheckChange] = useState(1);
  const [filter, setFilter] = useState('all');
  const history = useHistory();

  useEffect(() => {
    const bringFavorites = () => {
      const foods1 = getFavorites().filter((item) => item.type === 'food');
      const drinks1 = getFavorites().filter((item) => item.type === 'drink');
      setAll([...foods1, ...drinks1]);
      setFoods(foods1);
      setDrinks(drinks1);
    };
    bringFavorites();
  }, [checkChange]);

  function handleClick(type, id) {
    if (type === 'food') {
      return history.push(`/foods/${id}`);
    } if (type === 'drink') {
      history.push(`/drinks/${id}`);
    }
  }

  const renderAll = () => (
    all.map((recipe, index) => (
      <div key={ recipe.id } className={ styles.CardDiv }>
        <div className={ styles.CardImgDiv }>
          <img
            data-testid={ `${index}-horizontal-image` }
            alt={ recipe.name }
            src={ recipe.image }
            aria-hidden
            onClick={ () => handleClick(recipe.type, recipe.id) }
          />
        </div>
        <div className={ styles.CardInfoDiv }>
          <p
            data-testid={ `${index}-horizontal-top-text` }
            className={ styles.CardInfoCategoryText }
          >
            {recipe.nationality && `${recipe.nationality} - ${recipe.category}`}
            {recipe.alcoholicOrNot && `${recipe.alcoholicOrNot}`}
          </p>
          <p
            data-testid={ `${index}-horizontal-name` }
            className={ styles.CardInfoTitleText }
            aria-hidden
            onClick={ () => handleClick(recipe.type, recipe.id) }
          >
            { recipe.name }
          </p>
          <div className={ styles.CardButtons }>
            <ShareButton
              recipeLink={ `http://localhost:3000/${recipe.type}s/${recipe.id}` }
              dataTest={ `${index}-horizontal-share-btn` }
            />
            <FavoriteButton
              { ...recipe }
              callback={ () => setCheckChange(checkChange + 1) }
              dataTest={ `${index}-horizontal-favorite-btn` }
            />
          </div>
        </div>
      </div>
    ))
  );

  const renderFoods = () => (
    foods.map((food, index) => (
      <div key={ food.id } className={ styles.CardDiv }>
        <div className={ styles.CardImgDiv }>
          <img
            data-testid={ `${index}-horizontal-image` }
            alt={ food.name }
            src={ food.image }
            aria-hidden
            onClick={ () => handleClick('food', food.id) }
          />
        </div>
        <div className={ styles.CardInfoDiv }>
          <p
            className={ styles.CardInfoCategoryText }
            data-testid={ `${index}-horizontal-top-text` }
          >
            {`${food.nationality} - ${food.category}`}
          </p>
          <p
            className={ styles.CardInfoTitleText }
            data-testid={ `${index}-horizontal-name` }
            aria-hidden
            onClick={ () => handleClick('food', food.id) }
          >
            { food.name }
          </p>
          <div className={ styles.CardButtons }>
            <ShareButton
              recipeLink={ `http://localhost:3000/foods/${food.id}` }
              dataTest={ `${index}-horizontal-share-btn` }
            />
            <FavoriteButton
              { ...food }
              callback={ () => setCheckChange(checkChange + 1) }
              dataTest={ `${index}-horizontal-favorite-btn` }
            />
          </div>
        </div>
      </div>
    ))
  );

  const renderDrinks = () => (
    drinks.map((drink, index) => (
      <div key={ drink.id } className={ styles.CardDiv }>
        <div className={ styles.CardImgDiv }>
          <img
            data-testid={ `${index}-horizontal-image` }
            alt={ drink.name }
            src={ drink.image }
            aria-hidden
            onClick={ () => handleClick('drink', drink.id) }
          />
        </div>
        <div className={ styles.CardInfoDiv }>
          <p
            className={ styles.CardInfoCategoryText }
            data-testid={ `${index}-horizontal-top-text` }
          >
            {drink.alcoholicOrNot}
          </p>
          <p
            className={ styles.CardInfoTitleText }
            data-testid={ `${index}-horizontal-name` }
            aria-hidden
            onClick={ () => handleClick('drink', drink.type) }
          >
            { drink.name }
          </p>
          <div className={ styles.CardButtons }>
            <ShareButton
              recipeLink={ `http://localhost:3000/drinks/${drink.id}` }
              dataTest={ `${index}-horizontal-share-btn` }
            />
            <FavoriteButton
              { ...drink }
              callback={ () => setCheckChange(checkChange + 1) }
              dataTest={ `${index}-horizontal-favorite-btn` }
            />
          </div>
        </div>
      </div>
    ))
  );

  return (
    <div className={ styles.FavoritesPage }>
      <Header title="Favorite Recipes" searchBtnExists />
      <div className={ styles.ButtonDiv }>
        <ButtonComponent
          name="foods"
          dataTest="filter-by-food-btn"
          text="foods"
          onClick={ ({ target }) => setFilter(target.name) }
          variant="orange2"
        />
        <ButtonComponent
          name="drinks"
          dataTest="filter-by-drink-btn"
          text="drinks"
          onClick={ ({ target }) => setFilter(target.name) }
          variant="orange2"
        />
        <ButtonComponent
          name="all"
          dataTest="filter-by-all-btn"
          text="all"
          onClick={ ({ target }) => setFilter(target.name) }
          variant="orange2"
        />
      </div>
      <div className={ styles.CardsDiv }>
        {all && (filter === 'all' && renderAll())}
        {foods && (filter === 'foods' && renderFoods())}
        {drinks && (filter === 'drinks' && renderDrinks())}
      </div>
    </div>
  );
}

export default FavoriteRecipes;
