// https://www.themealdb.com/api/json/v1/1/search.php?f={primeira-letra}
// https://www.thecocktaildb.com/api/json/v1/1/search.php?f={primeira-letra}
// https://www.themealdb.com/api/json/v1/1/search.php?s={nome}
// https://www.thecocktaildb.com/api/json/v1/1/search.php?s={nome}
// https://www.themealdb.com/api/json/v1/1/filter.php?i={ingrediente}
// https://www.thecocktaildb.com/api/json/v1/1/filter.php?i={ingrediente}

// f={primeira-letra}
// s={nome}
// i={ingrediente}
async function getRecipes(site, mode, type) {
  const response = await fetch(`https://www.the${site}db.com/api/json/v1/1/${mode}.php?${type}`);
  const json = await response.json();
  return json;
}

export async function getRandomRecipe(siteValue) {
  const response = await fetch(`https://www.the${siteValue}db.com/api/json/v1/1/random.php`);
  const json = await response.json();
  return json;
}

export default getRecipes;
