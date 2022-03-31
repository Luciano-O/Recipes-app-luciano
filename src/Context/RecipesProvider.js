import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [radioValue, setRadioValue] = useState('ingredient');
  const [apiValue, setApiValue] = useState({});
  const [finalItems, setFinalItems] = useState();
  const [siteValue, setSiteValue] = useState('meal');
  const [searchValue, setSearchValue] = useState('');
  const [first12, setFirst12] = useState([]);
  const [ingredientsApi, setIngredientsApi] = useState({});
  const [recipesByIngridients, setRecipesByIngridients] = useState('');

  const objValue = {
    radioValue,
    finalItems,
    setFinalItems,
    setRadioValue,
    apiValue,
    setApiValue,
    siteValue,
    setSiteValue,
    searchValue,
    setSearchValue,
    first12,
    setFirst12,
    ingredientsApi,
    setIngredientsApi,
    recipesByIngridients,
    setRecipesByIngridients,
  };

  return (
    <RecipesContext.Provider value={ objValue }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
