import React, { useContext } from 'react';
import { ButtonGroup, ToggleButton, Button } from 'react-bootstrap';
import RecipesContext from '../../Context/RecipesContext';

function Search() {
  const { radioValue,
    setRadioValue,
    setApiValue,
    siteValue } = useContext(RecipesContext);

  const radios = [
    { name: 'Ingredient', dataTest: 'ingredient', value: 'ingredient' },
    { name: 'Name', dataTest: 'name', value: 'name' },
    { name: 'First-Letter', dataTest: 'first-letter', value: 'first-letter' },
  ];

  function handleSearchClick() {
    switch (radioValue) {
    case 'ingredient':
      setApiValue(getRecipes(siteValue, 'filter', `i=${ingrediente}`));
      break;
    case 'name':
      setApiValue(getRecipes(siteValue, 'search', `s=${nome}`));
      break;
    case FIRST_LETTER:
      setApiValue(getRecipes(siteValue, 'search', `f=${primeiraLetra}`));
      break;
    default:
      break;
    }
  }

  return (
    <>
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
        onClick={ () => handleSearchClick }
      >
        Search
      </Button>
    </>

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
