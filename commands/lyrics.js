const lfinder = require('lyrics-finder')
const Discord = require('discord.js')

module.exports.run = async (client, message, args, queue, searcher) => {
    /*if(args.length < 1)
        return message.channel.send("Please use the command like !lyrics <artist name>")
    let artist = args.join(" ")
    let songname = '';
    let filter = m => m.content.includes("aaskfnmn")
    let collector = message.channel.createMessageCollector(filter, {max: 1, time: 6000})
    
    collector.on('collect', c => {
        console.log(c.content)
    })

    collector.on('end', collected => {
        console.log("ended")
    })
    //let lyrics = await lfinder(args[0], song_name) || "Not Found!";
    //message.channel.send(lyrics)*/
}
module.exports.config = {
    name: "lyrics",
    aliases: ["ly", "l"]
}