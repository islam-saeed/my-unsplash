import { useEffect, useState } from "react"

const AddImage = ({setOverlay, setImageAdd}) => {

    // states to hold the input text
    const [label, setLabel] = useState('');
    const [URL, setURL] = useState('');

    // saves the label text on change
    const handleLabelChange = (e) => {
        setLabel(e.target.value);
    }

    // saves the url text on change
    const handleURLChange = (e) => {
        setURL(e.target.value);
    }

    // removes the overlay when the cancel button is clicked
    const handleCancel = (e) => {
        e.preventDefault();
        setOverlay(false)
    }

    // sends the data stored in the states to the database when the submit button is clicked
    const handleSubmit = async (e) => {
        e.preventDefault();
        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                img:{
                    label: label,
                    url: URL
                }
            })
        }
        try{
            const response = await fetch('http://localhost:4000/img/', options)
            const data = await response.json()
            
            // increments the imageAdd state to let the imageList know in order to refresh the images and get the new image
            setImageAdd((prev) => {
                return prev+1;
            })
            setOverlay(false)
        } catch (e) {
            console.log(e.message)
        }
        

        
    }

    return(
        <form className="new-image-form">
            <h2>Add a new photo</h2>
            <label>Label</label>
            <input type='text' onChange={handleLabelChange} value={label}/>
            <label>Photo URL</label>
            <input type='text' onChange={handleURLChange} value={URL}/>
            <div className="submit-cancel-btns">
                <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
                <button className="submit-btn" onClick={handleSubmit}>Submit</button>
            </div>
        </form>
    )
}

export default AddImage