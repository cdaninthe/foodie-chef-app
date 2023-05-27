import React, {useEffect, useState, useContext} from "react";
import { Card } from "semantic-ui-react";
import Review from "./Review";
import { useParams } from "react-router-dom";
import ReviewForm from "./ReviewForm";
import UserContext from "./UserContext";



function Reviews(){
    const { user, setUser } = useContext(UserContext)
    console.log({user})

    const params = useParams()
    const [reviews, setReviews] = useState([])    

    useEffect(() => {
        fetch(`/recipes/${params.id}/reviews`)
            .then((r) => r.json())
            .then(setReviews);
    }, [params.id]);

    function handleAddReview(newReview){
        console.log('reviews', reviews)
        console.log('new review', newReview)
        console.log('user', user)

        setReviews([newReview, ...reviews])    
        const userReviews = [...user.reviews, newReview]
        setUser({...user, reviews: userReviews})   
    }

    function handleDeleteReview(reviewId){
        fetch(`/reviews/${reviewId}`, {
            method: "DELETE",
        }).then(res => {
            if(res.ok){
                setReviews(
                    reviews.filter((review) => {
                        return review.id !== reviewId
                    })
                )

                const userReviews = user.reviews.filter((review) => {
                    return review.id !== reviewId
                })
                setUser({...user, reviews: userReviews})
            }
        })
    }


    function handleUpdateReview (reviewId, rating, comment){
        fetch(`/reviews/${reviewId}`, {
            method: "PATCH",
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                rating: rating,
                comment: comment,
            })
        }).then(res => {
            if(!res.ok){
                res.json().then((err) =>{
                    alert(err.errors)
                    return reviews;
                })
            }else{
                setReviews((reviews) => {
                    const updatedReviews = reviews.map(review => {
                        if(review.id === reviewId){
                           review.comment = comment;
                           review.rating = rating
                        }
                        return review;
                    })
                    return updatedReviews;
                })

                const updatedReviews = user.reviews.map((review) => {
                    if (review.id === reviewId) {
                        review.comment = comment;
                        review.rating = rating
                    }
                    return review;
                });
               
                setUser({ ...user, reviews: updatedReviews });
            }
        })
    }


    return(
        <div>
            <Card.Group itemsPerRow={1}>
                <ReviewForm 
                    recipeId={params.id}
                    onAddReview={handleAddReview}
                />

                {reviews.map((review) => (
                    <Review
                        key={review.id} review={review}
                        onDeleteReview={handleDeleteReview}
                        onUpdateReview={handleUpdateReview}
                    />
                ))}
            </Card.Group>
        </div>
       
    );
}

export default Reviews;