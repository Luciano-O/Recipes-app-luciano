const fetchMealsDrinks = async (type, search) => {
  if (type === 'meals') {
    const endpoint = `https://www.themealdb.com/api/json/v1/1/${search}`;
    const fetch1 = await fetch(endpoint);
    const response = await fetch1.json();
    return (response.meals);
  }
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/${search}`;
  const fetch1 = await fetch(endpoint);
  const response = await fetch1.json();
  return (response.drinks);
};

export default fetchMealsDrinks;
