const express = require('express');
const router = express.Router();

// This service tracks the number of chat messages sent in a given time period.
// It resets the count every 30 seconds and provides an endpoint to get the current count.

let chatMessageCount = 0;
let lastTimestamp = Date.now();

// Function to reset the count and return the current count data
const resetAndGetCount = () => {
    const timestamp = new Date().toISOString();
    const countData = {count: chatMessageCount, timestamp};
    chatMessageCount = 0; 
    lastTimestamp = Date.now();
    return countData;
};

// Set an interval to reset the count every 30 seconds
setInterval(() => {
    const countData = resetAndGetCount();
}, 30000);

// Function to increment the chat message count
const incrementCount = () => {
    chatMessageCount++;
};

//route to get the current chat message count
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
