import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [radioValue, setRadioValue] = useState('');
  const [apiValue, setApiValue] = useState({});
  const [siteValue, setSiteValue] = useState('meal');

  const objValue = {
    radioValue,
    setRadioValue,
    apiValue,
    setApiValue,
    siteValue,
    setSiteValue,
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
