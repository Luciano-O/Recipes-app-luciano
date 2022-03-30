import React from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../../images/shareIcon.svg';

function ShareButton(props) {
  const { recipeLink } = props;

  function handleShare(link) {
    if (link) {
      alert('Link copied!');
    }
  }

  return (
    <div>
      <button
        type="button"
        aria-label="Share button"
        src={ shareIcon }
        onClick={ () => handleShare(recipeLink) }
      >
        <img src={ shareIcon } alt="ícone de compartilhar" />
      </button>
    </div>
  );
}

ShareButton.propTypes = {
  recipeLink: PropTypes.string.isRequired,
};

export default ShareButton;
