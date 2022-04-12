import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../Components/Header/Header';
import FooterMenu from '../../Components/FooterMenu/FooterMenu';
import getRecipes, { getNationalities, getByNationality } from '../../Helpers/API';
import CardComponent from '../../Components/Card/Card';
import styles from './styles.module.css';

function ExploreNationalities() {
  const history = useHistory();
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

  function handleClick(id) {
    history.push(`/foods/${id}`);
  }

  return (
    <div className={ styles.NationalitiesPage }>
      <Header title="Explore Nationalities" />

      <div className={ styles.NationalitiesSelect }>
        <select
          className={ styles.Select }
          id="nationality"
          name="nationality"
          value={ nationality }
          onChange={ onInputChange }
          data-testid="explore-by-nationality-dropdown"
        >
          <option
            className={ styles.Option }
            key="All"
            data-testid="All-option"
            value="All"
          >
            All
          </option>
          {nationalities
            .map((option, index) => (
              <option
                className={ styles.Option }
                key={ index }
                data-testid={ `${option.strArea}-option` }
                value={ option.strArea }
              >
                {option.strArea}
              </option>
            ))}
        </select>
      </div>

      <div className={ styles.NationalitiesCard }>
        {recipesByNationality && recipesByNationality.map(
          ({ strMealThumb, strMeal, idMeal }, index) => (
            <CardComponent
              key={ index }
              onClick={ () => handleClick(idMeal) }
              datatestRecipeCard={ `${index}-recipe-card` }
              datatestCardImage={ `${index}-card-img` }
              datatestCardName={ `${index}-card-name` }
              thumb={ strMealThumb }
              title={ strMeal }
            />
          ),
        )}
      </div>

      <FooterMenu />
    </div>
  );
}

export default ExploreNationalities;
