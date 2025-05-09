import { useEffect, useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";
import "./chartGraph.css"; 

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend); 

const ChatGraph = () => {
    const [chartData, setChartData] = useState([]);
    const [timestamp, setTimestamp] = useState([]);

    const [chartData2, setChartData2] = useState([]);
    const [timestamp2, setTimestamp2] = useState([]);

    const [chartData3, setChartData3] = useState([]);
    const [timestamp3, setTimestamp3] = useState([]);

    // Fetch chat data from the server
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

    // Fetch follower data from the server
    const fetchFollowerData = async () => {
        try {
            const response = await fetch("http://localhost:3000/follower-counter/count");
            const data = await response.json();
            const newCount2 = data.count;
            const newTimestamp2 = data.timestamp;

            setChartData2((prev) => [...prev, newCount2]);
            setTimestamp2((prev) => [...prev, newTimestamp2]);

            if (chartData2.length > 10) {
                setChartData2((prev) => prev.slice(1));
                setTimestamp2((prev) => prev.slice(1));
            }
        } catch (error) {
            console.error("Error fetching follower data:", error);
        }
    }

    // Fetch gift data from the server
    const fetchGiftData = async () => {
        try {
            const response = await fetch("http://localhost:3000/gift-counter/count");
            const data = await response.json();
            const newCount3 = data.count;
            const newTimestamp3 = data.timestamp;

            setChartData3((prev) => [...prev, newCount3]);
            setTimestamp3((prev) => [...prev, newTimestamp3]);

            if (chartData3.length > 10) {
                setChartData3((prev) => prev.slice(1));
                setTimestamp3((prev) => prev.slice(1));
            }
        } catch (error) {
            console.error("Error fetching gift data:", error);
        }
    }

    // Fetch data every 30 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            fetchChatData();
            fetchFollowerData();
            fetchGiftData();
        }, 30000); // Fetch every 30 seconds

        fetchChatData(); 
        fetchFollowerData();
        fetchGiftData();
        return () => clearInterval(interval);
    }, []);

    // Chart.js data
    const data = {
        labels: timestamp,
        datasets: [
            {
                label: "Chat Messages",
                data: chartData,
                borderColor: "rgba(75,192,192,1)",
                backgroundColor: "rgba(75,192,192,0.2)",
                tension: 0.1,
            },
            {
                label: "Follower Messages",
                data: chartData2,
                borderColor: "rgba(153,102,255,1)",
                backgroundColor: "rgba(153,102,255,0.2)",
                tension: 0.1,
            },
            {
                label: "Gift Messages",
                data: chartData3,
                borderColor: "rgba(255,159,64,1)",
                backgroundColor: "rgba(255,159,64,0.2)",
                tension: 0.1,
            },
        ]
    };

    
    return (
        <div className="chart-graph-container">
            <h2>Analytics</h2>
            <Line data={data} />
        </div>
    );
};

export default ChatGraph;
