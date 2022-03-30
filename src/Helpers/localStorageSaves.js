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

export const saveTokenDrink = () => {
  localStorage.setItem('cocktailsToken', 1);
};

export const saveEmail = (email) => {
  localStorage.setItem('user', JSON.stringify({ email }));
};

export const getEmail = () => JSON.parse(localStorage.getItem('user'));
