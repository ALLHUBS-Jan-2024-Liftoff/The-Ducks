import Banner from "../Banner";
import ArtGallery from "./ArtGallery";
import './ArtGallery.css';


const Gallery = () => {
    return(
        <div>
            <Banner />
            <div>
                <h2>From the Masters:</h2>
            </div>
            <ArtGallery />
            <div>
                <h3>From your Fellow Artist:</h3>
            </div>
        </div>
    )
}




export default Gallery