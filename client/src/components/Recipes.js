import React from "react";
import { Card } from "semantic-ui-react";
import Recipe from "./Recipe";


function Recipes({recipes}){


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