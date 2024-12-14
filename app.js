// main file to run the server application
import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import path from 'path';
import cors from 'cors';
import db from './db.js';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Use CORS for security
app.use(cors())

// Set up where to find the static frontend elements (html, css, js, images, files, etc.)
const __dirname = path.dirname(new URL(import.meta.url).pathname);
app.use(express.static(path.join(__dirname, '')));

// function for default HTML get request
app.get('/', (request, response) => {

  response.json({ info: 'CS256 Fall 2024 Lab' });
});

// Set API Endpoints
//app.get('/classes', db.getClasses);
//app.get('/classes/:id', db.getClassesById);
//app.post('/classes', db.addClass);

// Add your endpoints here
app.get('/testRead', db.readData);  //each endpoint must have a different '/' Why? Learn about it
app.post('/testCreate', db.createData);
app.get('/testCreate', db.readToTestCreateCRUD)
app.put('/testUpdate', db.updateData);
app.delete('/testDelete', db.deleteData);



// Start server
app.listen(process.env.PORT || 3000, () => {
  console.log('Server listening on port ' + port);
});
