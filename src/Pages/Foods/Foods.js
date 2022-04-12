import React, { useContext, useEffect, useState } from 'react';
// import { ButtonGroup } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
// import CardComponent from '../../Components/Card/Card';
// import ButtonComponent from '../../Components/Button/Button';
import RecipesContext from '../../Context/RecipesContext';
import Header from '../../Components/Header/Header';
import FooterMenu from '../../Components/FooterMenu/FooterMenu';
import getRecipes from '../../Helpers/API';
import styles from './styles.module.css';

const MAX_LENGTH = 12;
const MAX_LENGTH_C = 5;

function Foods() {
  const history = useHistory();
  // const [atualCategory, setAtualCategory] = useState();
  const [categories, setCategories] = useState();
  const [categoryButtonActive, setCategoryButtonActive] = useState('');
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

  const handleCategoryClick = async ({ target }) => {
    if (categoryButtonActive !== target.name) {
      const { meals } = await getRecipes(
        siteValue,
        'filter',
        `c=${target.name}`,
      );
      setApiValue(meals);
      setFinalItems(meals.slice(0, MAX_LENGTH));
      setCategoryButtonActive(target.name);
      setCategoryAllButtonActive(false);
    } else {
      const final = await getRecipes('meal', 'search', 's=');
      setApiValue(final);
      setFirst12(final?.meals?.slice(0, MAX_LENGTH));
      setFinalItems(final?.meals?.slice(0, MAX_LENGTH));
      setCategoryButtonActive('');
      setCategoryAllButtonActive(true);
    }
  };

  const handleAllCategoryClick = async () => {
    const final = await getRecipes('meal', 'search', 's=');
    setApiValue(final);
    setFirst12(final?.meals?.slice(0, MAX_LENGTH));
    setFinalItems(final?.meals?.slice(0, MAX_LENGTH));
    setCategoryButtonActive('');
  };

  function handleCardClick(id) {
    history.push(`/foods/${id}`);
  }

  useEffect(() => {
    setSiteValue('meal');
    const bringItens = async () => {
      if (!recipesByIngridients) {
        const final = await getRecipes('meal', 'search', 's=');
        setApiValue(final);
        setFirst12(final?.meals?.slice(0, MAX_LENGTH));
        setFinalItems(final?.meals?.slice(0, MAX_LENGTH));
      } else {
        const final = await getRecipes(
          'meal',
          'filter',
          `i=${recipesByIngridients}`,
        );
        setApiValue(final);
        setFirst12(final?.meals?.slice(0, MAX_LENGTH));
        setFinalItems(final?.meals?.slice(0, MAX_LENGTH));
      }
    };
    const bringCategories = async () => {
      const final = await getRecipes('meal', 'list', 'c=list');
      setCategories(final?.meals?.slice(0, MAX_LENGTH_C));
    };
    bringCategories();
    bringItens();
  }, []);

  return (
    <div className={ styles.foods_container }>
      <Header title="Foods" />
      <div
        className={ styles.FoodsButtonGroup }
        // aria-label="First group"
        // size="sm"
      >
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
      <div className={ styles.FoodsCardDiv }>
        {finalItems
          && finalItems.map(
            ({ idMeal, strMealThumb, strMeal, strCategory }, index) => (
              <Card
                key={ idMeal }
                onClick={ () => {
                  handleCardClick(idMeal);
                } }
                aria-hidden="true"
                className={ styles.Card }
                data-testid={ `${index}-recipe-card` }
              >
                <Card.Img
                  variant="top"
                  src={ strMealThumb }
                  data-testid={ `${index}-card-img` }
                  alt={ strMeal }
                />
                <Card.Body>
                  <Card.Text>
                    <span>{strCategory}</span>
                  </Card.Text>

                  <Card.Title
                    className={ styles.card_title }
                    data-testid={ `${index}-card-name` }
                  >
                    {strMeal}
                  </Card.Title>
                </Card.Body>
              </Card>
            ),
            // <CardComponent
            //   key={ idMeal }
            //   onClick={ () => handleCardClick(idMeal) }
            //   datatestRecipeCard={ `${index}-recipe-card` }
            //   datatestCardImage={ `${index}-card-img` }
            //   datatestCardName={ `${index}-card-name` }
            //   thumb={ strMealThumb }
            //   title={ strMeal }
            //   size={ { width: '10rem' } }
            // />
          )}
      </div>
      <FooterMenu />
    </div>
  );
}

export default Foods;
