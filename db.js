
  //////data base
  class Db{
   // constructor(){
    //  this.allUsersName = [];
    //}
    registerUser(jsonUser) {
      var user = JSON.parse(jsonUser);
      var userName = user.userName;
      if(localStorage.getItem(userName)){
        return "400";
      }
      else{
        localStorage.setItem(userName, jsonUser);
       // this.allUsersName.push(userName);
        return "200";
      }
    
    }

    findUser(jsonUser){
      var user = JSON.parse(jsonUser);
      var userName = user.userName;
      var password = user.password;
      var userFromData=localStorage.getItem(userName);
      if(userFromData){
      var user1 = JSON.parse(userFromData);
       if(user1.password==password){
         return ("true")
       }
       else{
         return ("The password is not correct")
       }
     }
     return ("You need to sign in")
   }

    getAllContacts(userName) {
      let USER = localStorage.getItem(userName);
      if (USER) {
         var userJs=JSON.parse(USER)
         var contactsJs=JSON.stringify(userJs.contacts)
        return contactsJs;
      } else {
        return null;
      }
    }

    findContact(userName,contactName){
      let contactsForUser = JSON.parse(this.getAllContacts(userName));
      const index = contactsForUser.findIndex(c => JSON.parse(c).name === contactName);
      if(index!=-1){
        return (contactsForUser[index])
      }
      return null;
    }

    updateContact(userN, contactN, newContactJson){
      let contactsForUser = JSON.parse(this.getAllContacts(userN));
      const index = contactsForUser.findIndex(contact => (JSON.parse(contact)).name === contactN);
      const newIndex = contactsForUser.findIndex(contact => (JSON.parse(contact)).name === (JSON.parse(newContactJson).name));
      if ((index !== -1 && newIndex === -1) // the contact is exist and the new name is free
            || (index !== -1 && index==newIndex)) {   // the contact is exist and the name left same
         contactsForUser[index]= newContactJson;
         var before_the_apdate=JSON.parse(localStorage.getItem(userN))
         var after_the_apdate={
           userName:before_the_apdate.UserName,
           password:before_the_apdate.password,
           email:before_the_apdate.email,
           contacts:contactsForUser
         };
         localStorage.setItem(userN,JSON.stringify(after_the_apdate)) 
         return "200" 
      }
      return "400"
    }


   
    addContact(userName,contact) {

      let contactsForUser = JSON.parse(this.getAllContacts(userName));
      if(contactsForUser.length === 0){
        contactsForUser.push(contact);
        var before_the_apdate=JSON.parse(localStorage.getItem(userName))
        var after_the_apdate={
          userName:before_the_apdate.UserName,
          password:before_the_apdate.password,
          email:before_the_apdate.email,
          contacts:contactsForUser
        };
        localStorage.setItem(userName, JSON.stringify(after_the_apdate));
        return "200"
      }
      const index = contactsForUser.findIndex(c => c.name == JSON.parse(contact).name);
      if (index === -1) {
      contactsForUser.push(contact);
      var before_the_apdate=JSON.parse(localStorage.getItem(userName))
      var after_the_apdate={
        userName:before_the_apdate.UserName,
        password:before_the_apdate.password,
        email:before_the_apdate.email,
        contacts:contactsForUser
      };
      localStorage.setItem(userName, JSON.stringify(after_the_apdate));
      return "200"
      }
      return "400"  
      }


    deleteContact(userName,contactName){
      let contactsForUser = JSON.parse(this.getAllContacts(userName));
      const index = contactsForUser.findIndex(contact => (JSON.parse(contact)).name === contactName);
      if (index !== -1) {
        contactsForUser.splice(index, 1);
        var before_the_apdate=JSON.parse(localStorage.getItem(userName))
      var after_the_apdate={
        userName:before_the_apdate.UserName,
        password:before_the_apdate.password,
        email:before_the_apdate.email,
        contacts:contactsForUser
      };
      localStorage.setItem(userName, JSON.stringify(after_the_apdate));
      return "200"
      }
      return "400" 
    }   
  }
 

  // function deleteRecordById(userName,contactName) {
  //   let contactsForUser = getAllContacts(userName);
  //   const index = contactsForUser.findIndex((contact) => contact.name === contactName);
  //   if (index !== -1) {
  //     contactsForUser.splice(index, 1);
  //     before_the_apdate=JSON.parse(localStorage.getItem(userName))
  //     var after_the_apdate={
  //       userName:before_the_apdate.UserName,
  //       password:before_the_apdate.password,
  //       email:before_the_apdate.email,
  //       contacts:contactsForUser
  //     };
      
  //   }
  // }