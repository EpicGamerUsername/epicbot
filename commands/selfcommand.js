
module.exports.run = (client, message, args, queue, searcher) => {

    if(args.length < 1)
        return message.channel.send("What role do you want to have?");
    
    switch(args[0].toLowerCase()){
        case 'javascript':
        case 'js':
            promo(message, args[0]);
            break;
        case 'python':
        case 'py':
            promo(message, args[0])
            break;
        case 'gamer':
            promo(message, args[0])
            break;

    }


}

function promo(args){
    
    let role = message.guild.roles.cache.find(role => role.name === args[0])
    
    message.member.roles.add(role);
}

module.exports.config = {
    name: "selfpromote",
    aliases: ["sp", "selfp", "spromo"]
}