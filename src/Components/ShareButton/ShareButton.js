import React, { useState } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../../images/shareIcon.svg';

function ShareButton(props) {
  const { recipeLink, dataTest } = props;
  const [clicked, setClicked] = useState(false);

  function handleShare(link) {
    const TIME = 5000;
    navigator.clipboard.writeText(link);
    setClicked(true);
    setTimeout(() => { setClicked(false); }, TIME);
  }

  return (
    <div>
      <button
        type="button"
        aria-label="Share button"
        data-testid={ dataTest || 'share-btn' }
        src={ shareIcon }
        onClick={ () => handleShare(recipeLink) }
      >
        <img src={ shareIcon } alt="ícone de compartilhar" />
      </button>
      {clicked
      && <p>Link copied!</p>}
    </div>
  );
}

ShareButton.propTypes = {
  recipeLink: PropTypes.string.isRequired,
  dataTest: PropTypes.string.isRequired,
};

export default ShareButton;
