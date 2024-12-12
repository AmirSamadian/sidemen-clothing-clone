import pkg from 'tunnel-ssh';
const { createTunnel } = pkg;
import pkg2 from 'pg';
const { Pool } = pkg2;
import pkg3 from 'fs';
const { readFileSync } = pkg3;

let sshOptions = {
    host: process.env.SSH_HOST,
    port: 22,
    username: process.env.SSH_USER,
    privateKey: readFileSync(process.env.SSH_PRIVATE_KEY),
	passphrase: process.env.SSH_PASSPHRASE
};

let tunnelOptions = {
	autoClose: true
};

let forwardOptions = {
	srcAddr: process.env.LOCAL_HOST,
	srcPort: process.env.LOCAL_PORT,
	dstAddr: process.env.REMOTE_HOST,
    dstPort: process.env.REMOTE_PORT
};

let serverOptions = {
	port: process.env.LOCAL_PORT
};

let connection = new Promise(function(resolve, reject){
	
	createTunnel(tunnelOptions, serverOptions, sshOptions, forwardOptions).
		then(([server, client], error)=>{

			server.on('error',(e)=>{
				console.log(e);
			});

			client.on('error',(e)=>{
				console.log(e);
			});

			console.log('database connection initalizing');

			//use `postgres` connection as usual
			var db = new Pool({
					database: process.env.DATABASE_NAME,
					port:     process.env.LOCAL_PORT,
					user:     process.env.SSH_USER,
					password:	process.env.DATABASE_PASSWORD
			});

		// send back the connection to the database
		// once the asynchronous ssh connection is made
		resolve(db)
	});
});

 /***********************************************/
 /* EXAMPLE FUNCTIONS--WILL NOT WORK IN YOUR DB */
 /***********************************************/

// Get all classes
const getClasses = (request, response) => {
	connection.then((conn) => {  //Once the ssh tunnel has been created and db connection is created with pool. Promise resolves to db (database connection)
    conn.query('SELECT * FROM classes', (error, results) => {  // conn is same as db
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    });
 });
};

// Get classes by ID
const getClassesById = (request, response) => {
	connection.then((conn) => {
  	const id = request.params.id;

  	conn.query('SELECT * FROM classes WHERE id = $1', [id], (error, results) => {
	    if (error) {
	      throw error;
	    }
	    response.status(200).json(results.rows);
  	});
	});
};

// Add a new class
const addClass = (request, response) => {
	connection.then((conn) => {
  	const { id, title, semester, year } = request.body;

  	conn.query('INSERT INTO classes VALUES ($1, $2, $3, $4)', [id, title, semester, year], (error, results) => {
	    if (error) {
	      throw error;
	    }
	    response.status(201).send(`Class added with ID: ${id}`);
  	});
	});
};


 /***********************************************/
 /*       CRUD FUNCTIONS FOR YOUR PROJECT       */
 /***********************************************/

// READ data from your database using a SELECT query
const readData = (request, response) => {
	connection.then((conn) => {

    // Write a query to SELECT data fron your DB

	});
};

// Add a new row to the database using INSERT INTO
const createData = (request, response) => {
	connection.then((conn) => {
  	const { id, title, semester, year } = request.body;

  	    // Write a query to INSERT data into your DB

	});
};

// Update an existing row using UPDATE
const updateData = (request, response) => {
	connection.then((conn) => {

    // Add a query to UPDATE data in your DB

	});
};

// Delete an existing row using DELETE
const deleteData = (request, response) => {
	connection.then((conn) => {

    // Add a query to DELETE data in your DB

	});
};

// Export the database connection and CRUD functions
export default {
	connection,
	getClasses,
	getClassesById,
	//getClassesBySemester,
	addClass
	// updateClass,
	// deleteClass
};