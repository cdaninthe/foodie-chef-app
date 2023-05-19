import React, {useState, useContext} from "react";
import { Card, Icon } from "semantic-ui-react";
import UserContext from "./UserContext";


function Review({review, onDeleteReview, onUpdateReview}){

    const { user } = useContext(UserContext)

    const [commentHidden, setCommentHidden] = useState('')
    const [formHidden, setFormHidden] = useState('hidden')
    const [reviewRating, setReviewRating] = useState('')
    const [reviewComment, setReviewComment] = useState('')

    function handleEditClick(){
        setCommentHidden('hidden')
        setFormHidden('')
        setReviewRating(review.rating)
        setReviewComment(review.comment)
    }

    function handleSubmitUpdate(e){
        e.preventDefault()
        onUpdateReview(review.id, reviewRating, reviewComment)
        setCommentHidden('')
        setFormHidden('hidden')
    }


    return( 
        <Card fluid color='orange'>
            <Card.Content hidden={commentHidden}>
                <Card.Content>
                    <Icon name='user' />
                    {review.user.username}
                </Card.Content>
                <Card.Meta>
                    RATING: {review.rating}/5
                </Card.Meta>
                <Card.Description>
                    {review.comment}
                </Card.Description>
            </Card.Content>
            <div>
                {user.id === review.user.id ?
                    <div>
                        <Icon name='edit outline' onClick={handleEditClick}/>
                        <Icon name='trash alternate outline' onClick={() => onDeleteReview(review.id)}/>
                        
                        <form hidden={formHidden} onSubmit={handleSubmitUpdate}>
                            <label>Rating: </label>
                            <input type="number" placeholder="1-5 rating" 
                                value={reviewRating}
                                onChange={(e) => setReviewRating(e.target.value)}
                            /><br />
                            <label>Comment: </label>
                            <input type="text" placeholder="Comment" 
                                value={reviewComment}
                                onChange={(e) => setReviewComment(e.target.value)}
                            /><br />
                            <button type="submit">Update</button>
                        </form>
                    </div>
                    : null
                }
            </div>
        </Card>   
    );
}

export default Review;