import React, {useContext} from "react";
import { Card } from "semantic-ui-react";
import Recipe from "./Recipe";
import RecipeContext from "./RecipeContext";

function Recipes(){
 
    const {recipes} = useContext(RecipeContext)

    return(
        <Card.Group itemsPerRow={4}>
            {recipes.map((recipe) => (
                <Recipe
                    key={recipe.id} recipe={recipe}
                />
            ))}
        </Card.Group>
    );
}

export default Recipes;