const express = require('express');
const router = express.Router();

let giftMessageCount = 0;
let lastTimestamp = Date.now();

const resetAndGetCount3 = () => {
    const timestamp = new Date().toISOString();
    const count3Data = {count: giftMessageCount, timestamp};
    giftMessageCount = 0; 
    lastTimestamp = Date.now();
    return count3Data;
};

setInterval(() => {
    const count3Data = resetAndGetCount3();
    console.log("sending count data3: ${JSON.stringify(countData)})");
}, 30000);

const incrementCount3 = () => {
    giftMessageCount++;
};

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