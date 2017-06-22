const config = require("./config.json");
var fs = require("fs");
var contents = fs.readFileSync("values.json")
var json = JSON.parse(contents)
const Discord = require("discord.js");
const Client = new Discord.Client();

var fs = require("fs");


Client.on("ready", () => {
	log(`Logged in as user ${Client.user.username}!`,false);
	msg = "test";
});

Client.on("message", (msg) => {
	if (msg.author == Client.user && String(msg).match(config.prefix) && ! String(msg).match(/http(s)?/g) && ! String(msg).match(/``` (\w+|\d+|\s+) ```/)) {	
		let cmdList = new Map([
		["emojify", emojify(String(msg))],
		["code", code(String(msg))],
		["react", react(String(msg))],
		["pasta", copypasta(String(msg))]
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
		} else if (matches[0] === "/react") {
			msg.edit(msgTmp.replace(/[^\s]*$/,""));
		} else {
			msg.edit(msgTmp);
		}
		
		
	} else {
		return;
	}
});


function copypasta(msg){
	if(String(msg).indexOf(config.prefix + "pasta") != -1) {
		var msgTmp = String(msg).replace(config.prefix + "pasta ","");
		if(json.copypastas.hasOwnProperty(msgTmp)){
			return(String(eval("json.copypastas"+"[\""+msgTmp+"\"]")));
		}
	}
}

function react(msg){
	if(String(msg).indexOf(config.prefix + "react") != -1) {
		var msgTmp = String(msg).replace(config.prefix + "react ","");
		if(json.react.hasOwnProperty(msgTmp)){
			return(eval("json.react"+"[\""+msgTmp+"\"]"));
		}
	}
}

function emojify(msg) {
	if(String(msg).indexOf(config.prefix + "emojify") != -1) {
		var msgTmp = msg.toLowerCase();
		msgTmp = msgTmp.replace(/\/emojify\s/g,"");
		let arr = msgTmp.split(/(?!$)/u);
		var emoji = new Array(arr.length);
		for (i=0; i<arr.length;i++){
			if(arr[i] != " "){
				if (/[a-z]/i.test(arr[i])) {
					arr[i] = ":regional_indicator_" + arr[i].toLowerCase() + ":";
				} else if(json.emojis.hasOwnProperty(arr[i])){
					arr[i] = eval("json.emojis"+"[\""+arr[i]+"\"]");
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
	if(String(msg).indexOf(config.prefix + "code") != -1) {
		var msgTmp = String(msg).replace(config.prefix + "code ","");
		var lang = msgTmp.match(/\:(\w+)\:/);
		msgTmp = msgTmp.replace(config.prefix+"code"+lang[0],"");
		if(typeof lang != "undefined" && lang != null && lang.length > 0){
			if(json.languages.hasOwnProperty(lang[1])){
				return "```" + eval("json.languages."+lang[1]) + "\n" + msgTmp + "\n ```";
			} else {
				return "```\n" + msgTmp + "\n ```";
			}
		}
	}
}

function log(msg,debug) {
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
	if(debug){
	console.log(date.join("/") + " " + time.join(":") + " " + suffix + " : " + msg + "\n");
	return;
	} else {
	console.log(date.join("/") + " " + time.join(":") + " " + suffix + " : " + msg + "\n");
	}
}

Client.login(config.botToken);