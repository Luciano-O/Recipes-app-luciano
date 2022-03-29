export const saveTokenFood = () => {
  localStorage.setItem('mealsToken', 1);
};

export const saveTokenDrink = () => {
  localStorage.setItem('cocktailsToken', 1);
};

export const saveEmail = (email) => {
  localStorage.setItem('user', JSON.stringify({ email }));
};
