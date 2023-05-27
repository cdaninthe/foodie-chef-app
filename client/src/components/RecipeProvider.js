import React, { useState, useEffect } from 'react';
import RecipeContext from './RecipeContext';
import { useParams } from 'react-router-dom';

const RecipeProvider = ({ children }) => {
  const localStorageRecipes = window.localStorage.getItem('recipes') 
  const recipesValue = JSON.parse(localStorageRecipes) || [];
  const [recipes, setRecipes] = useState(recipesValue);
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams()
  const {id} = params
  
  useEffect(() => {
    fetch('/recipes')
      .then(response => {
        console.log({response})
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error: Failed to get recipes');
        }
    })
    .then(data => {
      console.log({data})
      window.localStorage.setItem('recipes', JSON.stringify(data));

      setRecipes(data);
      setIsLoading(false);
    })
    .catch(error => {
      setError(error.message);
      setIsLoading(false);
    });
}, [id]); // Empty array means this effect runs once when the component mounts

return (
  <RecipeContext.Provider value={{ recipes, setRecipes, isLoading, error }}>
    {children}
  </RecipeContext.Provider>
);
};

export { RecipeProvider };