import pkg from 'tunnel-ssh';
const { createTunnel } = pkg;
import pkg2 from 'pg';
const { Pool } = pkg2;
import pkg3 from 'fs';
import dotenv from 'dotenv';
dotenv.config();
import { userInfo } from 'os';
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


 /**********************************************************/
 /*             CRUD FUNCTIONS FOR YOUR PROJECT            */
 /**********************************************************/

// READ data from your database using a SELECT query
const readData = (request, response) => {
	connection.then((conn) => {
		const queryText = "SELECT * FROM project.Product WHERE collection_name = 'SDMN x Hot Wheels'"
		conn.query(queryText, (error, results) => {
			if (error) {
				console.error("Database query error from readData CRUD function: ", error);
				return response.status(500).json({ error: 'Database query failed' });
				// I added these two lines of code for better debugging so I could actually see what the error is.
			}
			response.status(200).json(results.rows);
		})
	});
};

console.log('testing');

const readData2 = (request, response) => {
	console.log("readData2 function called"); 
  
	connection
	  .then((conn) => {
		console.log("Database connection established"); 
		const query = "SELECT * FROM project.Product WHERE collection_name = 'SDMN x Hot Wheels'";
		console.log("Executing query:", query);
  
		conn.query(query, (error, results) => {
		  if (error) {
			console.error("Error executing query:", error);
			response.status(500).json({ error: "Database query failed" });
			return;
		  }
  
		  console.log("Query executed successfully, results:", results.rows);
		  response.status(200).json(results.rows); 
		});
	  })
	  .catch((error) => {
		console.error("Error establishing connection:", error); 
		response.status(500).json({ error: "Database connection failed" });
	  });
  };


  


//CRUD Create
// Add a new row to the database using INSERT INTO
const createData = (request, response) => {
	console.log("createData function called");
	connection.then((conn) => {
		console.log("Database connection established"); 
		const { 
			email, acc_password, first_name, last_name,
			phone_number, country, city, street, zip, floor_level
		} = request.body;

		let floor_level_value;
		if (floor_level.toLowerCase() === 'null') {
			floor_level_value = null;
		} else 
			floor_level_value = floor_level;

		conn.query(
			'INSERT INTO project.Account VALUES (DEFAULT, $1, $2, $3, $4, $5, NOW(), $6, $7, $8, $9, $10)', 

			[
				email, acc_password, first_name, last_name,
				phone_number, country, city, street, zip, floor_level_value
			], 
		
			(error, results) => {
				if (error) {
					console.error("Error executing query:", error);
					response.status(500).json({ error: "Database query failed" });
					return;
				}
				response.status(201).send(`Account added with email ${email} and last name ${last_name}`);
			} )
		})
		.catch((error) => {
			console.error("Error establishing connection:", error); 
			response.status(500).json({ error: "Database connection failed" });
		});;
};





// Update an existing row using UPDATE
// Updating phone numbers
const updateData = (request, response) => {
	connection.then((conn) => {
		const { email, phone_number } = request.body;
		conn.query('UPDATE project.Account SET phone_number = $1 WHERE email = $2',
			[phone_number, email],
			(error, results) => {
				if (error)
					throw error;
				response.status(200).send(`Phone number updated to ${phone_number}`);
			}
		)
	});
};

//Another idea. For discounts, update all products with X attribute, to cut price



// Delete an existing row using DELETE
// Deleting all products from a certain collection. Assuming the termination time has arrived. Termination time checking done in the frontend.
const deleteData = (request, response) => {
	connection.then((conn) => {
		const { collection_name } = request.body;
		conn.query('DELETE FROM Product WHERE collection_name = $1',
			[collection_name],
			(error, results) => {
				if (error)
					throw error;
				response.status(200).send(`The collection ${collection_name} is no longer available.`);
			}
		)
	});
};

// Export the database connection and CRUD functions
export default {
	connection,
	getClasses,
	getClassesById,
	addClass,
	readData,
	createData,
	updateData,
	readData2,
	deleteData
	//getClassesBySemester,
	// updateClass,
	// deleteClass
};