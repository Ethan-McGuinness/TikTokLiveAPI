import React, { useState, useEffect } from "react";
import "./RestrictedWords.css";

const RestrictedWords = () => {
  const [newWord, setNewWord] = useState("");
  const [words, setWords] = useState([]);

  // Fetch words on component mount
  useEffect(() => {
    fetchWords();
  }, []);

  const fetchWords = async () => {
    try {
      const res = await fetch("http://localhost:3000/restricted-words/all");
      const data = await res.json();
      setWords(data);
    } catch (error) {
      console.error("Failed to fetch words:", error);
    }
  };

  const handleAddWord = async () => {
    if (newWord.trim() === "") return;

    try {
      const res = await fetch("http://localhost:3000/restricted-words/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ word: newWord.trim() }),
      });

      const updatedWords = await res.json();
      setWords(updatedWords);
      setNewWord("");
    } catch (error) {
      console.error("Error adding word:", error);
    }
  };

  const handleDeleteWord = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/restricted-words/delete/${id}`, {
        method: "DELETE",
      });

      const updatedWords = await res.json();
      setWords(updatedWords);
    } catch (error) {
      console.error("Error deleting word:", error);
    }
  };

  return (
    <div className="restricted-words-container">
      <h2>Restricted Words</h2>

      <div className="add-word-container">
        <input
          type="text"
          value={newWord}
          onChange={(e) => setNewWord(e.target.value)}
          placeholder="Enter a new restricted word"
        />
        <button onClick={handleAddWord}>Add Word</button>
      </div>

      <div className="words-list">
        <h3>Current Restricted Words:</h3>
        <ul>
          {words.length > 0 ? (
            words.map((word) => (
              <li key={word.restrictedWord_id}>
                {word.word}
                <button
                  className="delete-button"
                  onClick={() => handleDeleteWord(word.restrictedWord_id)}
                >
                  ✕
                </button>
              </li>
            ))
          ) : (
            <li>No restricted words found</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default RestrictedWords;
