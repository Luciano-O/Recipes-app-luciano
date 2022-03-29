import React, { useEffect, useState } from 'react';
import fetchMealsDrinks from '../../Helpers/Fetchs';

function Food() {
  const [foods, setFoods] = useState();
  const [finalFoods, setFinalFoods] = useState();

  useEffect(() => {
    const bringFoods = async () => {
      const MAX_LENGTH = 13;
      const finalFoods1 = await fetchMealsDrinks('meals', 'search.php?s=');
      setFoods(finalFoods1);
      setFinalFoods(finalFoods1.slice(0, MAX_LENGTH));
    };
    bringFoods();
  }, []);

  return (
    <div>
      <h1>Food</h1>
      {finalFoods && finalFoods.map((food) => (
        <div key={ food.idMeal }>
          <img
            src={ food.strMealThumb }
            alt={ food.strMeal }
          />
          <h3>{ food.strMeal }</h3>
        </div>
      ))}
    </div>
  );
}

export default Food;
