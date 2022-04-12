import React, { useState } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../../images/shareIcon.svg';
import styles from './styles.module.css';

function ShareButton(props) {
  const { recipeLink, dataTest } = props;
  const [clicked, setClicked] = useState(false);

  function handleShare(link) {
    const TIME = 3000;
    navigator.clipboard.writeText(link);
    setClicked(true);
    setTimeout(() => { setClicked(false); }, TIME);
  }
  return (
    <>
      <button
        type="button"
        aria-label="Share button"
        data-testid={ dataTest }
        src={ shareIcon }
        onClick={ () => handleShare(recipeLink) }
      >
        <img src={ shareIcon } alt="ícone de compartilhar" />
      </button>
      {clicked
      && <p className={ styles.LinkCopied }>Link copied!</p>}
    </>
  );
}

ShareButton.defaultProps = {
  dataTest: 'share-btn',
};

ShareButton.propTypes = {
  recipeLink: PropTypes.string.isRequired,
  dataTest: PropTypes.string,
};

export default ShareButton;
