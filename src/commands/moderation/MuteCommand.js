
const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class MuteCommand extends BaseCommand {
  constructor() {
    super('mute', 'moderation', []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.send('You do not have permission to use this command');
    if (!message.guild.me.hasPermission("MUTE_MEMBERS")) return message.channel.send('I require \`MUTE_MEMBERS\` permission to mute');

    let reason = args.slice(1).join(" ");
    const muteRole = message.guild.roles.cache.get('833284862629904386');
    const memberRole = message.guild.roles.cache.get('');
    const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    const muteEmbed = new Discord.MessageEmbed()
      .setTitle(`You have been Muted in ${message.guild.name}`)
      .setDescription(`Reason for being muted: ${reason}`)
      .setColor("#5708ab")
      .setTimestamp();

    if (!args[0]) return message.channel.send(`\`.mute @member reason\``);
    if (!mentionedMember) return message.channel.send('The member mentioned is not in the server or something went wrong.');
    if (mentionedMember.user.id == message.author.id) return message.channel.send('You cannot mute yourself.');
    if (mentionedMember.user.id == client.user.id) return message.channel.send('You cannot mute the master you silly goose');
    if (!reason) reason = 'No reason given.';
    if (mentionedMember.roles.cache.has(muteRole.id)) return message.channel.send('This member is already muted you muppet');
    if (message.member.roles.highest.position <= mentionedMember.roles.highest.position) return message.channel.send('You cannot mute someone with the same role as you or higher');

    await mentionedMember.send(muteEmbed).catch(err => console.log(err));
    await mentionedMember.roles.add(muteRole.id).catch(err => console.log(err).then(message.channel.send('There was an issue giving the mute role')));

    message.channel.send('Member has been Muted')
 
  }
}