import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Login from './Pages/Login/Login';
import Food from './Pages/Food/Food';
import Drink from './Pages/Drink/Drink';
import RecipeDetails from './Pages/RecipeDetails/RecipeDetails';
import RecipeProgress from './Pages/RecipeProgress/RecipeProgress';
import Explore from './Pages/Explore/Explore';
import ExploreDetails from './Pages/ExploreDetails/ExploreDetails';
import ExploreIngredients from './Pages/ExploreIngredients/ExploreIngredients';
import ExploreNationalities from './Pages/ExploreNationalities/ExploreNationalities';
import Profile from './Pages/Profile/Profile';
import DoneRecipes from './Pages/DoneRecipes/DoneRecipes';
import FavoriteRecipes from './Pages/FavoriteRecipes/FavoriteRecipes';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/food" component={ Food } />
      <Route path="/drink" component={ Drink } />
      <Route path="/:type/:id-da-receita" component={ RecipeDetails } />
      <Route path="/:type/:id-da-receita/in-progress" component={ RecipeProgress } />
      <Route path="/explore" component={ Explore } />
      <Route path="/explore/:type" component={ ExploreDetails } />
      <Route path="/explore/:type/ingredients" component={ ExploreIngredients } />
      <Route path="/explore/foods/nationalities" component={ ExploreNationalities } />
      <Route path="/profile" component={ Profile } />
      <Route path=" /done-recipes" component={ DoneRecipes } />
      <Route path=" /favorite-recipes" component={ FavoriteRecipes } />
      {/* <Route path="*" component={ NotFound } /> */}
    </Switch>
  );
}

export default App;
