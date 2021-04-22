const Discord = require("discord.js");
const ytdl = require('ytdl-core');
const fs = require('fs');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path
const ffmpeg = require('fluent-ffmpeg');
const timeRegex = /^((((([0-1][0-9])|(2[0-3])):)?([0-5][0-9]:)?[0-5][0-9](.[0-9][0-9][0-9])?$))/g;
ffmpeg.setFfmpegPath(ffmpegPath)
let readStream = null;
module.exports.run = async(client, message, args) =>{        
    const [url,name,timeStart,duration] = args;
    console.log(args)
    if(!url){
        message.channel.send("Please send an url")
        return
    }
    if(!name || !name.match(/[a-z]+/g)){
        message.channel.send("Please enter a name")
        return
    }
    if((timeStart && !timeStart.match(timeRegex)) || (duration && !duration.match(timeRegex))){
        message.channel.send("Please enter the time with this format [[hh:]mm:]ss[.xxx]");
        return
    }
    readStream = ffmpeg(ytdl(url,{ filter: format => format.container === 'mp4'}));
    if(timeStart && !timeStart.match(/^((00:)?00:)?00(.000)?$/g))readStream.setStartTime(timeStart);
    if(duration) readStream.setDuration(duration);
    readStream.output(`./Video/${name}.mp4`)
            .on('end', function(out,err) {
                message.channel.send("Download end")
            })
            .on('error', function(err){
                console.log('error: ', err)
            }).run();
            
    };
//            .setDuration(duration)
module.exports.help = {
    name:"dl",
    cmd:";dl <url_ytb> <nom> [debut] [durée]", 
    help:"\n> Dl les memes que vous voulez"
        +"\n>  /!\\ les unité de temps sont au format [[hh:]mm:]ss[.xxx]"
        +"\n>  /!\\ la durée est le temps du meme et non le timecode ou fini le meme"
}

// function dl(url){
//     return new Promise(function(resolve) {
//         setTimeout(function() {
//             readStream = ytdl(url,{ filter: format => format.container === 'mp4'});
//             console.log('Dl Fait');
//             resolve();
//         }, 3000)
//     });
// }
// function cut(name, timeStart, duration){
//     return new Promise(function(resolve) {
//         setTimeout(function() {
            
//             resolve();
//         }, 30000)
//     });
   
// }

// function send(message){
//     return new Promise(function(resolve) {
//         setTimeout(function() {
//             message.channel.send("Download end");
//             resolve();
//         }, 10000);
//     });
// }


