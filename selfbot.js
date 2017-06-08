const config = require("./config.json");
const Discord = require("discord.js");
const Client = new Discord.Client();

Client.on("ready", () => {
	log(`Logged in as user ${Client.user.username}!`);
});

Client.on("message", (msg) => {
	if (msg.author == Client.user && String(msg).match(config.prefix) && ! String(msg).match(/http(s)?/g) && ! String(msg).match(/``` (\w+|\d+|\s+) ```/)) {	
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
		["emojify", emojify(String(msg))],
		["code", code(String(msg))]
		]);
		var matches = String(msg).match(/\/(?!\/)\w+/g);
		var msgTmp = String(msg);
		for (i=0; i<matches.length; i++) {
			msgTmp = msgTmp.replace(matches[i],cmdList.get(matches[i].slice(1)));
		}
		if (matches[0] === "/emojify") {
			msg.edit(msgTmp.replace(/[^:]*$/g,""))
		} else if (matches[0] === "/code") {
			msg.edit(msgTmp.replace(/[^```]*$/g,""));
		} else {
			msg.edit(msgTmp);
		}
		
	} else {
		return;
	}
});

function emojify(msg) {
	if(String(msg).match(/\/(?!\/)\w+/g)[0] === "/emojify") {
		let emojiList = new Map([
			["-",":heavy_minus_sign:"],
			["!",":exclamation:"],
			["?",":question:"],
			[".",":red_circle:"],
			[" "," "],
			["0",':zero:'],
			["1",':one:'],
			["2",':two:'],
			["3",':three:'],
			["4",':four:'],
			["5",':five:'],
			["6",':six:'],
			["7",':seven:'],
			["8",':eight:'],
			["9",':nine:']
		]);
		var msgTmp = msg.toLowerCase();
		msgTmp = msgTmp.replace(/\/emojify\s/g,"");
		let arr = msgTmp.split(/(?!$)/u);
		var emoji = new Array(arr.length);
		for (i=0; i<arr.length;i++){
			if(arr[i] != " "){
				if (/[a-z]/i.test(arr[i])) {
					arr[i] = ":regional_indicator_" + arr[i].toLowerCase() + ":";
				} else if(emojiList.has(arr[i])){
					arr[i] = emojiList.get(arr[i]);
				} else { 
					log("Unkown Symbol \""+arr[i]+"\"");
				}
				emoji[i] = ":ok_woman::skin-tone-" + Math.floor((Math.random() * 5) + 1) + ":";
			} else {
				arr[i] = " ";
				emoji[i] = " ";
			}
		}
		return arr.join(" ") + "\n" + emoji.join(" ");
	}
}

function code(msg) {
	if(String(msg).match(/\/(?!\/)\w+/g)[0] === "/code") {
		let codeList = new Map([
		["java", "java"],
		["markdown", "markdown"],
		["html", "html"],
		["css", "css"],
		["c#","cs"],
		["js","js"],
		["json","json"],
		["",""]
		]);
		
		var msgTmp = String(msg).replace(/\/code\s/,"");
		var lang = msgTmp.match(/\:(\w+)\:/);
		msgTmp = msgTmp.replace(/\/code:\w+:/,"");
		if(typeof lang != "undefined" && lang != null && lang.length > 0){
			if(codeList.has(lang[1])){
				return "```" + codeList.get(lang[1]) + "\n" + msgTmp + "\n ```";
			} else {
				return "```\n" + msgTmp + "\n ```";
			}
		}
	}
}

function log(msg) {
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

Client.login(config.botToken);