const Discord = require("discord.js");

module.exports.run = async (client, message, args, queue, searcher) => {
    const serverQueue = queue.get(message.guild.id)
    if(!serverQueue)
        return message.channel.send("There is no music currently playing!");
    if(message.member.voice.channel != message.guild.me.voice.channel)
        return message.channel.send("You are not in the voice channel!")

    let currentPage = 0;
    const embeds = generateQueueEmbed(serverQueue);

    const queueEmbed = await message.channel.send(`Current page: ${currentPage+1}/${embeds.length}`, embeds[currentPage])
    await queueEmbed.react('⬅️');
    await queueEmbed.react('➡️');

    const filter = (reaction, user) => ['⬅️', '➡️'].includes(reaction.emoji.name) && (message.author.id === user.id);
    const collector = queueEmbed.createReactionCollector(filter);

    collector.on('collect', (reaction, user) => {
        if (reaction.emoji.name == '➡️'){
            if (currentPage < embeds.length-1){
                currentPage+=1;
                queueEmbed.edit(`Current page: ${currentPage+1}/${embeds.length}`, embeds[currentPage])
            }
        }
        else if (reaction.emoji.name === "⬅️"){
            if (currentPage !== 0) {
                currentPage -= 1;
                queueEmbed.edit(`Current page: ${currentPage+1}/${embeds.length}`, embeds[currentPage])
            }
        }
    })
}

function generateQueueEmbed(serverQueue) {
    const embeds = [];
    let songs = 10;
    for (let i = 0; i < serverQueue.songs.length; i += 10){
        const current = serverQueue.songs.slice(i, songs);
        let k = i
        songs += 10;
        const info = current.map(track => `${++k}. [${track.title}](${track.url})`).join('\n');
        const embed = new Discord.MessageEmbed()
            .setDescription(`Now playing: [${serverQueue.songs[0].title}](${serverQueue.songs[0].url}) \n ${info}`)
        embeds.push(embed);
    }
    return embeds;
}

module.exports.config = {
    name: "queue",
    aliases: ["q", "qu"]
}