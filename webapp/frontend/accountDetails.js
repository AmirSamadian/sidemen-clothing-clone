
//This js file is only accessible to accountDetails.html so the onload is only applied to that html page.
window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('email');

    if (email) { //if the email was found in the URL params...
        loadAccountData(email);
    } else {
        console.error("No email found in URL");
    }
};



function loadAccountData(email) {
    fetch(`/accountDetails/${email}`) 
      .then(response => response.json()) 
      .then(data => {
        displayData(data);
        //Once the account is created (fetch complete), I want to redirect the user to the Account Details page
        // window.location.href = 'accountDetails.html';
      })
      .catch(error => {
        console.error('Error fetching account data:', error);
      })
  }
  
  function displayData(data) {
    const displayDiv = document.getElementById("accountDisplay"); //only the accountDetails.html has a div with this name
  
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
  