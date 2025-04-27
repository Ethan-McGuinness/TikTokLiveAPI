const express = require('express');
const router = express.Router();

let chatMessageCount = 0;
let lastTimestamp = Date.now();

const resetAndGetCount = () => {
    const timestamp = new Date().toISOString();
    const countData = {count: chatMessageCount, timestamp};
    chatMessageCount = 0; 
    lastTimestamp = Date.now();
    return countData;
};

setInterval(() => {
    const countData = resetAndGetCount();
    console.log("sending count data: ${JSON.stringify(countData)})");
}, 30000);

const incrementCount = () => {
    chatMessageCount++;
};

router.get('/count', (req, res) => {
    try{
    const countData = resetAndGetCount();
    res.json(countData);
} catch (error) {
    console.error("Error fetching chat message count:", error);
    res.status(500).json({ error: "Failed to fetch chat message count." });
}
});



module.exports = {router, incrementCount, resetAndGetCount };
