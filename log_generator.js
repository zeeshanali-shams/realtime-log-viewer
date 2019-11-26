const fs = require('fs');

var i = 1;

console.log("The file serv.log will start to be written now");

if(fs.existsSync('serv.log') == false) {
	fs.writeFileSync('serv.log', '');
}

while(1) {
	sleep(1000);

	var log = new Date().toLocaleString();

	var num = Math.floor((Math.random() * 100) + 1);

	if(num > 95) {
		log = "[ERROR] [" + log + "] : " + num + " (Value > 95)";
	}
	else {
		log = "[INFO] [" + log + "] : " + num;	
	}

	fs.appendFileSync('serv.log', log + '\n');
	i++;
}

function sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}