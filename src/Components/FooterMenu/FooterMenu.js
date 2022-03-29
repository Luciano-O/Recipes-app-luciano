import React from 'react';
import { useHistory } from 'react-router-dom';

import styles from './styles.module.css';
import drinkIcon from '../../images/drinkIcon.svg';
import exploreIcon from '../../images/exploreIcon.svg';
import mealIcon from '../../images/mealIcon.svg';

function FooterMenu() {
  const history = useHistory();

  function handleNavigation(path) {
    history.push(path);
  }

  return (
    <footer data-testid="footer" className={ styles.footer_menu }>
      <button
        type="button"
        aria-label="Open drinks"
        data-testid="drinks-bottom-btn"
        src={ drinkIcon }
        onClick={ () => handleNavigation('/drinks') }
      >
        <img src={ drinkIcon } alt="imagem de um drink" />
      </button>

      <button
        type="button"
        data-testid="explore-bottom-btn"
        aria-label="Open explore"
        src={ exploreIcon }
        onClick={ () => handleNavigation('/explore') }
      >
        <img src={ exploreIcon } alt="imagem de explorar" />
      </button>

      <button
        type="button"
        data-testid="food-bottom-btn"
        aria-label="Open foods"
        src={ mealIcon }
        onClick={ () => handleNavigation('/foods') }
      >
        <img src={ mealIcon } alt="imagem de um talhere" />
      </button>
    </footer>
  );
}

export default FooterMenu;
