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
const __dirname = decodeURIComponent(path.dirname(new URL(import.meta.url).pathname));
app.use(express.static(path.join(__dirname, 'webapp', 'frontend')));




// Default get response for http://localhost:3000/ 
app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname, 'webapp', 'frontend', 'index.html')); 
}); 


//  Endpoints for lab7. 
app.get('/testRead/:collection_name', db.readData);  //each get endpoint must have a different route

//For lab8
app.post('/createAccount', db.insertNewAccount);
app.get('/accountDetails/:email', db.getAccountDetailsByEmail)

app.put('/testUpdate', db.updateData);
app.get('/testUpdate/:email', db.readToTestUpdateCRUD)

app.delete('/testDelete', db.deleteData);
app.get('/testDelete', db.readToTestDeleteCRUD);






// Start server
app.listen(process.env.PORT || 3000, () => {
  console.log('Server listening on port ' + port);
});












// Set API Endpoints. Examples from starter code
//app.get('/classes', db.getClasses);
//app.get('/classes/:id', db.getClassesById);
//app.post('/classes', db.addClass);
