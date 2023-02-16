const loginTemplate = document.querySelector("#login-template");
const loginForm = loginTemplate.content.querySelector("#login-form");

const registerTemplate = document.querySelector("#register-template");
const registerForm = registerTemplate.content.querySelector("#register-form");

const mainTemplate = document.querySelector("#main-template");
const mainForm = registerTemplate.content.querySelector("#main-form");

document.body.appendChild(loginForm.cloneNode(true));

document.addEventListener("click", (event) => {
  if (event.target.matches("#toggle-form a")) {
    event.preventDefault();

    if (document.querySelector("#login-form")) {
      document.body.replaceChild(registerForm.cloneNode(true), document.querySelector("#login-form"));
    } else {
      document.body.replaceChild(loginForm.cloneNode(true), document.querySelector("#register-form"));
    }
  }
  var currentUser;



  ////login
  if (event.target.matches("#login-button")) {
      
    const UserName = document.getElementById("login-username").value;
    const Password = document.getElementById("login-password").value;
    document.body.replaceChild(mainForm.cloneNode(true), document.querySelector("#main-form"));

    currentUser= new user(UserName,Password);
    console.log(currentUser);
    // Perform authentication here

    var u={
      userName:"naama",
      password:12345,
      email:"naamafb12@gmail.com",
      contacts:[
        {
          name:"shiri",
          phone:0545442,
          mail:"shiriguli@gmail.com"
        }
      ]
    };
    
    localStorage.setItem(u.userName,JSON.stringify(u))
    //console.log(localStorage.getItem(u.userName))
    var xhr = new FXMLHttpRequest();

      xhr.open("GET", "/contacts");

      // xhr.onreadystatechange = function() {
      // if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      //     const response = JSON.parse(this.responseText);
      //     console.log(response);
      //     }
      // };

      xhr.onload= function(){
        //document.getElementById("demo").innerHTML = JSON.parse(this.responseText);
        console.log(this.responseText)
      };

      xhr.send(null);
      console.log(xhr.responseText)
  }
}
  );

  class user{
    constructor(name, pass){
      this.userName = name;
      this.password = pass;
    }
  }


  //FXMLHttpRequest

  class FXMLHttpRequest {
    constructor() {
      this.responseText = "";
    }
  
    open(method, url) {
      this._method = method;
      this._url = url;
    }
  
    send(data) {
        let myServer = new server();
        this.responseText = myServer.request(this._method,this._url,data)
    }

  }

  /////server
  class server{
    constructor() {
      let dataBase = new db();
    }
     request(method,url, dataJson){
        if(method == 'GET'){
          let r = url.split('/');
          if(r.length == 1){
            getAllRecords(currentUser.userName)
          }
        }
     }

     response(){

     }
  }



  //////data base
  class db{
    getAllContacts(userName) {
      let USER = localStorage.getItem(userName);
      if (USER) {
         var userJs=JSON.parse(USER)
        return (userJs.contacts);
      } else {
        return [];
      }
    }
     addContact(userName,contact) {
      let contactsForUser = getAllContacts(userName);
      contactsForUser.push(contact);
      before_the_apdate=JSON.parse(localStorage.getItem(userName))
      var after_the_apdate={
        userName:before_the_apdate.UserName,
        password:before_the_apdate.password,
        email:before_the_apdate.email,
        contacts:contactsForUser
      };
      
      localStorage.setItem(userName, JSON.stringify(after_the_apdate));
    }  
  }
  function deleteRecordById(userName,contactName) {
    let contactsForUser = getAllContacts(userName);
    const index = contactsForUser.findIndex((contact) => contact.name === contactName);
    if (index !== -1) {
      contactsForUser.splice(index, 1);
      before_the_apdate=JSON.parse(localStorage.getItem(userName))
      var after_the_apdate={
        userName:before_the_apdate.UserName,
        password:before_the_apdate.password,
        email:before_the_apdate.email,
        contacts:contactsForUser
      };
      
    }
  }


 

  
