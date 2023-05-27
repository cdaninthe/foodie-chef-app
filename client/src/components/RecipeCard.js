import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Card } from "semantic-ui-react";
import Reviews from "./Reviews";
import RecipeContext from "./RecipeContext";
import UserContext from "./UserContext";

// const RecipeCard = () => {
function RecipeCard() {
    const params = useParams();
    
    const { recipes } = useContext(RecipeContext);
    const { user, setUser } = useContext(UserContext);

    const [recipeCard, setRecipeCard] = useState({});
    const [showReviews, setShowReviews] = useState(false);
    const [showReviewsBtn, setShowReviewsBtn] = useState("SHOW REVIEWS");
    const [bookmarkFormHidden, setBookmarkFormHidden] = useState("hidden");
    const [bookmarkData, setBookmarkData] = useState({
        chef_id: user.id,
        recipe_id: parseInt(params.id),
        note: "",
    });
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        // if (recipes) {
        const recipe = recipes.filter(
        (recipe) => recipe.id === parseInt(params.id)
        );
        console.log({ recipe });
        setRecipeCard(recipe[0]);
        // }
    }, [recipes, params.id]);

    //   useEffect(() => {
    //     fetch(`/recipes/${params.id}`)
    //         .then((r) => r.json())
    //         .then(setRecipeCard);
    //   }, [params.id]);

    function handleShowReviews() {
        setShowReviews(!showReviews);
        showReviewsBtn === "SHOW REVIEWS"
        ? setShowReviewsBtn("HIDE REVIEWS")
        : setShowReviewsBtn("SHOW REVIEWS");
    }

    function handleBookmarkClick() {
        setBookmarkFormHidden("");
    }

    function handleChange(e) {
        setBookmarkData({
        ...bookmarkData,
        [e.target.name]: e.target.value,
        });
    }

    function handleBookmarkFormSubmit(e) {
        e.preventDefault();
        console.log(bookmarkData);
        setBookmarkFormHidden("");
        setErrors([]);
        fetch("/bookmarks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookmarkData),
        }).then((r) => {
        if (r.ok) {
            r.json().then((newBookmark) => addNewBookmark(newBookmark));
            setBookmarkData({
            note: "",
            });
            setBookmarkFormHidden("hidden");
        } else {
            r.json().then((err) => setErrors(err.errors));
        }
        });
    }

    function addNewBookmark(newBookmark) {
        console.log(newBookmark);
        const userBookmarks = [...user.bookmarks, newBookmark];
        setUser({ ...user, bookmarks: userBookmarks });
    }

    return (
        <Card fluid>
        <img src={recipeCard.image_url} alt="recipe" />
        <h2>{recipeCard.title} </h2>
        <h3>
            🧑‍🍳 Recipe by {recipeCard?.chef?.username} <br />
            ⏲️ {recipeCard.total_time} min - {recipeCard.difficulty} <br />
            🍽️ {recipeCard.servings} servings <br />
        </h3>
        <h3>Ingredients:</h3>
        <p>{recipeCard.ingredients}</p>
        <h3>Directions:</h3>
        <p>{recipeCard.directions}</p>

        <button className="bookmark" onClick={handleBookmarkClick}>
            Bookmark this recipe
        </button>
        <form hidden={bookmarkFormHidden} onSubmit={handleBookmarkFormSubmit}>
            <label>Note: </label>
            <input
                type="text"
                placeholder="Bookmark note"
                name="note"
                value={bookmarkData.note}
                onChange={(e) => handleChange(e)}
            />
            <button type="submit">Save Bookmark</button>
            <br />
            <div className="errors-container">
                {errors.map((err) => (
                    <div className="error-message" key={err}>{err}</div>
                ))}
            </div>
        </form>
        <br />

        <div>
            <Card fluid>
                <button onClick={handleShowReviews}>{showReviewsBtn}</button>
                {showReviews ? (
                    <Card.Content>
                    <h3>Reviews:</h3>
                    <Reviews />
                    </Card.Content>
                ) : null}
            </Card>
        </div>
        <br />
        </Card>
    );
}

export default RecipeCard;
