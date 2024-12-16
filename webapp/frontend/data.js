// Use the REST API to get your data 
// function loadData() {
//     const collection_name = 'W2S Birthday'
    // fetch(`/testRead/${collection_name}`) 
      // .then(response => response.json()) // JSON string returned by the server gets converted to a JSON Object
      // .then(data => displayData(data));  // This function serves the purpose of dynamically displaying the data in the webpage. puts it in the HTML.
// }

//I wrote this function to test the endpoint working with fetch. It worked
// function displayData2(data) {
//   console.log(data);
//   const myDataDiv = document.querySelector(".myData");
//   myDataDiv.innerHTML = `<h1>${JSON.stringify(data)}</h1>`;
// }


// display the data
function displayData(data) {
  console.log(data); // Inspect the data in the console to verify its structure

  // set up the table
  const myDataDiv = document.querySelector(".myData");
  myDataDiv.innerHTML = ""; // clear existing content out--will need this for dynamic updates

  // loop through the data and display it by adding it to textNodes and appending them
  data.forEach(row => {
      // Create a <ul> element for the current row
      const ul = document.createElement("ul");

      // Loop through each key-value pair in the row
      for (const [key, value] of Object.entries(row)) {
          // Create an <li> element for the current key-value pair
          const li = document.createElement("li");

          const textNode = document.createTextNode(`${key}: ${value}`);

          // Append the text node to the <li>
          li.appendChild(textNode);
          // Append the <li> to the <ul>
          ul.appendChild(li);
      }

      // Append the <ul> to the container
      myDataDiv.appendChild(ul);
  });
}





// update the database and the view in the UI
function addData() {
  console.log("addData function called");
  // Make sure any  hidden form variables are set properly
    // I don't have any hidden form variables for this form

  // Get the form data
  var formData = new FormData(document.getElementById('create_account_form'));
  const formDataObject = Object.fromEntries(formData); //Converts the FormData into a JS Object so I can access the email from it
  const account_email = formDataObject.email;
  console.log(`account email is: ${account_email}`);

  // send the code to your endpoint using POST to add new data and then
  // call loadData to reload it
  fetch("/createAccount",
  {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(Object.fromEntries(formData)),
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
  .then(data => {console.log(data); loadAccountData(account_email);}) 
  // catch the error that occurred and print to the console
  .catch(error => { console.error('Error:', error)});


  // make sure to do this! Otherwise the page will reload rather than the table
  // updating dynamically
  return false;
}


function loadAccountData(email) {
  fetch(`/accountDetails/${email}`) 
    .then(response => response.json()) 
    .then(data => displayData3(data));
}

function displayData3(data) {
  const displayDiv = document.getElementById("accountDisplay");

  if (displayDiv) {
    let accountInfo = "";
    for (let key in data[0]) {  
      if (data[0].hasOwnProperty(key)) {
        accountInfo += `${key}: ${data[0][key]}<br>`;
      }
    }
    displayDiv.innerHTML = accountInfo;
  }
}