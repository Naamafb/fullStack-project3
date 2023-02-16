const loginTemplate = document.querySelector("#login-template");
const loginForm = loginTemplate.content.querySelector("#login-form");

const registerTemplate = document.querySelector("#register-template");
const registerForm = registerTemplate.content.querySelector("#register-form");

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

  if (event.target.matches("#login-button")) {
      
    const UserName = document.getElementById("login-username").value;
    const Password = document.getElementById("login-password").value;

    var currentUser= JSON.parse(new user(UserName,Password));
    console.log(currentUser);
    // Perform authentication here

    const xhr = new FXMLHttpRequest();

      xhr.open("GET", "/users/");

      xhr.onreadystatechange = function() {
      if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
          const response = JSON.parse(this.responseText);
          console.log(response);
          }
      };

      xhr.send();
  }
});

  class user{
    constructor(name, pass){
      this.userName = name;
      this.password = pass;
    }
  }


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
        responseText = myServer.request(this._method,this._url,data)
    }

  }

  class server{
    constructor() {
      let dataBase = new db();
    }
     request(method,url, dataJson){
        if(method == 'GET'){
          let r = url.split('/');
          if(length(r) == 1){

          }
        }
     }

     response(){

     }
  }