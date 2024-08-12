import React, { useState } from 'react';
import Flashcard from './Flashcard';
import "./Flash.css"

export default function FlashcardList({ flashcards }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  const handleNext = () => {
    setFlipped(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
  };

  const handlePrevious = () => {
    setFlipped(false);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
  };

  const flashcard = flashcards[currentIndex];

  return (
    <div className="flashcard-list">
      <Flashcard
        flashcard={flashcard}
        onFlip={handleFlip}
        flipped={flipped}
      />
      <div className="controls">
        <button onClick={handlePrevious}>Previous</button>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
}
