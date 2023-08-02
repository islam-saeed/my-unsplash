import Navbar from './components/Navbar';
import ImageList from './components/ImageList';
import AddImage from './components/AddImage';

import { useState } from 'react';

function App() {
  // flag state to show the overlay div when adding an image
  const [overlay, setOverlay] = useState(false);

  // state to know when an image has been added
  const [imageAdd, setImageAdd] = useState(0);

  // state to get the text that has been typed in the search input
  const [ searchText , setSearchText ] = new useState('')

  // removes the overlay by negating the flag
  const handleClick = () => {
    setOverlay(false)
  }

  return (
    <div 
      className="App" 
      style={{
        overflowY: overlay ? "hidden" : "",
        height: overlay ? "100vh" : "auto",
      }}>
      {overlay && <div className='overlay' onClick={handleClick}></div>}
      {overlay && <AddImage setOverlay={setOverlay} setImageAdd={setImageAdd} />}
      <Navbar setOverlay={setOverlay} searchText={searchText} setSearchText={setSearchText} />
      <ImageList imageAdd={imageAdd} searchText={searchText} />
    </div>
  );
}

export default App;
