import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
    host: 'sql12.freesqldatabase.com',
    user: 'sql12725523',
    password: 'ffgB1CW5p6',
    database: 'sql12725523',
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        process.exit(1);
    }
    console.log('Connected to the MySQL database.');
    connection.release();
});

// Signup Route
app.post('/signup', (req, res) => {
    const sql = "INSERT INTO users (`username`, `phone`, `password`) VALUES (?, ?, ?)";
    const values = [
        req.body.username,
        req.body.phone,
        req.body.password
    ];
    pool.query(sql, values, (err, data) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Failed to sign up' });
        }
        return res.status(201).json({ message: 'User signed up successfully', data });
    });
});

// Login Route
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const sql = "SELECT * FROM users WHERE username = ? AND password = ?";

    pool.query(sql, [username, password], (err, results) => {
        if (err) {
            console.error('Error querying the database:', err);
            return res.status(500).json("Error");
        }

        if (results.length > 0) {
            res.json({ message: 'Login successful', user: results[0] });
        } else {
            res.status(401).json({ error: 'Invalid username or password' });
        }
    });
});

// Get All Boards
// Get Flashcards by Question and Answer
app.get('/boards', (req, res) => {
    const { question, answer } = req.query;
    let query = 'SELECT * FROM boards WHERE 1=1';
    const values = [];
  
    if (question) {
      query += ' AND question = ?';
      values.push(question);
    }
  
    if (answer) {
      query += ' AND answer = ?';
      values.push(answer);
    }
  
    pool.query(query, values, (err, data) => {
      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.json(data);
    });
});

// Create a New Board
app.post('/boards', (req, res) => {
    const { question, answer } = req.body;
    if (typeof question !== 'string' || typeof answer !== 'string') {
        return res.status(400).json({ error: 'Invalid input data' });
    }
    const q = 'INSERT INTO boards (question, answer) VALUES (?, ?)';
    const values = [question, answer];
    pool.query(q, values, (err, data) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Failed to add new board' });
        }
        res.json({ message: 'Flashcard added successfully', data });
    });
});

app.put('/boards', (req, res) => {
    const { currentQuestion, currentAnswer, newQuestion, newAnswer } = req.body;

    if (!currentQuestion || !currentAnswer || !newQuestion || !newAnswer) {
        return res.status(400).json({ error: 'All fields are required: current question, current answer, new question, and new answer.' });
    }

    const q = 'UPDATE boards SET question = ?, answer = ? WHERE question = ? AND answer = ?';
    const values = [newQuestion, newAnswer, currentQuestion, currentAnswer];

    pool.query(q, values, (err, data) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Failed to update flashcard' });
        }

        if (data.affectedRows === 0) {
            return res.status(404).json({ error: 'Flashcard not found' });
        }

        res.json({ message: 'Flashcard updated successfully' });
    });
});

// Delete a Board by Question and Answer
app.delete('/boards', (req, res) => {
    const { question, answer } = req.query;
    
    if (!question || !answer) {
        return res.status(400).json({ error: 'Question and answer must be provided' });
    }
    
    const q = 'DELETE FROM boards WHERE question = ? AND answer = ?';
    pool.query(q, [question, answer], (err, data) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Failed to delete board' });
        }
        // Check if any rows were affected (indicating a successful deletion)
        if (data.affectedRows === 0) {
            return res.status(404).json({ error: 'Flashcard not found' });
        }
        res.json({ message: 'Flashcard deleted successfully', data });
    });
});

// Root Route
app.get('/', (req, res) => {
    res.json('This is the backend');
});

const publicFolder = path.join(__dirname, 'public');
app.use(express.static(publicFolder));

app.get('*', (req, res) => {
    const indexFilePath = path.join(publicFolder, 'index.html');
    res.sendFile(indexFilePath);
});

// Start the Server
const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
    console.log('Server is running on port 8800');
});
