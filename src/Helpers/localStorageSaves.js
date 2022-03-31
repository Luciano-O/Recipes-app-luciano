export const saveTokenFood = () => {
  localStorage.setItem('mealsToken', 1);
};

export const getFavorites = () => JSON.parse(localStorage.getItem('favoriteRecipes'));

export const getProgress = () => JSON.parse(localStorage.getItem('inProgressRecipes'));

if (!getProgress()) {
  localStorage.setItem('inProgressRecipes', JSON.stringify({}));
}

if (!getFavorites()) {
  localStorage.setItem('favoriteRecipes', JSON.stringify([]));
}

export const saveFavoriteRecipe = (id) => {
  const atualArr = getFavorites();
  const finalArr = atualArr.concat(id);
  localStorage.setItem('favoriteRecipes', JSON.stringify(finalArr));
};

export const removeFavoriteRecipe = (recipe) => {
  const arr = getFavorites();
  const finalArr = arr.filter((item) => item.name !== recipe.name);
  localStorage.setItem('favoriteRecipes', JSON.stringify(finalArr));
};

export const saveInProgressRecipe = (name, arr) => {
  const atualObj = getProgress();
  atualObj[name] = arr;
  localStorage.setItem('inProgressRecipes', JSON.stringify(atualObj));
};

export const saveTokenDrink = () => {
  localStorage.setItem('cocktailsToken', 1);
};

export const saveEmail = (email) => {
  localStorage.setItem('user', JSON.stringify({ email }));
};

export const getEmail = () => JSON.parse(localStorage.getItem('user'));
