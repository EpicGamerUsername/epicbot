const lfinder = require('lyrics-finder')
const Discord = require('discord.js')

module.exports.run = async (client, message, args, queue, searcher) => {
    if(args.length < 1)
        return message.channel.send("Please use the command like !lyrics <artist name>")
    let artist = args.join(" ")
    let songname = '';
    let filter = m => m.author.id === message.author.id;

    message.channel.send("Please enter the song name now")
    message.channel.awaitMessages(filter, {max: 1, time: 10000}).then(collected => {
        console.log(collected.first().content)
        songname = collected.first().content;
        lyrics(artist, songname, message)
    })
}

async function lyrics(artist, songname, message){
    console.log(`ARTIST: ${artist}, SONGNAME: ${songname}`)
    let lyrics = await lfinder(artist, songname) || "Not Found!";
    message.channel.send(lyrics, { split: true })
}
module.exports.config = {
    name: "lyrics",
    aliases: ["ly", "l"]
}