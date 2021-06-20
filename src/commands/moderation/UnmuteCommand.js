
const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class UnmuteCommand extends BaseCommand {
  constructor() {
    super('unmute', 'moderation', []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission("MUTEE_MEMBERS")) return message.channel.send('You do not have permission to use this command');
    if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send('I require \`MANAGE_ROLES\` permission to mute');

    let reason = args.slice(1).join(" ");
    const muteRole = message.guild.roles.cache.get('833284862629904386');
    const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    const unmuteEmbed = new Discord.MessageEmbed()
      .setTitle(`You have been UnMuted in ${message.guild.name}`)
      .setDescription(`Reason for being unmuted: ${reason}`)
      .setColor("#5708ab")
      .setTimestamp();

    if (!args[0]) return message.channel.send(`\`.unmute @member reason\``);
    if (!mentionedMember) return message.channel.send('The member mentioned is not in the server or something went wrong.');
    if (mentionedMember.user.id == message.author.id) return message.channel.send('You cannot unmute yourself.');
    if (mentionedMember.user.id == client.user.id) return message.channel.send('You cannot unmute the master you silly goose');
    if (!reason) reason = 'No reason given.';
    if (message.member.roles.highest.position <= mentionedMember.roles.highest.position) return message.channel.send('You cannot unmute someone with the same role as you or higher');

    await mentionedMember.send(unmuteEmbed).catch(err => console.log(err));
    await mentionedMember.roles.remove(muteRole.id).catch(err => console.log(err).then(message.channel.send('There was an issue removing the member role')));

    message.channel.send('Member has been Unmuted')
  }
}