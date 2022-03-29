const fetchMealsDrinks = async (type, search) => {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=` 
  const fetch1 = await fetch(endpoint)
  const response = await fetch1.json()
  return(response.meals)
}

export default fetchMealsDrinks;
