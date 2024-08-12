import axios from 'axios';
import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

const Update = () => {
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [isUpdated, setIsUpdated] = useState(false);
  const [error, setError] = useState('');

  const handleUpdate = async () => {
    setError('');  // Clear any previous error messages

    // Basic validation
    if (!currentQuestion.trim() || !currentAnswer.trim()) {
      setError('You must provide the current question and answer to update.');
      return;
    }
    if (!newQuestion.trim() || !newAnswer.trim()) {
      setError('You must provide a new question and answer.');
      return;
    }

    try {
      const response = await axios.put('http://localhost:8800/boards', {
        currentQuestion,
        currentAnswer,
        newQuestion,
        newAnswer,
      });

      if (response.data.message === 'Flashcard updated successfully') {
        console.log('Flashcard updated successfully!');
        setIsUpdated(true);
      } else {
        setError(response.data.error || 'Failed to update flashcard.');
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setError('Bad request: ' + err.response.data.error);
      } else {
        setError('Failed to update flashcard.');
      }
      console.error('Error updating flashcard:', err);
    }
  };

  if (isUpdated) {
    return <Navigate to="/" />;
  }

  return (
    <div className='form'>
      <h1>Update Flashcard</h1>
      <input 
        type="text" 
        placeholder="Enter Current Question" 
        value={currentQuestion} 
        onChange={(e) => setCurrentQuestion(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Enter Current Answer" 
        value={currentAnswer} 
        onChange={(e) => setCurrentAnswer(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Enter New Question" 
        value={newQuestion} 
        onChange={(e) => setNewQuestion(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Enter New Answer" 
        value={newAnswer} 
        onChange={(e) => setNewAnswer(e.target.value)} 
      />
      <button onClick={handleUpdate}>Update Flashcard</button>

      {error && <p className="error">{error}</p>}
      <Link to="/">Cancel</Link>
    </div>
  );
};

export { Update };
