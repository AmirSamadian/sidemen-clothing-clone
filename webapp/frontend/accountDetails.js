
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
        console.log(data);
        displayData(data);
        //Once the account is created (fetch complete), I want to redirect the user to the Account Details page
        // window.location.href = 'accountDetails.html';
      })
      .catch(error => {
        console.error('Error fetching account data:', error);
      })
  }
  
  //I decided to display the account data one by one (no loop) because there were few of them and not all should be treated the same
  function displayData(data) {
    var accountInfoUL = document.getElementById("accountInformation"); //only the accountDetails.html has this element

    if (accountInfoUL) {  //check that it was able to grab onto this element (element exists?)
      accountInfoUL.innerHTML = ``; // clears existing content out--will need this for dynamic updates

      var info = data[0];
      
      const name_li = document.createElement("li");
      name_li.innerHTML = `<h4>Name: </h4> <p>${info.first_name} ${info.last_name}</p>`;
      accountInfoUL.appendChild(name_li);

      const email_li = document.createElement("li");
      email_li.innerHTML = `<h4>E-mail: </h4> <p>${info.email}</p>`;
      accountInfoUL.appendChild(email_li);

      const phone_li = document.createElement("li");
      if (info.phone_number != null) {
        phone_li.innerHTML = `<h4>Phone Number: </h4> <p>${info.phone_number}</p>`;
      } else {
        phone_li.innerHTML = `<h4>Phone Number: </h4> <p>Not Provided</p>`;
      }
      accountInfoUL.appendChild(phone_li);

      const address_li = document.createElement("li");
      if (info.floor_level == null) {
        info.floor_level = 'N/A'
      }
      address_li.innerHTML = `
          <h4>Address: </h4>
          <ul>
            <li> Street: ${info.street}</li>
            <li> City: ${info.city}</li>
            <li> Country: ${info.country}</li>
            <li> Zip: ${info.zip}</li>
            <li> Floor: ${info.floor_level}</li>
          </ul>`
          accountInfoUL.appendChild(address_li);
    } 
    else {
      console.error("accountInformation ul not found on this page");
    }
  }
  