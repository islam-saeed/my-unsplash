import { useEffect,useState } from "react"

const ImageList = ({imageAdd, searchText}) => {

    // a state to hold the images that has been fetched
    const [ images , setImages] = new useState([])

    // a state that is changed when an image has been deleted in order to refetch
    const [ imageDelete , setImageDelete ] = new useState(0)

    // a state to organize the data in before displaying it
    const [ list , setList ] = new useState([])

    // sends a delete request to the db using the id of the image
    const handleDelete = async (id) => {
        const options = {
            method: 'DELETE'
        }
        try{
            const response = await fetch(`http://localhost:4000/img/${id}`, options)
            setImageDelete(prev => prev+1)
        } catch (e) {
            console.log(e.message)
        }
    }
    
    // first checks if there's any text in the search field and sends a request for it if there is
    // if not then it sends a fetch all request to get all images
    const fetchData = async ()=>{
        let response
        try{
            if(searchText !== ''){
                response = await fetch(`http://localhost:4000/img/search?label=${searchText}`)
            } else {
                response = await fetch("http://localhost:4000/img/")
            }
            const data = await response.json()

            // generates a div for each image that displays its label 
            // and has a delete button that sends a delete request to the db on click
            const loadedImages = data.map(json => {
                const img = new Image()
                img.src = json.img.url
                // the height is calculated using the new width + 100px to keep some free space between divs
                // this is done to keep the original ratio of the image
                return(
                    <div 
                        className="single-image" 
                        key={json._id}
                        style={{
                            width: 400+"px",
                            height: 500*img.height/img.width+"px"
                        }}>
                        <div className="img-overlay">
                            <button onClick={() => handleDelete(json._id)}>delete</button>
                            <h4>{json.img.label}</h4>
                        </div>
                        <img 
                            key={json._id}
                            src={json.img.url} 
                            alt={json.img.label} 
                            style={
                                {height: 500*img.height/img.width+"px"}
                            }
                        />
                    </div>
                )
            })

            // set the state with image divs but they are yet to be organized
            setImages(loadedImages)
        } catch (e) {
            console.log(e.message)
        }
    }
    
    // fetch the data first then fetch again if there was an add/delete/search request sent
    useEffect(() => {
        fetchData()
    }, [imageAdd, imageDelete, searchText])


    // organize the data into columns based on the width of the window to make it responsive
    const handleListColumns = () => {

        // get the width of the window
        const { innerWidth } = window

        // set the number of columns based on the width and 400 is width of the column in pixels
        let columns = new Array(Math.floor(innerWidth/400)).fill([])

        // a counter to be used when transfering the data from the images state to each respective column
        let counter = 0;
        
        // a loop to put each image div in a column based on the creation date
        if(columns[counter]){
            for (let i = 0; i < images.length; i++) {
                columns[counter] = [...columns[counter], images[i] ]
                counter++
                if(counter === columns.length){
                    counter = 0;
                }
            }
        }

        // create a variable that maps the columns array and creates a div for each of them
        const newList = columns.map( (column, index) => {
            return(
                <div key={index} className={`column${index+1}`}>{column}</div>
            )
        })

        // we set the list with the new variable to be displayed
        setList(() => {

            return (
                <>
                    {newList}
                </>
            )
        })
    }

    // an eventlistener to change the number of columns whenever the window width changes
    useEffect( () => {
        window.addEventListener("resize", handleListColumns);
        handleListColumns();
        return () => window.removeEventListener("resize", handleListColumns);
    }, [images])

    // we wait for the images variable to be initialized which signals that the data has been fetched
    // then we display the list that holds the organized data
    return(
        <div className="image-list">
            {images ? list : ""}
        </div>   
    )
}

export default ImageList