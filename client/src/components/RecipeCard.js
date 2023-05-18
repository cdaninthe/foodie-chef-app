import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { Card } from "semantic-ui-react";
import Reviews from "./Reviews";



function RecipeCard({recipes}){

    const [recipeCard, setRecipeCard] = useState([])
    const [showReviews, setShowReviews] = useState(false)
    const [showReviewsBtn, setShowReviewsBtn] = useState("SHOW REVIEWS")
    const params = useParams()

    useEffect(() => {
        const recipe = recipes.filter((recipe)=>(
            recipe.id == params.id
        ))
        console.log(recipe[0])
        setRecipeCard(recipe[0])
    }, [params.id]);

    function handleShowReviews(){
    setShowReviews(!showReviews)
    showReviewsBtn === "SHOW REVIEWS" ? setShowReviewsBtn("HIDE REVIEWS") : setShowReviewsBtn("SHOW REVIEWS")
    }



    return( 
        
        <Card fluid>
            {/* <img src={recipeCard.image_url} alt="recipe"/>
            <h2>{recipeCard.title} </h2>
            <h3>
                🧑‍🍳 Recipe by {recipeCard.chef.username} <br />
                ⏲️ {recipeCard.total_time} min - {recipeCard.difficulty} <br />
                🍽️ {recipeCard.servings} servings <br />
            </h3>
            <h3>Ingredients:</h3>
            <p>{recipeCard.ingredients}</p>
            <h3>Directions:</h3>
            <p>{recipeCard.directions}</p> */}
                      
            <div> 
                <Card fluid>
                    <button onClick={handleShowReviews}>{showReviewsBtn}</button>
                    { showReviews ? 
                        <Card.Content>
                            <h3>Reviews:</h3>
                            <Reviews recipeCard={recipeCard} setRecipeCard={setRecipeCard}/>
                        </Card.Content>
                    : null}
                </Card>
            </div>
            <br />    
        </Card>
    );
}

export default RecipeCard;