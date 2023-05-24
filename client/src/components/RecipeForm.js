import React, { useState, useContext } from "react";
import UserContext from "./UserContext";

function RecipeForm({addNewRecipe, setRecipeFormHidden}){
    const {user} = useContext(UserContext)

    const [errors, setErrors] = useState([])
    const [formData, setFormData] = useState({
        chef_id: user.id,
        title: "",
        category: "",
        total_time: "",
        difficulty: "",
        servings: "",
        ingredients: "",
        directions: "",
        image_url: "https://static.vecteezy.com/system/resources/previews/006/415/910/large_2x/empty-plate-with-spoon-yellow-background-free-photo.jpg"
    })

    function handleRecipeFormSubmit(e) {
      e.preventDefault()
      console.log(formData)
      setErrors([])
      fetch('/recipes', {
        method: 'POST',
        headers: { 'Content-Type':'application/json'},
        body: JSON.stringify(formData)
      }).then((r) => {
        if(r.ok){
            r.json().then((newRecipe) => addNewRecipe(newRecipe))
            setFormData({
                title: "",
                category: "",
                total_time: "",
                difficulty: "",
                servings: "",
                ingredients: "",
                directions: "",
                image_url: ""
            })
            setRecipeFormHidden('hidden')
        } else{
          r.json().then((err) => setErrors(err.errors));
        }
      })
    }

    function handleChange(e){
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    return(
        <div>
            <form onSubmit={(e) => handleRecipeFormSubmit(e)}>
                <h4 style={{ textAlign: "center"}}>Create new recipe</h4>
                <label>Name:  </label>
                <input type="text" placeholder="Recipe Name"
                    name='title'
                    value={formData.title}
                    onChange={(e) => handleChange(e)}
                />
                <br/><br/>
                <label>Category: </label>
                <select name="category" onChange={(e)=> handleChange(e)}>
                    <option value="">{formData.category}</option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Appetizer">Appetizer</option>
                    <option value="Entree">Entree</option>
                    <option value="Side">Side</option>
                    <option value="Dessert">Dessert</option>
                    <option value="Snack">Snack</option>
                    <option value="Beverage">Beverage</option>
                    <option value="Spice and Sauce">Spice and Sauce</option>
                </select>
                <br/><br/>
                <label>Total Time (in minutes):  </label>
                <input type="number" placeholder="60"
                    name='total_time'
                    value={formData.total_time}
                    onChange={(e) => handleChange(e)}
                />                
                <br/><br/>
                <label>Difficulty: </label>
                <select name="difficulty" onChange={(e)=> handleChange(e)}>
                    <option value="">{formData.difficulty}</option>
                    <option value="Easy">Easy</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Difficult">Difficult</option>
                </select>
                <br/><br/>
                <label>Servings:  </label>
                <input type="number" placeholder=""
                    name='servings'
                    value={formData.servings}
                    onChange={(e) => handleChange(e)}
                />                
                <br/><br/>

                <label>Ingredients: </label>
                <textarea type="textarea" placeholder="Ingredients & quantities..."
                    name='ingredients'
                    value={formData.ingredients}
                    onChange={(e) => handleChange(e)}
                >
                </textarea>
                <br/><br/>
                <label>Directions: </label>
                <textarea type="textarea" placeholder="Recipe directions..."
                    name='directions'
                    value={formData.directions}
                    onChange={(e) => handleChange(e)}
                >
                </textarea>
                <br/><br/>
                <label>Image URL: </label>
                <input type="text"
                    name='image_url'
                    value={formData.image_url}
                    onChange={(e) => handleChange(e)}
                />
                <br/><br/>

                <div className="errors-container">
                    {errors.map((err) => (
                        <div className="error-message" key={err}>{err}</div>
                    ))}
                </div>
      
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default RecipeForm;