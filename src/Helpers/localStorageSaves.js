const DONE_RECIPE = 'done';
const IN_PROGRES_RECIPE = 'inProgressRecipes';

localStorage.setItem('user', JSON.stringify({ email: 'teste@trybe.com' }));

export const saveTokenDrink = () => {
  localStorage.setItem('cocktailsToken', 1);
};

export const saveEmail = (email) => {
  localStorage.setItem('user', JSON.stringify({ email }));
};

export const getEmail = () => JSON.parse(localStorage.getItem('user'));

export const readDoneRecipes = () => JSON.parse(localStorage.getItem(DONE_RECIPE));

const saveDoneRecipes = (done) => localStorage
  .setItem(DONE_RECIPE, JSON.stringify(done));

export const addDoneRecipe = (doneRecipe) => {
  if (doneRecipe) {
    const done = readDoneRecipes() || [];
    saveDoneRecipes([...doneRecipe, done]);
  }
};

// [{
//   id: id-da-receita,
//   type: comida-ou-bebida,
//   nationality: nacionalidade-da-receita-ou-texto-vazio,
//   category: categoria-da-receita-ou-texto-vazio,
//   alcoholicOrNot: alcoholic-ou-non-alcoholic-ou-texto-vazio,
//   name: nome-da-receita,
//   image: imagem-da-receita,
//   doneDate: quando-a-receita-foi-concluida,
//   tags: array-de-tags-da-receita-ou-array-vazio
// }]

// function saveDoneRecipeInLocalStorage(recipeArr) {
//   if (type === 'Meal') {
//     const { idMeal: id, strArea: nationality, strCategory: category,
//       strMeal: name, strMealThumb: image, strTags: tags } = recipeArr;
//     const lsObj = {
//       id,
//       type: 'food',
//       nationality,
//       category,
//       alcoholicOrNot: '',
//       name,
//       image,
//       doneDate: '',
//       tags: tags || '' };
//     console.log(lsObj);
//     // addDoneRecipe(lsObj);
//   } else {
//     // console.log(recipeArr);
//   }
// }

// function handleDoneButton(recipeArr) {
//   saveDoneRecipeInLocalStorage(recipeArr);
// }

export const readInProgressRecipes = () => JSON.parse(
  localStorage.getItem(IN_PROGRES_RECIPE),
);

if (!JSON.parse(localStorage.getItem('inProgressRecipes'))) {
  localStorage.setItem('inProgressRecipes', JSON.stringify({
    cocktails: {},
    meals: {},
  }));
}

const saveInProgressRecipes = (inProgressRecipe) => localStorage
  .setItem(IN_PROGRES_RECIPE, JSON.stringify(inProgressRecipe));

export const addInProgressRecipe = (inProgressRecipeRecipe) => {
  if (inProgressRecipeRecipe) {
    const inProgress = readInProgressRecipes() || {};
    saveInProgressRecipes([...inProgressRecipeRecipe, inProgress]);
  }
};

export const saveTokenFood = () => {
  localStorage.setItem('mealsToken', 1);
};

export const getProgress = () => JSON.parse(localStorage.getItem('inProgressRecipes'));

if (!getProgress()) {
  localStorage.setItem('inProgressRecipes', JSON.stringify({}));
}

export const saveInProgressRecipe = (name, arr) => {
  const atualObj = getProgress();
  atualObj[name] = arr;
  localStorage.setItem('inProgressRecipes', JSON.stringify(atualObj));
};
