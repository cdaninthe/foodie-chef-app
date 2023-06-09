import React, {useEffect, useState, useContext} from "react";
import UserContext from "./UserContext";
import { useHistory } from "react-router-dom";
import { Card, Icon } from "semantic-ui-react";
import RecipeForm from "./RecipeForm";
import RecipeContext from "./RecipeContext";
import Bookmark from "./Bookmark";
import ChefRecipe from "./ChefRecipe";

function Account(){
    const { user, setUser } = useContext(UserContext)
    const {recipes, setRecipes} = useContext(RecipeContext)
    const history = useHistory()
    const [ errors, setErrors ] = useState([])


    const [userReviews, setUserReviews] = useState([]);
    const [userChefRecipes, setUserChefRecipes] = useState([]);
    const [userBookmarks, setUserBookmarks] = useState([]);
    const [recipeFormHidden, setRecipeFormHidden] = useState('hidden')    

    useEffect(() => {
        setUserChefRecipes(user.chef_recipes)
        setUserReviews(user.reviews) 
        setUserBookmarks(user.bookmarks)
    });

    

    function addNewRecipe(newRecipe){
        setUserChefRecipes([...userChefRecipes, newRecipe])
        setRecipes([...recipes, newRecipe])
        const chefRecipes = [...user.chef_recipes, newRecipe]
        setUser({...user, chef_recipes: chefRecipes})

        // history.push('/')
    }

    function handleDeleteRecipe(recipeId){
        fetch(`/recipes/${recipeId}`, {
            method: "DELETE",
        }).then(res => {
            if(res.ok){
                setUserChefRecipes(
                    userChefRecipes.filter((recipe) => {
                        return recipe.id !== recipeId
                    })
                )
                setRecipes(
                    recipes.filter((recipe) => {
                        return recipe.id !== recipeId
                    })
                )

                const userRecipes = user.chef_recipes.filter((recipe) => {
                    return recipe.id !== recipeId
                })
                setUser({...user, chef_recipes: userRecipes})
            }
        })
    }

       
    
    function handleAddClick(){
        setRecipeFormHidden('')
    }

    function handleDeleteBookmark(bookmarkId){
        fetch(`/bookmarks/${bookmarkId}`, {
            method: "DELETE",
        }).then(res => {
            if(res.ok){
                setUserBookmarks(
                    userBookmarks.filter((bookmark) => {
                        return bookmark.id !== bookmarkId
                    })
                )

                const bookmarks = user.bookmarks.filter((bookmark) => {
                    return bookmark.id !== bookmarkId
                })
                setUser({...user, bookmarks: bookmarks})
            }
        })
    }

    function handleUpdateBookmark (bookmarkId, note){
        fetch(`/bookmarks/${bookmarkId}`, {
            method: "PATCH",
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                note: note,
            })
        }).then(res => {
            if(!res.ok){
                res.json().then((err) =>{
                    alert(err.errors)
                    return userBookmarks;
                })
            }else{
                setUserBookmarks((bookmarks) => {
                    const updatedBookmarks = bookmarks.map(bookmark => {
                        if(bookmark.id === bookmarkId){
                           bookmark.note = note
                        }
                        return bookmark;
                    })
                    return updatedBookmarks;
                })
            }
        })
    }


    return(
        <div>
            <h2>ACCOUNT OVERVIEW</h2>
            <br />
            
            <Card.Group itemsPerRow={3}>
                <Card>
                    <div>
                        <h2>My Bookmarks</h2>
                        {userBookmarks?.map((bookmark) => (
                            <Bookmark 
                                key={bookmark.id} bookmark={bookmark}
                                onDeleteBookmark={handleDeleteBookmark} 
                                onUpdateBookmark={handleUpdateBookmark}
                            />
                        ))}
                    </div>
                </Card>
                <Card>
                    <div>
                        <h2>My Recipes</h2>
                        <button onClick={handleAddClick}>+ Add A New Recipe</button>
                        <div hidden={recipeFormHidden}>
                            <RecipeForm addNewRecipe={addNewRecipe} setRecipeFormHidden={setRecipeFormHidden}/>
                        </div>
                        <br /><br />
    
                        {userChefRecipes?.map((recipe) => (
                            <ChefRecipe key={recipe.id} recipe={recipe}
                                onDeleteRecipe={handleDeleteRecipe}
                                errors={errors} setErrors={setErrors}
                                setUserChefRecipes={setUserChefRecipes}
                                userChefRecipes={userChefRecipes}
                            />
                        ))}
                    </div>
                </Card>
                <Card>
                    <div>
                        <h2>My Reviews</h2>
                        {userReviews?.map((review) => (
                            <Card  color='orange' key={review.id}>
                                <h4 onClick={() => history.push(`/recipes/${review.recipe.id}`)} className="title">
                                    {review.recipe.title}
                                </h4>
                                <span>Rating: {review.rating}/5</span>
                                <p>{review.comment.substr(0,20)}...</p>
                            </Card>
                        ))}
                    </div>
                </Card>

            </Card.Group>
        </div>
    )
}

export default Account;