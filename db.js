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



 /**********************************************************/
 /*             CRUD FUNCTIONS FOR YOUR PROJECT            */
 /**********************************************************/


 console.log('testing');

//////////////////////////////// READ CRUDS /////////////////////////////////////


// READ data from your database using a SELECT query
const readData = (request, response) => {
	console.log("readData function called"); 
  
	connection
	  .then((conn) => {
		console.log("Database connection established"); 
		const collection_name = request.params.collection_name;
		const query = "SELECT * FROM project.Product WHERE collection_name = $1";
		console.log("Executing query:", query);
		conn.query(query, [collection_name] , (error, results) => {
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


  //This is just to test if the create CRUD function I did will work if I use get. Required by assignment
  const getAccountDetailsByEmail = (request, response) => {
	console.log("getAccountDetailsByEmail function called"); 
  
	connection
	  .then((conn) => {
		console.log("Database connection established"); 
		const email = request.params.email;
		const query = "SELECT * FROM project.Account WHERE email = $1";
		console.log("Executing query:", query);
  
		conn.query(query, [email], (error, results) => {
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



    //This is just to test if the create CRUD function I did will work if I use get. Required by assignment
	const readToTestUpdateCRUD = (request, response) => {
		console.log("readToTestUpdateCRUD function called"); 
	  
		connection
		  .then((conn) => {
			console.log("Database connection established"); 
			const email = request.params.email;
			const query = "SELECT email, phone_number FROM project.Account WHERE email = $1";
			console.log("Executing query:", query);
	  
			conn.query(query, [email], (error, results) => {
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


	  const readToTestDeleteCRUD = (request, response) => {
		console.log("readToTestDeleteCRUD function called"); 
	  
		connection
		  .then((conn) => {
			console.log("Database connection established"); 
			const query = "SELECT * FROM project.Account";
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



//////////////////////////////// CREATE CRUDS /////////////////////////////////////



//CRUD Create
// Add a new row to the database using INSERT INTO
const insertNewAccount = (request, response) => {
	console.log("insertNewAccount function called");
	connection.then((conn) => {
		console.log("Database connection established"); 
		
		console.log("Request Body:", request.body);

		const { 
			email, password, first_name, last_name,
			phone_number, country, city, street, zip, floor_level
		} = request.body;

		conn.query(
			'INSERT INTO project.Account VALUES (DEFAULT, $1, $2, $3, $4, $5, NOW(), $6, $7, $8, $9, $10)', 

			[
				email, password, first_name, last_name,
				phone_number, country, city, street, zip, floor_level
			], 
		
			(error, results) => {
				if (error) {
					console.error("Error executing query:", error);
					if(error.code == '23505'){
						response.status(500).send(`Database query failed. Input already exists.`);
					}
					response.status(500).json({ error: "Database query failed. Reason other than input already existing." });
					return;
				}
				console.log("Insert executed successfully, results:", results.rows);
				response.status(201).send(`Account added with email ${email} and last name ${last_name}`);
			} )
		})
		.catch((error) => {
			console.error("Error establishing connection:", error); 
			response.status(500).json({ error: "Database connection failed" });
		});;
};


//////////////////////////////// UPDATE CRUDS /////////////////////////////////////



// Update an existing row using UPDATE
// Updating phone numbers
const updateData = (request, response) => {
	console.log("updateData function called");
	connection.then((conn) => {
		console.log("Database connection established");
		const { email, new_number } = request.body;
		conn.query('UPDATE project.Account SET phone_number = $1 WHERE email = $2',
			[new_number, email],
			(error, results) => {
				if (error) {
					console.error("Error executing query:", error);
					response.status(500).json({ error: "Database query failed" });
					return;
				}
				console.log("Update executed successfully, results:", results.rows);
				response.status(200).send(`Account with email: ${email} had phone number updated to ${new_number}`);
			}
		)
	})
	.catch((error) => {
		console.error("Error establishing connection:", error); 
		response.status(500).json({ error: "Database connection failed" });
	});;
};

//Another idea. For discounts, update all products with X attribute, to cut price



//////////////////////////////// DELETE CRUDS /////////////////////////////////////


// Delete an existing row using DELETE
// Deleting all products from a certain collection. Assuming the termination time has arrived. Termination time checking done in the frontend.
const deleteData = (request, response) => {
	console.log("deleteData function called");
	connection.then((conn) => {
		console.log("Database connection established");
		const { account_id } = request.body;
		console.log(account_id);
		conn.query('DELETE FROM project.Account WHERE account_id = $1',
			[account_id],
			(error, results) => {
				if (error) {
					console.error("Error executing query:", error);
					response.status(500).json({ error: "Database query failed" });
					return;
				}

				// I put this to check if any rows were deleted. This doesn't get handled by the error condition above so it will go unoticed.
				if (results.rowCount === 0) {
					console.log(`No account found with id ${account_id}`);
					response.status(404).send(`No account found with id ${account_id}`);
					return;
				}

				console.log(`Delete executed successfully. Deleted ${results.rowCount} row(s).`);
				response.status(200).send(`The account with id ${account_id} is no longer available.`);
			}
		)
	})
	.catch((error) => {
		console.error("Error establishing connection:", error); 
		response.status(500).json({ error: "Database connection failed" });
	});;
};

// Export the database connection and CRUD functions
export default {
	connection,
	readData,
	insertNewAccount,
	getAccountDetailsByEmail,
	updateData,
	deleteData,
	readToTestUpdateCRUD,
	readToTestDeleteCRUD
	// getClasses,
	// getClassesById,
	// addClass,
	//getClassesBySemester,
	// updateClass,
	// deleteClass
};














///Example Crud functions from starter code

 /***********************************************/
 /* EXAMPLE FUNCTIONS--WILL NOT WORK IN YOUR DB */
 /***********************************************/

// Get all classes
// const getClasses = (request, response) => {
// 	connection.then((conn) => {  //Once the ssh tunnel has been created and db connection is created with pool. Promise resolves to db (database connection)
//     conn.query('SELECT * FROM classes', (error, results) => {  // conn is same as db
//       if (error) {
//         throw error;
//       }
//       response.status(200).json(results.rows);
//     });
//  });
// };

// Get classes by ID
// const getClassesById = (request, response) => {
// 	connection.then((conn) => {
//   	const id = request.params.id;

//   	conn.query('SELECT * FROM classes WHERE id = $1', [id], (error, results) => {
// 	    if (error) {
// 	      throw error;
// 	    }
// 	    response.status(200).json(results.rows);
//   	});
// 	});
// };

// Add a new class
// const addClass = (request, response) => {
// 	connection.then((conn) => {
//   	const { id, title, semester, year } = request.body;

//   	conn.query('INSERT INTO classes VALUES ($1, $2, $3, $4)', [id, title, semester, year], (error, results) => {
// 	    if (error) {
// 	      throw error;
// 	    }
// 	    response.status(201).send(`Class added with ID: ${id}`);
//   	});
// 	});
// };
