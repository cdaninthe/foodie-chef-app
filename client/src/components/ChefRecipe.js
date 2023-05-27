import React, { useState, useContext } from "react";
import { Card, Icon } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import UserContext from "./UserContext";
import RecipeContext from "./RecipeContext";

function ChefRecipe({recipe, onDeleteRecipe, errors, setErrors, setUserChefRecipes, userChefRecipes}) {
  const history = useHistory();
  const { user, setUser } = useContext(UserContext);
  const { recipes, setRecipes } = useContext(RecipeContext);

  const [recipeEditFormHidden, setRecipeEditFormHidden] = useState("hidden");
  const [recipeData, setRecipeData] = useState({
    title: "",
    category: "",
    total_time: "",
    difficulty: "",
    servings: "",
    ingredients: "",
    directions: "",
    image_url: "",
  });

  function handleEditClick() {
    setRecipeEditFormHidden("");
    setRecipeData({
      title: recipe.title,
      category: recipe.category,
      total_time: recipe.total_time,
      difficulty: recipe.difficulty,
      servings: recipe.servings,
      ingredients: recipe.ingredients,
      directions: recipe.directions,
      image_url: recipe.image_url,
    });
  }

  function handleChange(e) {
    setRecipeData({
      ...recipeData,
      [e.target.name]: e.target.value,
    });
  }
  function handleSubmitUpdate(e) {
    e.preventDefault();
    // onUpdateRecipe(recipe.id, recipeData)
    handleUpdateRecipe(recipe.id, recipeData);
  }

  function handleUpdateRecipe(recipeId, recipeObj) {
    console.log(recipeId, recipeObj);
    fetch(`/recipes/${recipeId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: recipeObj.title,
        category: recipeObj.category,
        total_time: recipeObj.total_time,
        difficulty: recipeObj.difficulty,
        servings: recipeObj.servings,
        ingredients: recipeObj.ingredients,
        directions: recipeObj.directions,
        image_url: recipeObj.image_url,
      }),
    }).then((res) => {
      if (!res.ok) {
        res.json().then((err) => {
          setErrors(err.errors);
          // alert(err.errors)
          // return userChefRecipes;
        });
      } else {
        res.json().then((updatedRecipe) => {
          console.log(updatedRecipe);

          setRecipeEditFormHidden("hidden");

          const updatedRecipes = recipes.map((recipe) => {
            if (recipe.id === recipeId) {
              recipe = updatedRecipe;
            }
            return recipe;
          });

          setUserChefRecipes(updatedRecipes)
          setRecipes(updatedRecipes)

        //   setUserChefRecipes(() => {
        //     const updatedRecipes = recipes.map((recipe) => {
        //       if (recipe.id === recipeId) {
        //         recipe = updatedRecipe;
        //       }
        //       return recipe;
        //     });
        //     return updatedRecipes;
        //   });

        //   setRecipes(() => {
        //     const updatedRecipes = recipes.map((recipe) => {
        //       if (recipe.id === recipeId) {
        //         recipe = updatedRecipe;
        //       }
        //       return recipe;
        //     });
        //     return updatedRecipes;
        //   });
          
          const updatedChefRecipes = user.chef_recipes.map((recipe) => {
            if (recipe.id === recipeId) {
              recipe = updatedRecipe;
            }
            return recipe;
          });
       
          setUser({ ...user, chef_recipes: updatedChefRecipes });
        });
        
      }
    });
  }


  return (
    <Card color="orange">
      <h4
        onClick={() => history.push(`/recipes/${recipe.id}`)}
        className="title"
      >
        {recipe.title}
      </h4>
      <div>
        <Icon name="edit outline" onClick={handleEditClick} />
        <Icon
          name="trash alternate outline"
          onClick={() => onDeleteRecipe(recipe.id)}
        />

        <form hidden={recipeEditFormHidden} onSubmit={handleSubmitUpdate}>
          <label>Name: </label>
          <input
            type="text"
            name="title"
            value={recipeData.title}
            onChange={(e) => handleChange(e)}
          />
          <br />
          <br />
          <label>Category: </label>
          <select name="category" onChange={(e) => handleChange(e)}>
            <option value="">{recipeData.category}</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Appetizer">Appetizer</option>
            <option value="Entree">Entree</option>
            <option value="Side">Side</option>
            <option value="Dessert">Dessert</option>
            <option value="Snack">Snack</option>
            <option value="Beverage">Beverage</option>
            <option value="Spice and Sauce">Spice and Sauce</option>
          </select>
          <br />
          <br />
          <label>Total Time (in minutes): </label>
          <input
            type="number"
            name="total_time"
            value={recipeData.total_time}
            onChange={(e) => handleChange(e)}
          />
          <br />
          <br />
          <label>Difficulty: </label>
          <select name="difficulty" onChange={(e) => handleChange(e)}>
            <option value="">{recipeData.difficulty}</option>
            <option value="Easy">Easy</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Difficult">Difficult</option>
          </select>
          <br />
          <br />
          <label>Servings: </label>
          <input
            type="number"
            name="servings"
            value={recipeData.servings}
            onChange={(e) => handleChange(e)}
          />
          <br />
          <br />

          <label>Ingredients: </label>
          <textarea
            type="textarea"
            name="ingredients"
            value={recipeData.ingredients}
            onChange={(e) => handleChange(e)}
          ></textarea>
          <br />
          <br />
          <label>Directions: </label>
          <textarea
            type="textarea"
            name="directions"
            value={recipeData.directions}
            onChange={(e) => handleChange(e)}
          ></textarea>
          <br />
          <br />
          <label>Image URL: </label>
          <input
            type="text"
            name="image_url"
            value={recipeData.image_url}
            onChange={(e) => handleChange(e)}
          />
          <br />
          <br />
          <button type="submit">Update</button>

          {errors && (
            <div id="errors-container">
              {errors.map((error) => (
                <div className="error-message" key={error}>
                  {error}.{" "}
                </div>
              ))}
            </div>
          )}
        </form>
      </div>
    </Card>
  );
}

export default ChefRecipe;
