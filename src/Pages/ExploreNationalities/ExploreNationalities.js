import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../../Components/Header/Header';
import FooterMenu from '../../Components/FooterMenu/FooterMenu';
import getRecipes, { getNationalities, getByNationality } from '../../Helpers/API';
import Card from '../../Components/Card/Card';

function ExploreNationalities() {
  const [nationality, setNationality] = useState('All');
  const [nationalities, setNationalities] = useState([]);
  const [recipesByNationality, setRecipesByNationality] = useState([]);
  const MAX_LENGTH = 12;

  useEffect(() => {
    const getListNationalities = async () => {
      const { meals } = await getNationalities();

      setNationalities(meals);
    };

    getListNationalities();
  }, []);

  useEffect(() => {
    const getItems = async () => {
      if (nationality === 'All') {
        const apiNationalities = await getRecipes('meal', 'search', 's=');

        setRecipesByNationality(apiNationalities?.meals?.slice(0, MAX_LENGTH));
      } else {
        const apiNationality = await getByNationality(nationality);

        setRecipesByNationality(apiNationality?.meals?.slice(0, MAX_LENGTH));
      }
    };

    getItems();
  }, [nationality]);

  function onInputChange({ target }) {
    const { value } = target;

    setNationality(value);
  }

  return (
    <div>
      <Header title="Explore Nationalities" />

      <div>
        <select
          id="nationality"
          name="nationality"
          value={ nationality }
          onChange={ onInputChange }
          data-testid="explore-by-nationality-dropdown"
        >
          <option
            key="All"
            data-testid="All-option"
            value="All"
          >
            All
          </option>
          {nationalities
            .map((option, index) => (
              <option
                key={ index }
                data-testid={ `${option.strArea}-option` }
                value={ option.strArea }
              >
                {option.strArea}
              </option>
            ))}
        </select>
      </div>

      {recipesByNationality && recipesByNationality.map(
        ({ strMealThumb, strMeal, idMeal }, index) => (
          <Link to={ `/foods/${idMeal}` } key={ idMeal }>
            <Card
              key={ index }
              datatestRecipeCard={ `${index}-recipe-card` }
              datatestCardImage={ `${index}-card-img` }
              datatestCardName={ `${index}-card-name` }
              thumb={ strMealThumb }
              title={ strMeal }
            />
          </Link>
        ),
      )}

      <FooterMenu />
    </div>
  );
}

export default ExploreNationalities;
