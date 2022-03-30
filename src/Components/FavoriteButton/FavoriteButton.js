import React, { useState } from 'react';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

function FavoriteButton() {
  const [disabled] = useState(true);

  return (
    <div>
      <button
        type="button"
        aria-label="Favorite button empty"
        src={ whiteHeartIcon }
        onClick={ () => handleNavigation('/drinks') }
      >
        <img src={ whiteHeartIcon } alt="imagem de um coração" />
      </button>

      <button
        type="button"
        aria-label="Favorite button filled"
        src={ blackHeartIcon }
        disabled={ disabled }
      >
        <img src={ blackHeartIcon } alt="imagem de um coração" />
      </button>
    </div>
  );
}

export default FavoriteButton;
