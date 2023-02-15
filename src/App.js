import logo from './logo.svg';
import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {fetchImages, selectAllImages, selectImageStatus} from "./reducers/imagesSlice";
import Image from "./Image";
import {useState} from "react";

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const images = useSelector(selectAllImages);
  const imageStatus = useSelector(selectImageStatus);
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(fetchImages(searchTerm));
    setSearchTerm('');
  };

  let content;

  if (imageStatus === 'loading') {
    content = <div>Loading...</div>;
  } else if (imageStatus === 'succeeded') {
    content = (
        <div className="image-grid">
          {images.map((image) => (
              <Image key={image.id} image={image} />
          ))}
        </div>
    );
  }

  return (
      <div>
        <form onSubmit={handleSearch}>
          <label>
            Search for photos:
            <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </label>
          <button type="submit">Search</button>
        </form>
        {content}
      </div>
  );
}
export default App;
