import React, { useState } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../../images/shareIcon.svg';

function ShareButton(props) {
  const { recipeLink, dataTestId } = props;
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
        data-testid={ dataTestId }
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

ShareButton.defaultProps = {
  dataTestId: 'share-btn',
};

ShareButton.propTypes = {
  dataTestId: PropTypes.string,
  recipeLink: PropTypes.string.isRequired,
};

export default ShareButton;
