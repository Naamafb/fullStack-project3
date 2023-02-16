function setRecordsInDatabase(records) {
    // Save the updated records back to the database
    localStorage.setItem('records', JSON.stringify(records));
  }
 
 // return all records from database 
// function getAllContacts() {
//     let records = localStorage.getItem('records');
//     if (records) {
//       return JSON.parse(contacts);
//     } else {
//       return [];
//     }
//   }
  
  // // Add record to database 
  // function addContact(record) {
  //   let records = getAllContacts();
  //   records.push(record);
  //   localStorage.setItem('records', JSON.stringify(records));
  // }


 
 // Update a record in the database by ID
function updateRecordById(id, updatedRecord) {
    const records = getRecordsFromDatabase();
    const index = records.findIndex((record) => record.id === id);
    if (index !== -1) {
      records[index] = {
        ...records[index],
        ...updatedRecord,
      };
      setRecordsInDatabase(records);
    }
  }
  
  // Delete a record from the database by ID
  function deleteRecordById(id) {
    const records = getRecordsFromDatabase();
    const index = records.findIndex((record) => record.id === id);
    if (index !== -1) {
      records.splice(index, 1);
      setRecordsInDatabase(records);
    }
  }
  
  // Retrieve a record from the database by ID
  function getRecordById(id) {
    const records = getRecordsFromDatabase();
    return records.find((record) => record.id === id);
  }
  

  // This is a helper function that retrieves user information from local storage
function getUserInfo() {
    return JSON.parse(localStorage.getItem("user"));
  }
  
  // This function checks if the user is already registered and returns a boolean
  function isUserRegistered(username) {
    const user = getUserInfo();
    return user && user.username === username;
  }
  
  // This function registers a new user by storing their information in local storage
  function registerUser(username, password, otherFields) {
    const user = { username, password, ...otherFields };
    localStorage.setItem("user", JSON.stringify(user));
  }
  
  // This function checks if the provided username and password match the registered user's information
  function isUserApproved(username, password) {
    const user = getUserInfo();
    return user && user.username === username && user.password === password;
  }
  