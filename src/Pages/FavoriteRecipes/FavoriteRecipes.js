import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../Components/Button/Button';
import Header from '../../Components/Header/Header';
import { getFavorites } from '../../Helpers/localStorageSaves';
import ShareButton from '../../Components/ShareButton/ShareButton';
import FavoriteButton from '../../Components/FavoriteButton/FavoriteButton';

function FavoriteRecipes() {
  const [foods, setFoods] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [all, setAll] = useState([]);
  const [checkChange, setCheckChange] = useState(1);
  const [filter, setFilter] = useState('all');

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

  const renderAll = () => (
    all.map((recipe, index) => (
      <div key={ recipe.id }>
        <Link to={ `/${recipe.type}s/${recipe.id}` }>
          <img
            style={ { width: '300px' } }
            data-testid={ `${index}-horizontal-image` }
            alt={ recipe.name }
            src={ recipe.image }
          />
          <h2 data-testid={ `${index}-horizontal-name` }>
            { recipe.name }
          </h2>
        </Link>
        <h4 data-testid={ `${index}-horizontal-top-text` }>
          {recipe.nationality && `${recipe.nationality} - ${recipe.category}`}
          {recipe.alcoholicOrNot && `${recipe.alcoholicOrNot}`}
        </h4>
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
    ))
  );

  const renderFoods = () => (
    foods.map((food, index) => (
      <div key={ food.id }>
        <img
          data-testid={ `${index}-horizontal-image` }
          alt={ food.name }
          src={ food.image }
        />
        <h2 data-testid={ `${index}-horizontal-name` }>
          { food.name }
        </h2>
        <h4 data-testid={ `${index}-horizontal-top-text` }>
          {`${food.nationality} - ${food.category}`}
        </h4>
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
    ))
  );

  const renderDrinks = () => (
    drinks.map((drink, index) => (
      <div key={ drink.id }>
        <img
          data-testid={ `${index}-horizontal-image` }
          alt={ drink.name }
          src={ drink.image }
        />
        <h2 data-testid={ `${index}-horizontal-name` }>
          { drink.name }
        </h2>
        <h4>
          {drink.alcoholicOrNot}
        </h4>
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
    ))
  );

  return (
    <div>
      <Header title="Favorite Recipes" searchBtnExists />
      <Button
        name="foods"
        dataTest="filter-by-food-btn"
        text="foods"
        onClick={ ({ target }) => setFilter(target.name) }
      />
      <Button
        name="drinks"
        dataTest="filter-by-drink-btn"
        text="drinks"
        onClick={ ({ target }) => setFilter(target.name) }
      />
      <Button
        name="all"
        dataTest="filter-by-all-btn"
        text="all"
        onClick={ ({ target }) => setFilter(target.name) }
      />
      {all && (filter === 'all' && renderAll())}
      {foods && (filter === 'foods' && renderFoods())}
      {drinks && (filter === 'drinks' && renderDrinks())}
    </div>
  );
}

export default FavoriteRecipes;
