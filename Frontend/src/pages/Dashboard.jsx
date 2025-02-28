import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";

const Dashboard = () => {
    const [chatMessages, setChatMessages] = useState([]);
    const [gifts, setGifts] = useState([]);
    const [username, setUsername] = useState("");
    const location = useLocation();
    const ws = useRef(null);  // Store WebSocket instance

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const user = params.get("user");
        setUsername(user);

        if (!user) return;  // Ensure username is provided

        // Avoid multiple WebSocket connections
        if (ws.current) {
            console.log("WebSocket already exists, not creating a new one.");
            return;
        }

        ws.current = new WebSocket("ws://localhost:3000");

        ws.current.onopen = () => {
            console.log(`WebSocket connected for ${user}`);
            ws.current.send(JSON.stringify({ username: user }));  // Send username
        };

        ws.current.onmessage = (event) => {
            console.log("Received WebSocket message:", event.data);
            const message = JSON.parse(event.data);

            if (message.type === "chat") {
                setChatMessages((prev) => [...prev, message.data]);
            } else if (message.type === "gift") {
                setGifts((prev) => [...prev, message.data]);
            } else if (message.type === "error") {
                alert(message.message);
            }
        };

        ws.current.onerror = (err) => {
            console.error("WebSocket error:", err);
        };

        ws.onclose = (event) => {
            console.error('WebSocket closed. Attempting to reconnect...', event);
            // Reconnect logic
            setTimeout(() => {
                ws = new WebSocket('ws://localhost:3000');
                // Re-establish the connection and reattach event listeners
            }, 3000); // Attempt reconnect after 3 seconds
        };
        

        // Cleanup function
        return () => {
            if (ws.current) {
                ws.current.close();
                ws.current = null;
            }
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
