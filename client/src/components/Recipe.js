import React from "react";
import { Card, Image } from "semantic-ui-react";
import {useHistory} from 'react-router-dom';

function Recipe({recipe}){
    const history = useHistory()

    return( 
        <Card fluid color='orange' onClick={() => history.push(`/recipes/${recipe.id}`)}>
            <Image src={recipe.image_url} wrapped ui={false} />
            <Card.Content>
                <Card.Header>{recipe.title}</Card.Header>
                <Card.Meta>
                    <span>{recipe.category}</span>
                </Card.Meta>
                <Card.Description>
                    {recipe.difficulty}
                </Card.Description>
            </Card.Content>
        </Card>   
    );
}

export default Recipe;