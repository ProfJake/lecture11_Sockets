var net = require('net');
var rl = require('readline');
/*simple_socket_client.js
A demonstration of a simple socket client that communicates with a simple
tcp socket server (simple_tcp_server.js)
*/
var reader = rl.createInterface({
    input: process.stdin,
    output: process.stdout
});

//connects to an open port on the host on which our server is running
var client = net.createConnection({port:6900, host:'localhost'}, ()  => {
    console.log("Connected to server");
    client.write("Some Test Data\n");
  
    reader.question("What do you want to say to the server?", (response) =>{
	let trimmed = response.toString().trim();
	client.write(`${trimmed}\n`); //sends client response to server
    });
});


//data handler
client.on('data', data =>{
    console.log(data.toString()); //logs the response of the server
    client.end();//closes the connection on the client-side
});

//end event handler
client.on('end', ()=>{
    console.log("Disconnected!"); //prints when the connection closes
    process.exit(0);
});
