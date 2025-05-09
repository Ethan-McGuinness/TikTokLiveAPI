const express = require('express');
const router = express.Router();

// This service tracks the number of gift messages sent in a given time period.
// It resets the count every 30 seconds and provides an endpoint to get the current count.

let giftMessageCount = 0;
let lastTimestamp = Date.now();

// Function to reset the count and return the current count data
const resetAndGetCount3 = () => {
    const timestamp = new Date().toISOString();
    const count3Data = {count: giftMessageCount, timestamp};
    giftMessageCount = 0; 
    lastTimestamp = Date.now();
    return count3Data;
};

// Set an interval to reset the count every 30 seconds
setInterval(() => {
    const count3Data = resetAndGetCount3();
}, 30000);

// Function to increment the gift message count
const incrementCount3 = () => {
    giftMessageCount++;
};

//route to get the current gift message count
router.get('/count', (req, res) => {
    try{
    const count3Data = resetAndGetCount3();
    res.json(count3Data);
} catch (error) {
    console.error("Error fetching gift message count:", error);
    res.status(500).json({ error: "Failed to fetch gift message count." });
}
});

module.exports = {router, incrementCount3, resetAndGetCount3 };