import React, { useState } from 'react';
import ButtonComponent from '../../Components/Button/Button';
import DoneRecipeCard from '../../Components/DoneRecipeCard/DoneRecipesCard';
import Header from '../../Components/Header/Header';
import styles from './styles.module.css';

function DoneRecipes() {
  const [filterButton, setFilterButton] = useState('all');

  function handleFilterClick({ target }) {
    if (filterButton !== target.name) {
      setFilterButton(target.name);
    } else {
      setFilterButton('all');
    }
  }

  return (
    <div className={ styles.ButtonPage }>
      <Header title="Done Recipes" searchBtnExists />
      <div className={ styles.ButtonDiv }>
        <ButtonComponent
          name="all"
          text="All"
          dataTest="filter-by-all-btn"
          className={ styles.AllBtn }
          onClick={ (event) => handleFilterClick(event) }
          variant="orange2"
        />
        <ButtonComponent
          name="foods"
          text="Food"
          dataTest="filter-by-food-btn"
          className={ styles.AllBtn }
          onClick={ (event) => handleFilterClick(event) }
          variant="orange2"
        />
        <ButtonComponent
          name="drink"
          text="Drinks"
          dataTest="filter-by-drink-btn"
          className={ styles.AllBtn }
          onClick={ (event) => handleFilterClick(event) }
          variant="orange2"
        />
      </div>
      <div className={ styles.CardsDiv }>
        <DoneRecipeCard filter={ filterButton } />
      </div>

    </div>
  );
}

export default DoneRecipes;
