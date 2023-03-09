class Network{
    
    constructor(){
        this.server = new Server();
    }
    send(req){
        return  this.server.request(req);
    }
}