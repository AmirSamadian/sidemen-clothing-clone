//Keeps track of whether a user of the site is signed in or no.
var hasAccount = false;

// update the database and the view in the UI
function addData() {
  console.log("addData function called");
  // Get the form data
  var formData = new FormData(document.getElementById('create_account_form'));
  const formDataObject = Object.fromEntries(formData); //Converts the FormData into a JS Object so I can access the email from it
  console.log("Raw FormDataObject:", formDataObject);
  console.log("Payload sent to server:", JSON.stringify(formDataObject));

  const account_email = formDataObject.email;
  console.log(`account email is: ${account_email}`);

  //make sure all empty strings given by the form are entered as null
  Object.keys(formDataObject).forEach(attribute => {
    if (formDataObject[attribute] === '')
      formDataObject[attribute] = null;
  });

  // send the code to your endpoint using POST to add new data and then call loadData to reload it
  fetch("/createAccount",
  {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formDataObject),
  })
  .then(response => {   // first then checks if the response is ready and if it
    if(!response.ok) {  // is ok (200) or an error (500)
      return response.text().then(text => {throw new Error(text) })    // if response not ok, throw an error
    }
    else {  // if the response is ok, then send it on to the next then
      return response.text() // use response.text because our POST returns a confirmation string
    }                  
  })
  // prints out confirmation from DB and updates displayed tables
  .then(data => {
    console.log(data); 
    hasAccount = true;
    console.log(hasAccount);
    confirmAccountCreation(account_email);
  }) 
  // catch the error that occurred and print to the console
  .catch(error => { console.error('Error:', error)});

  return false;   // make sure to do this! Otherwise the page will reload rather than the table updating dynamically
}



function confirmAccountCreation(email) {
  const p_with_link = document.querySelector('#to_account_details');
  p_with_link.innerHTML = `<a href="accountDetails.html?email=${encodeURIComponent(email)}">View Account Details</a>`

  //Changing the display of the create account page
  const form = document.querySelector('.login');
  const confirmation = document.querySelector('.registrationConfirmation');
  form.style.display = 'none';
  confirmation.style.display = 'flex';

  //make sure this doesn't refresh the page whenever it gets called.
}
