localStorage.setItem('user', JSON.stringify({ email: 'teste@trybe.com' }));

export const saveTokenFood = () => {
  localStorage.setItem('mealsToken', 1);
};

export const saveTokenDrink = () => {
  localStorage.setItem('cocktailsToken', 1);
};

export const saveEmail = (email) => {
  localStorage.setItem('user', JSON.stringify({ email }));
};

export const getEmail = () => JSON.parse(localStorage.getItem('user'));
