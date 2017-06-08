const config = require("./config.json");
const Discord = require("discord.js");
const Client = new Discord.Client();

Client.on("ready", () => {
	log(`Logged in as user ${Client.user.username}!`);
});

Client.on("message", (msg) => {
	if (msg.author == Client.user && String(msg).match(config.prefix) && ! String(msg).match(/http(s)?/g)) {	
		let cmdList = new Map([
		["lenny", config.pastas[0]],
		["linux", config.pastas[1]],
		["navy",  config.pastas[2]],
		["rust",  config.pastas[3]],
		["fallen", config.react[0]],
		["ooh", config.react[1]],
		["triggered",config.react[2]],
		["oops",config.react[3]],
		["ree",config.react[4]],
		["emojify", emojify(String(msg))]
		]);
		var matches = String(msg).match(/\/(?!\/)\w+/g);
		var msgTmp = String(msg);
		for (i=0; i<matches.length; i++) {
			msgTmp = msgTmp.replace(matches[i],cmdList.get(matches[i].slice(1)));
		}
		matches[0] == "/emojify" ? msg.edit(msgTmp.replace(/[^:]*$/g,"")) : msg.edit(msgTmp);
		log(String(msg));
	} else {
		return;
	}
});

Client.login(config.botToken);

function emojify(msg) {
	var msgTmp = msg.toLowerCase();
	msgTmp = msgTmp.replace(/\/emojify\s/g,"");
	let arr = msgTmp.split(/(?!$)/u);
	var emoji = new Array(arr.length);
	for (i=0; i<arr.length;i++){
		if(arr[i] === " "){
			arr[i] = " ";
			emoji[i] = " ";
		}else if(arr[i].match(/(\W|\d)/g)) {
			switch(arr[i]) {
				case "-":
					arr[i] = ":heavy_minus_sign:";
					emoji[i] = ":ok_woman::skin-tone-" + Math.floor((Math.random() * 5) + 1) + ":";
					break;
				case "!":
					arr[i] = ":exclamation:",
					emoji[i] = ":ok_woman::skin-tone-" + Math.floor((Math.random() * 5) + 1) + ":";
					break;
				case "?":
					arr[i] = ":question:",
					emoji[i] = ":ok_woman::skin-tone-" + Math.floor((Math.random() * 5) + 1) + ":";
					break;
				case ".":
					arr[i] = ":red_circle:"
					emoji[i] = ":ok_woman::skin-tone-" + Math.floor((Math.random() * 5) + 1) + ":";
					break;
				case "1":
					arr[i] = ":one:"
					emoji[i] = ":ok_woman::skin-tone-" + Math.floor((Math.random() * 5) + 1) + ":";
					break;
				case "2":
					arr[i] = ":two:"
					emoji[i] = ":ok_woman::skin-tone-" + Math.floor((Math.random() * 5) + 1) + ":";
					break;
				case "3":
					arr[i] = ":three:"
					emoji[i] = ":ok_woman::skin-tone-" + Math.floor((Math.random() * 5) + 1) + ":";
					break;
				case "4":
					arr[i] = ":four:"
					emoji[i] = ":ok_woman::skin-tone-" + Math.floor((Math.random() * 5) + 1) + ":";
					break;
				case "5":
					arr[i] = ":five:"
					emoji[i] = ":ok_woman::skin-tone-" + Math.floor((Math.random() * 5) + 1) + ":";
					break;
				case "6":
					arr[i] = ":six:"
					emoji[i] = ":ok_woman::skin-tone-" + Math.floor((Math.random() * 5) + 1) + ":";
					break;
				case "7":
					arr[i] = ":seven:"
					emoji[i] = ":ok_woman::skin-tone-" + Math.floor((Math.random() * 5) + 1) + ":";
					break;
				case "8":
					arr[i] = ":eight:"
					emoji[i] = ":ok_woman::skin-tone-" + Math.floor((Math.random() * 5) + 1) + ":";
					break;
				case "9":
					arr[i] = ":nine:"
					emoji[i] = ":ok_woman::skin-tone-" + Math.floor((Math.random() * 5) + 1) + ":";
					break;
				case "0":
					arr[i] = ":zero:"
					emoji[i] = ":ok_woman::skin-tone-" + Math.floor((Math.random() * 5) + 1) + ":";
					break;
			}
		} else {
			arr[i] = ":regional_indicator_" + arr[i] + ":";
			emoji[i] = ":ok_woman::skin-tone-" + Math.floor((Math.random() * 5) + 1) + ":";
		}
	}
	return arr.join(" ") + "\n" + emoji.join(" ");
}


function log(msg){
	var now = new Date();
	var date = [ now.getMonth() + 1, now.getDate(), now.getFullYear() ];
	var time = [ now.getHours(), now.getMinutes(), now.getSeconds() ];
	var suffix = ( time[0] < 12 ) ? "AM" : "PM";
	time[0] = ( time[0] < 12 ) ? time[0] : time[0] - 12;
	time[0] = time[0] || 12;
	  for ( var i = 1; i < 3; i++ ) {
		if ( time[i] < 10 ) {
		  time[i] = "0" + time[i];
		}
	}
	console.log(date.join("/") + " " + time.join(":") + " " + suffix + " : " + msg + "\n");
}