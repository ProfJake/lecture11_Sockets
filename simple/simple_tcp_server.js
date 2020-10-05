var net  = require('net');
/*simple_tcp_server.js
A simple demonstration of a tcp socket server.  The server tracks what client
sends what message and keeps track of its connections.*/
var count = 0;
var max = 2;
var connections = [];
var server  = net.createServer(function(client){

   

    client.on('data', function(data){
	console.log(`Received from Client ${client.num}:  ${data}`);
    });

    client.on('end', function(){
	console.log(`Client ${client.num} disconnected!`);
	connections.splice(client.num-1,1);
    });



    
});

server.on('connection', (client)=>{
    connections.push[client];
    client.num = ++count;
    
    console.log(`Client ${ client.num } connected from ${client.remoteAddress}`);

    if (count > max){
	client.end("Exceeded max connections! Bye!");
    }
});
    server.listen(6900, ()=>{
    console.log("Server is running");
});

