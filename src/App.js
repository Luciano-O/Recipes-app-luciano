import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Login from './Pages/Login/Login';
import Foods from './Pages/Foods/Foods';
import Drinks from './Pages/Drinks/Drinks';
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
      <Route exact path="/foods" component={ Foods } />
      <Route exact path="/drinks" component={ Drinks } />
      <Route exact path="/:type/:id-da-receita" component={ RecipeDetails } />
      <Route
        exact
        path="/:type/:id-da-receita/in-progress"
        component={ RecipeProgress }
      />
      <Route exact path="/explore" component={ Explore } />
      <Route exact path="/explore/:type" component={ ExploreDetails } />
      <Route exact path="/explore/:type/ingredients" component={ ExploreIngredients } />
      <Route
        exact
        path="/explore/foods/nationalities"
        component={ ExploreNationalities }
      />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path=" /done-recipes" component={ DoneRecipes } />
      <Route exact path=" /favorite-recipes" component={ FavoriteRecipes } />
    </Switch>
  );
}

export default App;
