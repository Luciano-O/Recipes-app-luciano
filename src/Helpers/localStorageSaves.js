const DONE_RECIPE = 'done';
const IN_PROGRES_RECIPE = 'inProgressRecipes';

// Save tokens
export const saveTokenDrink = () => {
  localStorage.setItem('cocktailsToken', 1);
};

export const saveTokenFood = () => {
  localStorage.setItem('mealsToken', 1);
};
//

// Email
export const getEmail = () => JSON.parse(localStorage.getItem('user'));

if (!getEmail) {
  localStorage.setItem('user', JSON.stringify({ email: 'teste@trybe.com' }));
}

export const saveEmail = (email) => {
  localStorage.setItem('user', JSON.stringify({ email }));
};
//

// Done Recipes
export const readDoneRecipes = () => JSON.parse(localStorage.getItem(DONE_RECIPE));

const saveDoneRecipes = (done) => localStorage
  .setItem(DONE_RECIPE, JSON.stringify(done));

export const addDoneRecipe = (doneRecipe) => {
  if (doneRecipe) {
    const done = readDoneRecipes() || [];
    saveDoneRecipes([...doneRecipe, done]);
  }
};
//

// Favorite button
export const getFavorites = () => JSON.parse(localStorage.getItem('favoriteRecipes'));

if (!getFavorites()) {
  localStorage.setItem('favoriteRecipes', JSON.stringify([]));
}

export const saveFavoriteRecipe = (id) => {
  const atualArr = getFavorites();
  const finalArr = atualArr?.concat(id);
  localStorage.setItem('favoriteRecipes', JSON.stringify(finalArr));
};

export const removeFavoriteRecipe = (recipe) => {
  const arr = getFavorites();
  const finalArr = arr.filter((item) => item.name !== recipe.name);
  localStorage.setItem('favoriteRecipes', JSON.stringify(finalArr));
};
//

export const getProgress = () => JSON.parse(localStorage.getItem(IN_PROGRES_RECIPE));

if (!getProgress()) {
  localStorage.setItem(IN_PROGRES_RECIPE, JSON.stringify({
    cocktails: {},
    meals: {},
  }));
}

export const saveInProgressRecipe = (type, id, arr) => {
  const atualObj = getProgress();
  atualObj[type] = { ...atualObj[type], [id]: arr };
  localStorage.setItem(IN_PROGRES_RECIPE, JSON.stringify(atualObj));
};
