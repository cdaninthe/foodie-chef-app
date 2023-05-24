import React, {useState} from "react";
import { Card, Icon } from "semantic-ui-react";
import { useHistory } from "react-router-dom";



function Bookmark({bookmark, onDeleteBookmark, onUpdateBookmark}){
    const history = useHistory()

    const [formHidden, setFormHidden] = useState('hidden')
    const [bookmarkNote, setBookmarkNote] = useState('')

    function handleEditClick(){
        setFormHidden('')
        setBookmarkNote(bookmark.note)
    }

    function handleSubmitUpdate(e){
        e.preventDefault()
        onUpdateBookmark(bookmark.id, bookmarkNote)
        setFormHidden('hidden')
    }


    return( 
        <Card color='orange'>
            <h4 onClick={() => history.push(`/recipes/${bookmark.recipe_id}`)} className="title">{bookmark.recipe.title}</h4>
            <span>Note:</span>
            <p>{bookmark.note}</p>
            <div>
                <Icon name='edit outline' onClick={handleEditClick}/>
                <Icon name='trash alternate outline' onClick={()=>onDeleteBookmark(bookmark.id)}/>

                <form hidden={formHidden} onSubmit={handleSubmitUpdate}>
                    <label>Note: </label>
                    <input type="text" placeholder="Note" 
                        value={bookmarkNote}
                        onChange={(e) => setBookmarkNote(e.target.value)}
                    /><br />
                    <button type="submit">Update</button>
                </form>
            </div>
        </Card>
    );
}

export default Bookmark;