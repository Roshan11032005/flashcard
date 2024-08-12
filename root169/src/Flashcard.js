import React, { useState } from 'react';
import PropTypes from 'prop-types';

function Flashcard({ flashcard }) {
  const [flip, setFlip] = useState(false);

  // Handle case where flashcard might be undefined or missing properties
  if (!flashcard) {
    return <div>Loading...</div>; // Or any fallback UI you prefer
  }

  return (
    <div 
      className={`card ${flip ? 'flip' : ''}`} 
      onClick={() => setFlip(!flip)}
    >
      <div className="front">
        <h2>{flashcard.question || 'Question not available'}</h2>
      </div>
      
      <div className="back">
        <h2>{flashcard.answer || 'Answer not available'}</h2>
      </div>
    </div>
  );
}

Flashcard.propTypes = {
  flashcard: PropTypes.shape({
    question: PropTypes.string,
    answer: PropTypes.string
  })
};

Flashcard.defaultProps = {
  flashcard: {
    question: 'No question available',
    answer: 'No answer available'
  }
};

export default Flashcard;
