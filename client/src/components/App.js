import React, {useEffect, useState, useMemo} from 'react';
import '../App.css';
import { Switch, Route } from "react-router-dom";
import Header from './Header';
import NavBar from './NavBar';
import Recipes from './Recipes';
import RecipeCard from './RecipeCard';

function App() {

  const [recipes, setRecipes] = useState([])

  useEffect(()=>{
    fetch(`/recipes`)
    .then((r)=> r.json())
    .then((recipes)=> {
        setRecipes(recipes)
        console.log(recipes)
    })
  },[])

  return (


    <div className="App">
    <Header/>

    {/* { !user ? <Login onLogin={setUser} /> :  */}
      <div> 
        {/* NC */}
        {/* <UserContext.Provider value={value}> */}
          <NavBar />
          <br />
          <Switch>
            <Route exact path="/">
              <Recipes recipes={recipes}/>
            </Route>
            <Route path="/recipes/:id">
              <RecipeCard recipes={recipes}/>
            </Route>
          </Switch> 
        {/* </UserContext.Provider> */}
        
      </div>
    {/* }     */}
    </div>
  );
}

export default App;
