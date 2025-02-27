import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
    const [chatMessages, setChatMessages] = useState([]);
    const [gifts, setGifts] = useState([]);
    const [username, setUsername] = useState("");
    const location = useLocation();

    useEffect(() => {
        // Extract the username from the URL query parameters
        const params = new URLSearchParams(location.search);
        const user = params.get("user");
        setUsername(user);

        // Open a WebSocket connection to the server
        const ws = new WebSocket("ws://localhost:3000");

        ws.onopen = () => {
            console.log(`Connected to WebSocket for ${user}`);
        };

        ws.onmessage = (event) => {
            const message = JSON.parse(event.data);

            // Handle chat messages
            if (message.type === "chat") {
                setChatMessages((prevMessages) => [
                    ...prevMessages,
                    message.data,
                ]);
            }

            // Handle gift events
            if (message.type === "gift") {
                setGifts((prevGifts) => [...prevGifts, message.data]);
            }

            // Handle errors (if any)
            if (message.type === "error") {
                alert(message.message);
            }
        };

        ws.onclose = () => {
            console.log("WebSocket connection closed.");
        };

        // Cleanup WebSocket connection on unmount
        return () => {
            ws.close();
        };
    }, [location.search]);

    return (
        <div className="dashboard-container">
            <h1>Connected to: {username}</h1>

            <div className="dashboard-box">
                <h2>Chat Messages</h2>
                <div className="chat-box">
                    {chatMessages.map((msg, index) => (
                        <div key={index} className="chat-message">
                            <strong>{msg.uniqueId}</strong>: {msg.comment}
                        </div>
                    ))}
                </div>
            </div>

            <div className="dashboard-box">
                <h2>Gifts</h2>
                <div className="gift-box">
                    {gifts.map((gift, index) => (
                        <div key={index} className="gift-item">
                            User: {gift.uniqueId} sent gift {gift.giftId}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
