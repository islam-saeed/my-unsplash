import image from '../Capture.PNG'
import { BiSearchAlt2 } from "react-icons/bi";

const Navbar = ({setOverlay,searchText, setSearchText}) => {

    // adds the overlay div to darken the screen
    const handleClick = (e) => {
        e.preventDefault();
        setOverlay(true);
    }

    // sets the searchText state on change to let the ImageList know
    const handleSearchChange = (e) => {
        setSearchText(e.target.value)
    }

    return (
        <nav>
            <div className='logo-container'>
                <img src={image} alt="logo" />
                <div className='search-input'>
                    <span><BiSearchAlt2 /></span>
                    <input type="text" placeholder="Search by name" value={searchText} onChange={handleSearchChange}/>
                </div>
            </div>
            <button onClick={handleClick}>Add a photo</button>
        </nav>
    );
}

export default Navbar;