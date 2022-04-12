import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
// import CardComponent from '../../Components/Card/Card';
// import ButtonComponent from '../../Components/Button/Button';
import RecipesContext from '../../Context/RecipesContext';
import Header from '../../Components/Header/Header';
import FooterMenu from '../../Components/FooterMenu/FooterMenu';
import getRecipes from '../../Helpers/API';
import styles from './Styles.module.css';

const MAX_LENGTH = 12;
const MAX_LENGTH_C = 5;

function Drinks() {
  const history = useHistory();
  const [categories, setCategories] = useState();
  const [categoryButtonActive, setCategoryButtonActive] = useState(false);
  const [categoryAllButtonActive, setCategoryAllButtonActive] = useState(true);
  const {
    setSiteValue,
    siteValue,
    setApiValue,
    finalItems,
    setFinalItems,
    setFirst12,
    recipesByIngridients,
  } = useContext(RecipesContext);

  function handleCardClick(id) {
    history.push(`/drinks/${id}`);
  }

  const handleCategoryClick = async ({ target }) => {
    if (categoryButtonActive !== target.name) {
      const { drinks } = await getRecipes(
        siteValue,
        'filter',
        `c=${target.name}`,
      );
      setApiValue(drinks);
      setFinalItems(drinks?.slice(0, MAX_LENGTH));
      setCategoryButtonActive(target.name);
      setCategoryAllButtonActive(false);
    } else {
      const final = await getRecipes('cocktail', 'search', 's=');
      setApiValue(final);
      localStorage.setItem(
        'first12',
        JSON.stringify(final.drinks.slice(0, MAX_LENGTH)),
      );
      setFirst12(final?.drinks?.slice(0, MAX_LENGTH));
      setFinalItems(final?.drinks?.slice(0, MAX_LENGTH));
      setCategoryButtonActive('');
      setCategoryAllButtonActive(true);
    }
  };

  const handleAllCategoryClick = async () => {
    const final = await getRecipes('cocktail', 'search', 's=');
    setApiValue(final);
    localStorage.setItem(
      'first12',
      JSON.stringify(final.drinks.slice(0, MAX_LENGTH)),
    );
    setFirst12(final?.drinks?.slice(0, MAX_LENGTH));
    setFinalItems(final?.drinks?.slice(0, MAX_LENGTH));
    setCategoryButtonActive('');
  };

  useEffect(() => {
    setSiteValue('cocktail');
    const bringItens = async () => {
      if (!recipesByIngridients) {
        const final = await getRecipes('cocktail', 'search', 's=');
        setApiValue(final);
        setFirst12(final?.drinks?.slice(0, MAX_LENGTH));
        setFinalItems(final?.drinks?.slice(0, MAX_LENGTH));
      } else {
        const final = await getRecipes(
          'cocktail',
          'filter',
          `i=${recipesByIngridients}`,
        );
        setApiValue(final);
        setFirst12(final?.drinks?.slice(0, MAX_LENGTH));
        setFinalItems(final?.drinks?.slice(0, MAX_LENGTH));
      }
    };
    const bringCategories = async () => {
      const final = await getRecipes('cocktail', 'list', 'c=list');
      setCategories(final.drinks.slice(0, MAX_LENGTH_C));
    };
    bringCategories();
    bringItens();
  }, []);

  return (
    <div className={ styles.drinks_container }>
      <Header title="Drinks" />
      <div className={ styles.DrinksButtonGroup }>
        <Button
          data-testid="All-category-filter"
          onClick={ handleAllCategoryClick }
          variant="orange2"
          name="all-category-btn"
          active={ categoryAllButtonActive }
        >
          All
        </Button>
        {/* <ButtonComponent
          dataTest="All-category-filter"
          onClick={ handleAllCategoryClick }
          name="all-category-btn"
          text="All"
          variant="none"
        /> */}
        {categories
          && categories.map(({ strCategory }) => (
            <Button
              key={ strCategory }
              data-testid={ `${strCategory}-category-filter` }
              onClick={ handleCategoryClick }
              variant="orange2"
              name={ strCategory }
            >
              {strCategory}
            </Button>

            // <ButtonComponent
            //   key={ strCategory }
            //   name={ strCategory }
            //   onClick={ handleCategoryClick }
            //   dataTest={ `${strCategory}-category-filter` }
            //   text={ strCategory }
            //   variant="none"
            // />
          ))}
      </div>
      <div className={ styles.DrinksCardDiv }>
        {finalItems
          && finalItems.map(
            ({ idDrink, strDrinkThumb, strDrink, strAlcoholic }, index) => (
              <Card
                key={ idDrink }
                onClick={ () => {
                  handleCardClick(idDrink);
                } }
                aria-hidden="true"
                className={ styles.Card }
                data-testid={ `${index}-recipe-card` }
              >
                <Card.Img
                  variant="top"
                  src={ strDrinkThumb }
                  data-testid={ `${index}-card-img` }
                  alt={ strDrink }
                />
                <Card.Body>
                  <Card.Text>
                    <span>{strAlcoholic}</span>
                  </Card.Text>

                  <Card.Title
                    className={ styles.card_title }
                    data-testid={ `${index}-card-name` }
                  >
                    {strDrink}
                  </Card.Title>
                </Card.Body>
              </Card>

              // <CardComponent
              //   key={ index }
              //   onClick={ () => handleCardClick(idDrink) }
              //   datatestRecipeCard={ `${index}-recipe-card` }
              //   thumb={ strDrinkThumb }
              //   title={ strDrink }
              //   datatestCardImage={ `${index}-card-img` }
              //   datatestCardName={ `${index}-card-name` }
              // />
            ),
          )}
      </div>
      <FooterMenu />
    </div>
  );
}

export default Drinks;
