import React, {useState} from "react";
import { registerUser } from "../../services/userService";


export const SignUpForm = () => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");
    const [role, setRole] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerUser(username, email, password, verifyPassword, role);
            setMessage("Registration successful!");
            window.location.href = "/";
        } catch (error) {
            setMessage(error.response?.data?.message);
        }
    };
    
    return(
        <div>
            <h2>Welcome to gitArtsy!</h2>
            <h3>Create an account:</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Username:
                        <input type="text" name="username" value={username} id="username" onChange={(e) => setUsername(e.target.value)} required></input>
                        </label>
                    </div>
                    <div className="form-group">
                        <label>Email:
                        <input type="text" name="email" value={email} id="email" onChange={(e) => setEmail(e.target.value)} required></input>
                        </label>
                    </div>
                    <div className="form-group">
                        <label>Password:
                        <input type="password" name="password" value={password} id="password" onChange={(e) => setPassword(e.target.value)} required></input>
                        </label>
                    </div>
                    <div className="form-group">
                        <label>Verify Password:
                        <input type="password" name="verify" value={verifyPassword} id="verify" onChange={(e) => setVerifyPassword(e.target.value)} required>
                        </input>
                        </label>
                    </div>
                    {/* <div className="form-group">
                        <label for="user-type">Account Type:
                            <label >  
                            <input type="radio" name="user-type" value="ARTIST" id="artist" onChange={(e) => setRole(e.target.value)}></input>
                        Artist</label>
                            
                            <label for="patron">  
                            <input type="radio" name="user-type" value="PATRON" id="patron" onChange={(e) => setRole(e.target.value)}></input>
                        Patron</label>
                        </label>
                    </div> */}
                    <div className="form-group">
                        <label>Account Type:</label>
                            <label htmlFor="artist">
                            <input
                            type="radio"
                            name="user-type"
                            value="ARTIST"
                            id="artist"
                            onChange={(e) => setRole(e.target.value)}
                            required
                            />
                            Artist
                            </label>
                            
                            <label htmlFor="patron">
                            <input
                            type="radio"
                            name="user-type"
                            value="PATRON"
                            id="patron"
                            onChange={(e) => setRole(e.target.value)}
                            />
                            Patron
                            </label>
                    </div>

                    <button type='submit'>Submit</button>
                </form>
                {message && <p>{message}</p>}
        </div>
    )
}

export default SignUpForm