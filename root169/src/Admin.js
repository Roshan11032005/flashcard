import React from 'react';
import { Link } from 'react-router-dom';
import "./Admin.css"
export const Admin = () => {
  return (
    <div className="admin-container">
      <button className="admin-button">
        <Link to="/add">Add</Link>
      </button>
      <button className="admin-button">
        <Link to="/update">Update</Link>
      </button>
      <button className="admin-button">
        <Link to="/delete">Delete</Link>
      </button>
    </div>
  );
};
