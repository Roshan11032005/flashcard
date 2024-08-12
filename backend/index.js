import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import path from 'path';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors());
app.use(express.json());

// Set up MySQL connection pool
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

// Check database connection
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        process.exit(1);
    }
    console.log('Connected to the MySQL database.');
    connection.release();
});

// Define API routes
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

// More API routes (boards CRUD)...

// Serve static files from the build directory
const publicFolder = path.join(__dirname, 'build');
app.use(express.static(publicFolder));

// Catch-all route to serve index.html for any other routes
app.get('*', (req, res) => {
    const indexFilePath = path.join(publicFolder, 'index.html');
    res.sendFile(indexFilePath);
});

// Start the server
const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

