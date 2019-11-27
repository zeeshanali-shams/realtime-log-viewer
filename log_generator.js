/**
Log Generator `log-generator.js` is a node.js script to create log in a file called `serv.log`.
**/
const fs = require('fs');

var i = 1;

console.log("The file serv.log will start to be written now");

//Checks the existence of the serv.log file
if(fs.existsSync('serv.log') == false) {
	fs.writeFileSync('serv.log', '');
}

while(1) {
	//Sleeps for an interval of 1000 milisconds
	sleep(1000);

	//Gets the current time for the log
	var log = new Date().toLocaleString();

	var num = Math.floor((Math.random() * 100) + 1);

	if(num > 95) {
		log = "[ERROR] [" + log + "] : " + num + " (Value > 95)";
	} else if(num > 85 && num <= 95) {
		log = "[WARN] [" + log + "] : " + num;	
	} else {
		log = "[INFO] [" + log + "] : " + num;	
	}

	//Inserts the logs in the serv.log
	fs.appendFileSync('serv.log', log + '\n');
	i++;
}

function sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}