import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DisclaimerModal from "./DisclaimerModal";
import RestrictedWordsTab from "./RestrcitedWords";
import "./Dashboard.css";

const Dashboard = () => {
    const [chatMessages, setChatMessages] = useState([]);
    const [gifts, setGifts] = useState([]);
    const [follows, setFollows] = useState([]);
    const [username, setUsername] = useState("");
    const [showDisclaimer, setShowDisclaimer] = useState(false); 
    const [activeTab, setActiveTab] = useState();
    const location = useLocation();
    const navigate = useNavigate();
    const ws = useRef(null);
    const chatBoxRef = useRef(null);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const user = params.get("user");
        setUsername(user);

        if (!user) return;

        if (ws.current) {
            console.log("WebSocket already exists, not creating a new one.");
            return;
        }

        const createWebSocket = () => {
            ws.current = new WebSocket("ws://localhost:3000");

            ws.current.onopen = () => {
                console.log(`WebSocket connected for ${user}`);
                ws.current.send(JSON.stringify({ username: user }));
            };

            ws.current.onmessage = (event) => {
                const message = JSON.parse(event.data);

                if (message.type === "chat") {
                    setChatMessages((prev) => [...prev, message.data]);
                } else if (message.type === "gift") {
                    setGifts((prev) => [...prev, message.data]);
                } else if (message.type === "follow") {
                    setFollows((prev) => [...prev, message.data]);
                    console.log(`New follower: @${message.data.uniqueId}`);
                } else if (message.type === "error") {
                    alert(message.message);
                }
            };

            ws.current.onerror = (err) => {
                console.error("WebSocket error:", err);
            };

            ws.current.onclose = (event) => {
                console.error("WebSocket closed. Attempting to reconnect...", event);
                setTimeout(() => {
                    console.log("Attempting to reconnect...");
                    createWebSocket();
                }, 3000);
            };
        };

        createWebSocket();

        return () => {
            if (ws.current) {
                ws.current.close();
                ws.current = null;
            }
        };
    }, [location.search]);

    useEffect(() => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [chatMessages]);

    const handleDisconnect = () => {
        if (ws.current) {
            ws.current.close();
            ws.current = null;
        }
        navigate("/");
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case "restrictedWords":
                return <RestrictedWordsTab />;
            default:
                return <div>Select a Tab</div>
        }
    }

    return (
        <div className="dashboard-container">
            <div className="red-circle"></div>
            <div className="white-circle"></div>
            <div className="blue-circle"></div>

            <div className="header">
                Connected to: {username}
                <button className="disconnect-button" onClick={handleDisconnect}>
                    Disconnect
                </button>
                {/* Circle button for showing the disclaimer */}
                <div
                    className="disclaimer-circle"
                    onClick={() => setShowDisclaimer(true)}
                    title="View Disclaimer"
                > i </div>
            </div>

            {/* Show the DisclaimerModal if state is true */}
            {showDisclaimer && <DisclaimerModal onClose={() => setShowDisclaimer(false)} />}

            {/* Tab Navigation */}
            <div className="tabs-section">
                <button
                className={`tab ${activeTab === "restrictedWords" ? "active" : ""}`}
                onClick={() => setActiveTab("restrictedWords")}
                > Restricted Words</button>
                <div className="tab-content">
                {renderTabContent()}
                </div>
            </div>
          
            



            <div className="chat-section">
                <h2>Chat Messages</h2>
                <div className="chat-box" ref={chatBoxRef}>
                    {chatMessages.map((msg, index) => (
                        <div key={index} className="chat-message">
                            <div className="user-info">
                                <img
                                    src={msg.profilePictureUrl || "default-avatar.png"} 
                                    alt={msg.uniqueId}
                                    className="user-avatar"
                                />
                                <strong>{msg.uniqueId}</strong>
                            </div>
                            <p>{msg.comment}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="gift-section">
                <h2>Gifts</h2>
                <div className="gift-box">
                    {gifts.map((gift, index) => (
                        <div key={index} className="gift-item">
                            User: {gift.uniqueId} sent gift {gift.giftId}
                        </div>
                    ))}
                </div>
            </div>

            <div className="follow-section">
                <h2>Follows</h2>
                <div className="follow-box">
                    {follows.map((follow, index) => (
                        <div key={index} className="follow-item">
                            🆕 @{follow.uniqueId} followed!
                        </div>
                    ))}
                </div>
            </div>


        </div>
    );
};

export default Dashboard;
