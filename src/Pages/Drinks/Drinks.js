import React, { useContext, useEffect } from 'react';
import Header from '../../Components/Header/Header';
import FooterMenu from '../../Components/FooterMenu/FooterMenu';
import RecipesContext from '../../Context/RecipesContext';

function Drinks() {
  const { setSiteValue } = useContext(RecipesContext);

  useEffect(() => {
    setSiteValue('cocktail');
  }, []);

  return (
    <div>
      <Header
        title="Drinks"
      />
      <FooterMenu />
    </div>
  );
}

export default Drinks;
