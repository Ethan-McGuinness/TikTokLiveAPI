import { useEffect, useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend); 

const ChatGraph = () => {
    const [chartData, setChartData] = useState([]);
    const [timestamp, setTimestamp] = useState([]);

    const fetchChatData = async () => {
        try {
            const response = await fetch("http://localhost:3000/chat-counter/count");
            const data = await response.json();
            const newCount = data.count;
            const newTimestamp = data.timestamp;

            setChartData((prev) => [...prev, newCount]);
            setTimestamp((prev) => [...prev, newTimestamp]);

            if (chartData.length > 10) {
                setChartData((prev) => prev.slice(1));
                setTimestamp((prev) => prev.slice(1));
            }
        } catch (error) {
            console.error("Error fetching chat data:", error);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            fetchChatData();
        }, 30000); // Fetch every 30 seconds

        fetchChatData(); 
        return () => clearInterval(interval);
    }, []);

    const data = {
        labels: timestamp,
        datasets: [
            {
                label: "Chat Messages",
                data: chartData,
                borderColor: "rgba(75,192,192,1)",
                backgroundColor: "rgba(75,192,192,0.2)",
                tension: 0.1,
            }
        ]
    };

    return (
        <div className="chart-container">
            <h2>Chat Message Count</h2>
            <Line data={data} />
        </div>
    );
};

export default ChatGraph;
