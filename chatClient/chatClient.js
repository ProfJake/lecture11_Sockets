/*chatClient.js
Jake Levy
Sept 2020
A custom designed chat client program to handle writing data to a chatroom 
server (in class Lab) and receiving data from the server to display on screen.

COPYRIGHT NOTICE:   Using any portion of this program, in whole or in part,
for profit is expressly forbidden.  Using any portion of this program, in 
whole or in part, for any other use, without express written consent of the
author is expressly forbidden. 

Students are especially forbidden from using this in any of their class work 
outside of Professor Levy's NodeJS APW course.
*/
var net = require('net');
var rl = require('readline');
//need a readline interface to get user input
var reader = rl.createInterface({
    input: process.stdin,
    output: process.stdout
});

//this is the IP address of the class AWS server
var client = net.createConnection({port:6900, host:'35.153.51.254'}, ()  => {
    console.log("Connected to server");
});
 var tempStr = ' ';


//When we receive data from the server
client.on('data', data =>{

    //We need to check to see there is data on our stdin stream
    //if we leave it there, it will get mixed up into the console output
    //(there's only one screen).
    
    let temp = reader.line;//store what's currently on the line.

    if (temp.length > 0){
	//if we don't clear the line then the data on input gets combined

	//removes data
	rl.clearLine(reader.input);
	//resets the cursor
	rl.cursorTo(reader.input, 0); 

    }
    //trim any whitespace, preventing users from entering blank lines
    console.log(data.toString().trim());

    reader.prompt(true);  //prompting brings the line back

});

//print any error messages
client.on('error', (err) =>{
    console.log(`********Error: ${err.message}`);
});

//This event is emitted when a connection is closed by the server.
//However at close, end events are also emitted (first). So functionally
//this has the effect of being the message received by a user if they
//try to log on to the server and its not up and running.
client.on('close', ()=>{
	console.log("The Chatroom has been shut down!");
	process.exit(0);
});
//Runs when end is emitted by the connection.  When shut down by either the
//user or server.
client.on('end', ()=>{
	console.log("You are offline:  Bye Bye!");
	process.exit(0);
});
//Make sure prompt is consistent
reader.on('data', (data)=>{
    reader.prompt(true);
});

//handle input data and send it to server or User exit
reader.on('line', response =>{

	if (response.toLowerCase() != "quit"){
	    client.write(response);
	    reader.prompt(true);
	} else {
	    client.end();

	}
	
});
