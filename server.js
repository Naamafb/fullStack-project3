
class Server{
    constructor() {
      this.dataBase = new Db();
    }
     request(req){
        var request = req.split(' ');
        var method = request[0];
        var url = request[1];
        var data = request[2];

        if(method == 'GET'){
          var item;
          var status;
          var statusCode;
          let r = url.split('/');  
          if(r.length === 3 ){     // /sapir/contacts
            if(r[2]==="contacts"){//get all contacts  
              item= this.dataBase.getAllContacts(r[1]);
              if(item.length===0){
                statusCode="400"
                status="No contacts exist"
              }
              else{
                statusCode="200"
                status="OK"
              }
              return statusCode +  '/'  + status +  '/'  + item 
            }
            else{  //get specific contact      /sapir/naama 
              item=this.dataBase.findContact(r[1],r[2])
              if(item){
                statusCode="200"
                status="OK"
              }
              else{
                statusCode="400"
                status="There is no contact with this name"
              }
              return statusCode +  '/' + status +  '/'  + item
            }
          }
          if(r.length === 2 ){ //check if user is exist  /sapir 
            var ans = this.dataBase.findUser(data);
            if(ans == "true"){
              statusCode="200"
              status="OK"
            }
            else{
              statusCode="400"
              if(ans == "The password is not correct"){
                status="The password is not correct"
              }
              else{
                status="You need to sign in"
              }
            }
            return statusCode + '/' + status
          }
        }
        
      if(method=='POST'){
          let r = url.split('/');
          if(r.length === 2){  
            if( r[1] ==='*'){  // add new user 
              var statusCode = this.dataBase.registerUser(data);
              var status = "";
              if(statusCode === "200"){
                 status = "OK"
              }
              else{
                status = "A user with this name exists, try to find diffrent name or to login"
              }
              return statusCode +'/'+ status;
            }
            else{   // add new contact to user 
              var statusCode = this.dataBase.addContact(r[1],data);
              var status = "";
              if(statusCode === "200"){
                 status = "OK"
              }
              else{
                status = "There is contact with this name, try to find diffrent name"
              }
              return statusCode +  '/' + status;
              
            }
          }
        }
        if(method=='DELETE'){
          let r=url.split('/');
          if(r.length===3){
              var statusCode = this.dataBase.deleteContact(r[1],r[2]);
              var status = "";
              if(statusCode === "200"){
                 status = "OK"
              }
              else{
                status = "BadRequest"
              }
              return statusCode +  '/' +status;
              
            }
          }
        
        if(method=='PUT'){
          let r = url.split('/');
          if(r.length === 3 ){
            var statusCode =this.dataBase.updateContact(r[1],r[2],data);
              var status = "";
              if(statusCode === "200"){
                 status = "OK"
              }
              else{
                status = "There is alredy contact with this name";
              }
              return statusCode +  '/' + status;
              
          }
          
        }
        
        return null;
     }
  }