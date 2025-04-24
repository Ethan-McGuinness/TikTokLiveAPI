const express = require("express");
const { createWord, getAllWords, deleteWord } = require("../queries/restrictedWords");

const router = express.Router();

// GET all restricted words
router.get("/all", async (req, res) => {
    try {
        const words = await getAllWords();
        res.json(words);
    } catch (error) {
        console.error("Error fetching restricted words:", error);
        res.status(500).json({ error: "Failed to fetch restricted words." });
    }
});

// POST a new restricted word
router.post("/add", async (req, res) => {
    const { word } = req.body;

    if (!word || typeof word !== 'string') {
        return res.status(400).json({ error: "Invalid word." });
    }

    try {
        await createWord(word);
        const updatedWords = await getAllWords();
        res.status(201).json(updatedWords);
    } catch (error) {
        console.error("Error adding restricted word:", error);
        res.status(500).json({ error: "Failed to add restricted word." });
    }
});

// DELETE a restricted word
router.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: "Word ID is required." });
    }

    try {
        await deleteWord(id);
        const updatedWords = await getAllWords();
        res.status(200).json(updatedWords);
    } catch (error) {
        console.error("Error deleting restricted word:", error);
        res.status(500).json({ error: "Failed to delete restricted word." });
    }
});

module.exports = router;
