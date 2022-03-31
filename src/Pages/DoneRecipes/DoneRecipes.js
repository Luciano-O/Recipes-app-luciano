import React from 'react';
import Button from '../../Components/Button/Button';
import Header from '../../Components/Header/Header';
import styles from './styles.module.css';

function DoneRecipes() {
  return (
    <div>
      <div className={ styles.ButtonDiv }>
        <Button text="All" dataTest="filter-by-all-btn" className={ styles.AllBtn } />
        <Button text="Food" dataTest="filter-by-food-btn" className={ styles.AllBtn } />
        <Button
          text="Drinks"
          dataTest="filter-by-drink-btn"
          className={ styles.AllBtn }
        />
      </div>
      <div className={ styles.CardsDiv } />
      <Header title="Done Recipes" searchBtnExists />
    </div>
  );
}

export default DoneRecipes;
