const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database/db');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Welcome message and list of endpoints
app.get('/', (req, res) => {
  res.send(`
    <h1>Welcome to rcubot:</h1>
    <p>Test Available Endpoints:</p>
    <ul>
      <li>GET /create-table <a href="/create-table">Create Table </a></li>
      <li>GET /entries <a href="/entries">Get All Entries</a></li>
      <li>POST /entries - Add Entry (requires JSON body with 'name' field)</li>
      <li>PUT /entries/:id - Update Entry by ID (requires JSON body with 'name' field)</li>
      <li>DELETE /entries/:id - Delete Entry by ID</li>
    </ul>
  `);
});


// Endpoint to create a table
app.get('/create-table', async (req, res) => {
  try {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS example_table (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100)
      )
    `;
    await db.query(createTableQuery);
    res.status(200).send({ message: 'Table created successfully' });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// Endpoint to get all entries from the database
app.get('/entries', async (req, res) => {
  try {
    const queryResult = await db.query('SELECT * FROM example_table');
    res.status(200).json(queryResult.rows);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// Endpoint to update an entry in the database by ID
app.put('/entries/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const updateQuery = 'UPDATE example_table SET name = $1 WHERE id = $2';
    await db.query(updateQuery, [name, id]);
    res.status(200).send({ message: 'Entry updated successfully' });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// Endpoint to add a new entry to the database
app.post('/entries', async (req, res) => {
  const { name } = req.body;

  try {
    const insertQuery = 'INSERT INTO example_table (name) VALUES ($1)';
    await db.query(insertQuery, [name]);
    res.status(200).send({ message: 'Entry added successfully' });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// Endpoint to delete an entry from the database by ID
app.delete('/entries/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deleteQuery = 'DELETE FROM example_table WHERE id = $1';
    await db.query(deleteQuery, [id]);
    res.status(200).send({ message: 'Entry deleted successfully' });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = { app };