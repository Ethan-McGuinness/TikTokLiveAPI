import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username.trim()) {
            // Open a WebSocket connection to the backend server
            const ws = new WebSocket("ws://localhost:3000");

            ws.onopen = () => {
                // Send the username to the backend when WebSocket is open
                ws.send(JSON.stringify({ username }));
                console.log(`Sent username: ${username}`);
            };

            ws.onmessage = (event) => {
                const message = JSON.parse(event.data);
                if (message.type === "error") {
                    alert(message.message); // Handle errors (if any)
                }
            };

            // Navigate to the dashboard once the username is sent
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
