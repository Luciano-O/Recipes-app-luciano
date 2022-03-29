import React, { useContext } from 'react';
import { ButtonGroup, ToggleButton, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../../Context/RecipesContext';
import getRecipes from '../../Helpers/API';

const FIRST_LETTER = 'first-letter';

function Search() {
  const history = useHistory();
  const { radioValue,
    setRadioValue,
    setApiValue,
    siteValue,
    searchValue,
    setSearchValue } = useContext(RecipesContext);

  const radios = [
    { name: 'Ingredient', dataTest: 'ingredient', value: 'ingredient' },
    { name: 'Name', dataTest: 'name', value: 'name' },
    { name: 'First-Letter', dataTest: FIRST_LETTER, value: FIRST_LETTER },
  ];

  function checkNumberOfItems(api) {
    if (api?.meals?.length === 1) {
      console.log('entrou no if');
      const mealId = api?.meals[0]?.idMeal;
      setApiValue(api);
      history.push(`/foods/${mealId}`);
    } else if (api?.drinks.length === 1) {
      const drinkId = api?.drinks[0]?.idDrink;
      history.push(`/drinks/${drinkId}`);
    }
  }

  async function handleSearchClick() {
    switch (radioValue) {
    case 'ingredient':
      { const apiIngredient = await getRecipes(siteValue, 'filter', `i=${searchValue}`);
        checkNumberOfItems(apiIngredient);
        setApiValue(apiIngredient); }
      break;
    case 'name':
      { const apiName = await getRecipes(siteValue, 'search', `s=${searchValue}`);
        checkNumberOfItems(apiName);
        setApiValue(apiName); }
      break;
    case FIRST_LETTER:
      if (searchValue.length !== 1) {
        global.alert('Your search must have only 1 (one) character');
      } else {
        const apiFirstLetter = await getRecipes(siteValue, 'search', `f=${searchValue}`);
        checkNumberOfItems(apiFirstLetter);
        setApiValue(apiFirstLetter);
      }
      break;
    default:
      break;
    }
  }

  function handleSearchValue({ target }) {
    setSearchValue(target.value);
  }

  return (
    <div>
      <input
        type="text"
        data-testid="search-input"
        placeholder="Pesquisar"
        onChange={ handleSearchValue }
      />
      <ButtonGroup>
        {radios.map((radio, idx) => (
          <ToggleButton
            key={ idx }
            id={ `radio-${idx}` }
            type="radio"
            variant={ idx % 1 ? 'outline-success' : 'outline-primary ' }
            name="radio"
            value={ radio.value }
            checked={ radioValue === radio.value }
            onChange={ (e) => setRadioValue(e.currentTarget.value) }
            data-testid={ `${radio.dataTest}-search-radio` }
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
      <Button
        variant="primary"
        data-testid="exec-search-btn"
        onClick={ () => handleSearchClick() }
      >
        Search
      </Button>
    </div>

  //     <div onChange={ onChangeValue }>
  //       <input
  //         type="radio"
  //         value="ingredient"
  //         name="search-type"
  //         data-testid="ingredient-search-radio"
  //       />
  //       Ingredient
  //       <input
  //         type="radio"
  //         value="name"
  //         name="tysearch-typepe"
  //         data-testid="name-search-radio"
  //       />
  //       Name
  //       <input
  //         type="radio"
  //         value="first-letter"
  //         name="search-type"
  //         data-testid="first-letter-search-radio"
  //       />
  //       First Letter
  //     </div>
  );
}

export default Search;
