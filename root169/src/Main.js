import React, { useState, useEffect } from 'react';
import FlashcardList from './FlashcardList';
import './app.css';
import axios from 'axios';
import { Add } from './Add';
import { Link } from 'react-router-dom';
import './Main.css'
export default function Main() {
  const [flashcards, setFlashcards] = useState([]);

  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const res = await axios.get("http://localhost:8800/boards");
        console.log(res);
        setFlashcards(res.data); // Assuming `res.data` contains the flashcards array
      } catch (err) {
        console.log(err);
      }
    };

    fetchFlashcards(); // Call the function to fetch flashcards
  }, []);

  return (
    <>
    <button className='button-Admin'><Link to ="/login">Admin page</Link></button>
   
    
    <FlashcardList flashcards={flashcards} />
    </>
  );
}
