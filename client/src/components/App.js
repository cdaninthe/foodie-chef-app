import React, {useEffect, useState, useMemo} from 'react';
import '../App.css';
// import { Switch, Route } from "react-router-dom";
import Header from './Header';
import NavBar from './NavBar';
import Recipes from './Recipes';
import RecipeCard from './RecipeCard';
import Login from './Login';
import UserContext from './UserContext';
import Account from './Account';
import {RecipeProvider} from './RecipeProvider';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  
  const [user, setUser] = useState(null);
  // const [recipes, setRecipes] = useState([])

  const value = useMemo(
    () => ({ user, setUser }), 
    [user]
  );

  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser({
          id: user.id,
          username: user.username,
          bookmarks: user.bookmarks,
          reviews: user.reviews,
          chef_recipes: user.chef_recipes
        })
        );
      }
    });
  }, []);

  // useEffect(()=>{
  //   fetch(`/recipes`)
  //   .then((r)=> r.json())
  //   .then((recipes)=> {
  //     setRecipes(recipes)
  //     console.log(recipes)
  //   })
  // },[])



  return (
    <div className="App">
    <Header/>

    { !user ? <Login onLogin={setUser} /> : 
      <div>
        <Router>
          <UserContext.Provider value={value}>
            <RecipeProvider>
              <NavBar />
              <br />
              <Switch>
                <Route exact path="/">
                  <Recipes />
                </Route>
                
                <Route exact path="/account">
                  <Account />
                </Route>
                <Route exact path="/recipes">
                  <Recipes />
                </Route>
                <Route path="/recipes/:id">
                  <RecipeCard />
                </Route>
                
              </Switch> 
            </RecipeProvider>
          </UserContext.Provider>
        </Router> 
        
        
      </div>
    }
    </div>
  );
}

export default App;
