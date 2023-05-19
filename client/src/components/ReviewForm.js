import React, {useEffect, useState, useContext} from "react";
import UserContext from "./UserContext";


function ReviewForm({recipeId, onAddReview}){
    const { user } = useContext(UserContext)
    
    const [ userReviewRating, setUserReviewRating ] = useState("")
    const [ userReviewComment, setUserReviewComment ] = useState("")
    const [ showForm, setShowForm ] = useState(true)
    const [ errors, setErrors ] = useState([])

    useEffect(() => {
        setShowForm(false)
    }, []);

    function handleFormSubmit(e){
        e.preventDefault()
        fetch(`/reviews`, {
            method: "POST",
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                rating: userReviewRating,
                comment: userReviewComment,
                recipe_id: parseInt(recipeId)
            })
        }).then(res => {
            if (!res.ok){
                res.json().then((err) =>{
                setErrors(err.errors)})
            } else{
                setShowForm(false)
                res.json().then((newReview) => onAddReview(newReview))
                setUserReviewRating('')
                setUserReviewComment('')
                
            }
        })
    }

    if(!showForm) return(
        <button onClick={() => setShowForm(true)}>Write a review</button>
    )

    return(
        <div>
            <div>
                <form onSubmit={(e) => handleFormSubmit(e)}>
                    <label>Rating: </label>
                    <input type="number" placeholder="1-5 rating" 
                        value={userReviewRating}
                        onChange={(e) => setUserReviewRating(e.target.value)}
                    /><br />
                    <label>Comment: </label>
                    <input type="text" placeholder="Comment" 
                        value={userReviewComment}
                        onChange={(e) => setUserReviewComment(e.target.value)}
                    /><br />
                    <button type="submit">Submit</button>

                    <button onClick={() => setShowForm(false)}>Cancel</button>
                </form>
            </div>
            { errors && 
                <div id="errors-container">
                    { errors.map(error => <div className="error-message" key={error}>{error}. </div>)}
                </div>
            }
        </div>
    )
}

export default ReviewForm;