// Use the REST API to get your data 
function loadData() {
    const collection_name = 'SDMN x Hot Wheels'
    fetch(`/testRead/${collection_name}`) 
      .then(response => response.json()) // JSON string returned by the server gets converted to a JSON Object
      .then(data => displayData2(data));  // This function serves the purpose of dynamically displaying the data in the webpage. puts it in the HTML.

    // Add a fetch call for the spring semester as well

}

//I wrote this function to test the endpoint working with fetch. It worked
function displayData2(data) {
  console.log(data);
  const myDataDiv = document.querySelector(".myData");
  myDataDiv.innerHTML = `<h1>${JSON.stringify(data)}</h1>`;
}


// display the data
function displayData(data) {

  // set up the table
  var api_element = document.getElementById("myData");

  // clear existing content out--will need this for dynamic updates
  table.innerHTML = "";

  // loop through the data and display it by adding it to textNodes
  // and appending them

}


// update the database and the view in the UI
function addData() {

  // Make sure any  hidden form variables are set properly

  // Get the form data
  var formData = new FormData(document.getElementById('data_form'));

  // send the code to your endpoint using POST to add new data and then
  // call loadData to reload it
  fetch("/*url of the endpoint*/",
  {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(Object.fromEntries(formData)),
  })
  .then(response => {   // first then checks if the response is ready and if it
    if(!response.ok) {  // is ok (200) or an error (500)
      // if response not ok, throw an error
      return response.text().then(text => {throw new Error(text) })
    }
    else {  // if the response is ok, then send it on to the next then
      return response.text() // use response.text because our POST returns a
    }                   // confirmation string
  })
  // prints out confirmation from DB and updates displayed tables
  .then(data => {console.log(data); loadData();}) 
  // catch the error that occurred and print to the console
  .catch(error => { console.error('Error:', error)});


  // make sure to do this! Otherwise the page will reload rather than the table
  // updating dynamically
  return false;
}

