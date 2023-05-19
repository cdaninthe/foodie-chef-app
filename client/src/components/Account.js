import React, {useEffect, useState, useContext} from "react";
// import UserReviews from "./UserReviews";
import UserContext from "./UserContext";
import { useHistory } from "react-router-dom";

function Account({venues, setVenues}){
    const { user } = useContext(UserContext)
    const history = useHistory()

    const [userReviews, setUserReviews] = useState([]);
    const [userChefRecipes, setUserChefRecipes] = useState([]);
    const [userBookmarks, setUserBookmarks] = useState([]);
    const [venueFormHidden, setVenueFormHidden] = useState('hidden')

    useEffect(() => {
        console.log(user.reviews)
        console.log(user.chef_recipes)
        console.log(user.bookmarks)
        // setUserReviews(user.reviews) 
    }, []);

    

    function addNewRecipe(newRecipe){
        // setUserVenues((venues) => [formData, ...venues])
        // setUserVenues([...userVenues, formData])
        setUserChefRecipes([...userChefRecipes, newRecipe])
        history.push('/')
    }

    // function handleDeleteVenue(venueId){
    //     fetch(`/venues/${venueId}`, {
    //         method: "DELETE",
    //     }).then(res => {
    //         if(res.ok){
    //             setUserVenues(
    //                 userVenues.filter((venue) => {
    //                     return venue.id !== venueId
    //                 })
    //             )
    //         }
    //     })
    // }
    
    function handleAddClick(){
        setVenueFormHidden('')
    }

    return(
        <div>
            <h2>ACCOUNT OVERVIEW</h2>
            <br />
            <button onClick={handleAddClick}>+ Add A New Recipe</button>
            
            <div>
                <br />
                <h4>My Reviews</h4>
                {/* <UserReviews userReviews={userReviews}/> */}
            </div>

            <div>
                <h4>Reviewed Venues</h4>
                <div hidden={venueFormHidden}>
                    {/* <VenueForm addNewVenue={addNewVenue} setVenueFormHidden={setVenueFormHidden}/> */}
                </div>
                {/* <UserVenues 
                    userVenues={userVenues}
                    // handleDeleteVenue={handleDeleteVenue}
                /> */}
            </div>
        </div>
    )
}

export default Account;