import axios from 'axios';
import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import "./Add.css"
export const Add = () => {
  const [flash, setFlash] = useState({
    question: "",
    answer: "",
  });

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/boards", flash);
      console.log("Flashcard added successfully!");
      Navigate("/")
    } catch (err) {
      console.error("Error adding flashcard:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFlash((prevFlash) => ({
      ...prevFlash,
      [name]: value,
    }));
  };

  return (
    <div className='form'>
      <h1>Add New Flashcard</h1>
      <input 
        type="text" 
        placeholder="Question" 
        name="question" 
        value={flash.question} 
        onChange={handleChange} 
      />
      <input 
        type="text" 
        placeholder="Answer" 
        name="answer" 
        value={flash.answer} 
        onChange={handleChange} 
      />
      <button onClick={handleClick}><Link to ="/">Add</Link></button>
    </div>
  );
};
