import React from 'react';
import { useHistory } from 'react-router-dom';
import { faMartiniGlass, faBowlRice, faCompass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'react-bootstrap';
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
      <Button
        variant="none"
        type="button"
        className={ styles.DrinkBtn }
        text="Drink"
        name="drink-btn"
        data-testid="drinks-bottom-btn"
        aria-label="Open Drinks"
        onClick={ () => handleNavigation('/drinks') }
        src={ drinkIcon }
      >
        <FontAwesomeIcon icon={ faMartiniGlass } />
      </Button>

      <Button
        variant="none"
        type="button"
        className={ styles.ExploreBtn }
        text="Explore"
        name="explore-btn"
        data-testid="explore-bottom-btn"
        aria-label="Open explore"
        onClick={ () => handleNavigation('/explore') }
        src={ exploreIcon }
      >
        <FontAwesomeIcon icon={ faCompass } />
      </Button>

      <Button
        variant="none"
        type="button"
        className={ styles.FoodBtn }
        text="Foods"
        name="food-btn"
        data-testid="food-bottom-btn"
        aria-label="Open foods"
        src={ mealIcon }
        onClick={ () => handleNavigation('/foods') }
      >
        <FontAwesomeIcon icon={ faBowlRice } />
      </Button>
    </footer>
  );
}

export default FooterMenu;
