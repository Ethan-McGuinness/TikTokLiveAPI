const express = require('express');
const router = express.Router();

let followerMessageCount = 0;
let lastTimestamp = Date.now();

const resetAndGetCount2 = () => {
    const timestamp = new Date().toISOString();
    const count2Data = {count: followerMessageCount, timestamp};
    followerMessageCount = 0; 
    lastTimestamp = Date.now();
    return count2Data;
};

setInterval(() => {
    const count2Data = resetAndGetCount2();
    console.log("sending count data2: ${JSON.stringify(countData)})");
}, 30000);

const incrementCount2 = () => {
    followerMessageCount++;
};

router.get('/count', (req, res) => {
    try{
    const count2Data = resetAndGetCount2();
    res.json(count2Data);
} catch (error) {
    console.error("Error fetching follower message count:", error);
    res.status(500).json({ error: "Failed to fetch follower message count." });
}
});

module.exports = {router, incrementCount2, resetAndGetCount2 };