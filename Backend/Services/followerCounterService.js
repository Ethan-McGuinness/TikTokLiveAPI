const express = require('express');
const router = express.Router();

// This service tracks the number of follow messages sent in a given time period.
// It resets the count every 30 seconds and provides an endpoint to get the current count.

let followerMessageCount = 0;
let lastTimestamp = Date.now();

// Function to reset the count and return the current count data
const resetAndGetCount2 = () => {
    const timestamp = new Date().toISOString();
    const count2Data = {count: followerMessageCount, timestamp};
    followerMessageCount = 0; 
    lastTimestamp = Date.now();
    return count2Data;
};

// Set an interval to reset the count every 30 seconds
setInterval(() => {
    const count2Data = resetAndGetCount2();
}, 30000);

// Function to increment the follower message count
const incrementCount2 = () => {
    followerMessageCount++;
};

//route to get the current follower message count
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