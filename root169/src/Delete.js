import axios from 'axios';
import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

const Delete = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isDeleted, setIsDeleted] = useState(false);
  const [error, setError] = useState('');

  const handleDelete = async () => {
    if (!question || !answer) {
      setError('Both question and answer must be provided.');
      return;
    }

    try {
      const response = await axios.delete('http://localhost:8800/boards', {
        params: { question, answer }
      });

      if (response.data.message === 'Flashcard deleted successfully') {
        console.log('Flashcard deleted successfully!');
        setIsDeleted(true); // Set state to trigger redirection
      } else {
        setError(response.data.error || 'Failed to delete flashcard.');
      }
    } catch (err) {
      setError('Failed to delete flashcard.');
      console.error('Error deleting flashcard:', err);
    }
  };

  // Redirect to home page after successful deletion
  if (isDeleted) {
    return <Navigate to="/" />;
  }

  return (
    <div className='form'>
      <h1>Delete Flashcard</h1>
      <input 
        type="text" 
        placeholder="Enter Question" 
        value={question} 
        onChange={(e) => setQuestion(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Enter Answer" 
        value={answer} 
        onChange={(e) => setAnswer(e.target.value)} 
      />
      <button onClick={handleDelete}>Delete Flashcard</button>

      {error && <p className="error">{error}</p>}
      <Link to="/">Cancel</Link>
    </div>
  );
};

export { Delete };
