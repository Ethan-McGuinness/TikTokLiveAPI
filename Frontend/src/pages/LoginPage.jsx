import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        if (username.trim()) {
            // Navigate to dashboard — Dashboard will handle WebSocket
            navigate(`/dashboard?user=${username}`);
        } else {
            alert("Please enter a valid TikTok username.");
        }
    };

    return (
        <div className="login-container">
            <video className="background-video" autoPlay loop muted>
                <source src="/phonescreen.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            <div className="login-form-container">
                <div className="phone-screen">
                    <h1 className="title">TIKTOK LIVE API</h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            placeholder="Enter a TikTok username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="input"
                        />
                        <button type="submit" className="button">
                            Enter
                        </button>
                    </form>
                    <div className="phone-home-button">
                        <div className="square"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
