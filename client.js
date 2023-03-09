class User{
  constructor(name, pass){
    this.userName = name;
    this.password = pass;
  }
}
//new user
var currentUser;
 //FXMLHttpRequest

 class FXMLHttpRequest {
  constructor() {
    this.responseText = "";
    this.network = new Network();
    this.statusCode = "";
    this.status ="";
  }

  open(method, url) {
    this._method = method;
    this._url = url;
  }


  send(data) {
      var request = this._method + " " + this._url + " " + data;
      var response = this.network.send(request);
      response = response.split("/");
      this.statusCode = response[0];
      this.status =  response[1];
      if(response.length === 3){
        this.responseText = response[2];
      }
      this.onload();
  }
}


showTemplate('login-template');

//document.body.appendChild(loginForm.cloneNode(true));
function showTemplate(templateId) {
  // Get the target element and the selected template
  const target = document.getElementById("target-element");
  const template = document.getElementById(templateId);

  // Clone the template's content and replace the target element's content with the clone
  const content = template.content.cloneNode(true);
  while (target.firstChild) {
    target.removeChild(target.firstChild);
  }
  target.appendChild(content);
  if(templateId == "main-template"){
    main();
  }
}

function addNewContact(){
  const Email = document.getElementById("contact-email").value;
  const ContactName = document.getElementById("contact-name").value;
  const Phone = document.getElementById("contact-phone").value;
    
      var contact = {
        name:ContactName,
        email:Email,
        phone: Phone
      };
      var xhr = new FXMLHttpRequest();
      var jsonNewContact = JSON.stringify(contact);
      xhr.open("POST",'/'+currentUser.userName);
      
      xhr.onload= function(){
          if (this.statusCode === "200"){
            showTemplate('main-template');
          }
          else{
            alert(this.status);
          }
      }
      xhr.send(jsonNewContact);
}

function editContact(contactName){
  showTemplate("edit-contact-template");
  document.getElementById("contactName").innerHTML = contactName;

  var xhr = new FXMLHttpRequest();
  xhr.open("GET","/"+currentUser.userName+"/"+contactName);
  xhr.onload=function(){
    if(this.statusCode==="200"){
      var contact = JSON.parse(this.responseText);
      var div1 = document.getElementById("name");
      var name = document.createElement("input");
      name.id ="cName";
      name.placeholder = contact.name;
      div1.appendChild(name);

      var div2 = document.getElementById("email");
      var email = document.createElement("input");
      email.id ="cEmail";
      email.placeholder = contact.email;
      div2.appendChild(email);

      var div3 = document.getElementById("phone");
      var phone = document.createElement("input");
      phone.id = "cPhone";
      phone.placeholder = contact.phone;
      div3.appendChild(phone);
      }
   }
  xhr.send(null);
}

function updateContact(){
  var contactName = document.getElementById("cName");
  var keyName = contactName.placeholder;
  if(contactName.value === ""){
    contactName = contactName.placeholder;
  }
  else{
    contactName = contactName.value;
  }
  var contactEmail = document.getElementById("cEmail");
  if(contactEmail.value === ""){
    contactEmail = contactEmail.placeholder;
  }
  else{
    contactEmail = contactEmail.value;
  }
  var contactPhone = document.getElementById("cPhone");
  if(contactPhone.value === ""){
    contactPhone = contactPhone.placeholder;
  }
  else{
    contactPhone = contactPhone.value;
  }
  var contact = {
    name: contactName,
    email: contactEmail,
    phone: contactPhone
  };
  var xhr = new FXMLHttpRequest();
  var jsonNewContact = JSON.stringify(contact);
  xhr.open("PUT",'/'+currentUser.userName+'/'+keyName);
  xhr.onload=function(){
    if(this.statusCode==="400"){
     alert(this.status);
     document.getElementById("cName").value = "";
    }  
  }
xhr.send(jsonNewContact);
}

function deleteContact(){
  var contactName = document.getElementById("cName").placeholder;
  var xhr = new FXMLHttpRequest();
  xhr.open("DELETE",'/'+currentUser.userName+'/'+contactName);
  xhr.onload=function(){
    if(this.statusCode==="200"){
     showTemplate('main-template');
    }  
  }
xhr.send(null);
}

var buttomList = [];

function main(){
  document.getElementById("userName").innerHTML ="Hello " +currentUser.userName;
 //get all contacts 
 var xhr = new FXMLHttpRequest();
 xhr.open("GET","/"+currentUser.userName+"/contacts" );

 xhr.onload=function(){
    if(this.statusCode==="200"){
      var contacts = JSON.parse(this.responseText);
      var div = document.getElementById("myContacts");
      buttomList = [];
      for(var i=0; i<contacts.length;i++){
        var newButton = document.createElement("button");
        newButton.innerText = JSON.parse(contacts[i]).name;
        newButton.id = JSON.parse(contacts[i]).name; 
        newButton.addEventListener("click", editContact.bind(null, JSON.parse(contacts[i]).name));
        buttomList.push(newButton);
      }
      buttomList.sort(function (a, b) {
        if (a.id < b.id) {
          return -1;
        }
        if (a.id > b.id) {
          return 1;
        }
        return 0;
      });
      for(var i=0; i<buttomList.length;i++){
        div.appendChild(buttomList[i]);
      }
      const nameInput = document.getElementById('name-input');
      nameInput.addEventListener("input", updateValue);
   }
  }
  xhr.send(null);
}

function updateValue(e) {
  if(e.target.value==""){
    for(var i=0; i<buttomList.length;i++){
      buttomList[i].style.backgroundColor = "gainsboro";
    }
  }
}

function checkForLogin(){
   const UserName = document.getElementById("login-username").value;
   const Password = document.getElementById("login-password").value;
   var UserLogin = {
    userName:UserName,
    password: Password
  };
   var xhr = new FXMLHttpRequest();
   var jsonUser = JSON.stringify(UserLogin);
   xhr.open("GET",'/'+ UserName);
      
      xhr.onload= function(){
          if (this.statusCode === "200"){
            currentUser= new User(UserName,Password);
            showTemplate('main-template');
          }
          else{
            alert(this.status);
            if(this.status == "you need to sign in"){
              showTemplate('register-template');
            }
          }
      }
   xhr.send(jsonUser);
}

function logOut(){
  currentUser=null;
  showTemplate('login-template');
}
function RegisterProcess(){
  const Email = document.getElementById("register-email").value;
  const UserName = document.getElementById("register-username").value;
  const Password = document.getElementById("register-password").value;
  const ConfirmPassword = document.getElementById("register-password-Confirm").value;
  if(Password==""||UserName==""||Email==""||ConfirmPassword=="")
  {
    alert("You must fill in all the fields");
  }
  else{
    if(Password === ConfirmPassword){
      var newUser = {
        userName:UserName,
        email:Email,
        password: Password,
        contacts: []
      };
      var xhr = new FXMLHttpRequest();
      var jsonNewUser = JSON.stringify(newUser);
      xhr.open("POST","/*" );
      
      xhr.onload= function(){
          if (this.statusCode === "200"){
            currentUser= new User(UserName,Password);
            showTemplate('main-template');
          }
          else{
            alert(this.status);
            showTemplate('login-template');
          }
      }
      xhr.send(jsonNewUser);
    }
    else{
      alert("the password not match");
    }
  }
}

function searchContact(){
  var contactName = document.getElementById("name-input").value;
  var contactButton = document.getElementById(contactName);
  if(contactButton === null){
    alert("There is no contact with this name");
    document.getElementById("name-input").value ="";
  }
  else{
    contactButton.style.backgroundColor = "#a9e2ab";
  }
}



