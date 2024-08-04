import './styling.css';
import { Link } from "react-router-dom";
//Header & Navigation

//TODO Include logic for if user is logged in or not

const Banner = () => {
    return (
        <div className='header'>
            <h1>gitArtsy</h1>
            <nav>
                <Link to='/gallery'>git_Inspired</Link>
                <Link to ='/search'>Search</Link>
                <Link to='/'>Login</Link>
            </nav>
        </div>
    );
};




export default Banner