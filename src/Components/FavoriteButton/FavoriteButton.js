import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import { getFavorites,
  removeFavoriteRecipe,
  saveFavoriteRecipe } from '../../Helpers/localStorageSaves';

function FavoriteButton(props) {
  const [fav, setFav] = useState(false);
  const { id,
    type,
    nationality,
    category,
    alcoholicOrNot,
    name,
    callback,
    dataTest,
    image } = props;
  const recipeToSave = { id,
    type,
    nationality,
    category,
    alcoholicOrNot,
    name,
    image };

  useEffect(() => {
    const setFav1 = () => {
      const isFave = getFavorites()?.some((item) => item.id === id);
      if (isFave) {
        setFav(true);
      }
    };
    setFav1();
  }, []);

  const handleClick = () => {
    callback();
    const isFave = getFavorites()?.some((item) => item.id === id);
    if (isFave) {
      removeFavoriteRecipe(recipeToSave);
      console.log('aqui');
    } else {
      saveFavoriteRecipe(recipeToSave);
    }
    setFav(!fav);
  };

  const whiteBtn = () => (
    <button
      type="button"
      aria-label="Favorite button empty"
      data-testid="favorite-btn"
      src="../../images/whiteHeartIcon.svg"
      onClick={ handleClick }
    >
      <img src={ whiteHeartIcon } alt="imagem de um coração" />
    </button>
  );

  const blackBtn = () => (
    <button
      type="button"
      aria-label="Favorite button filled"
      src="../../images/blackHeartIcon.svg"
      onClick={ handleClick }
      data-testid={ dataTest || 'favorite-btn' }
    >
      <img src={ blackHeartIcon } alt="imagem de um coração" />
    </button>
  );

  return (
    <div>
      {fav ? blackBtn() : whiteBtn() }
    </div>
  );
}

FavoriteButton.defaultProps = {
  nationality: '',
  alcoholicOrNot: '',
  callback: () => {},
  dataTest: '',
};

FavoriteButton.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  nationality: PropTypes.string,
  category: PropTypes.string.isRequired,
  alcoholicOrNot: PropTypes.string,
  image: PropTypes.string.isRequired,
  callback: PropTypes.func,
  dataTest: PropTypes.string,
};

export default FavoriteButton;
