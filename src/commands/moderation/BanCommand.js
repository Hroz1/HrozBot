const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class BanCommand extends BaseCommand {
  constructor() {
    super('ban', 'moderation', []);
  }

  async run(client, message, args) {
    //Permission Checking:
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You do not have permission to ban someone.");
    if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("My role does not have the ban permission.");

    //Variables:
    let reason = args.slice(1).join(" ");
    const mentionedMember = message.mentions.members.first();

    //Input Checking:
    if (!reason) reason = 'No reason given.';
    if (!args[0]) return message.channel.send('You must mention someone to ban. \`.ban @user reason\`');
    if (!mentionedMember) return message.channel.send('The member mentioned is not in the server or something went wrong.');
    if (!mentionedMember.bannable) return message.channel.send('I cannot ban that member.');

    //Executing:
    const banEmbed = new Discord.MessageEmbed()
      .setTitle(`You have been banned from ${message.guild.name}`)
      .setDescription(`Reason for being banned: ${reason}`)
      .setColor("#5708ab")
      .setTimestamp();

    const okEmbed = new Discord.MessageEmbed()
      .setDescription(`<@${mentionedMember.user.id}> has been banned.`)
      .setColor("#5708ab")
      .setTimestamp();

    await mentionedMember.send(banEmbed).catch(err => console.log(err));
    await mentionedMember.ban({
      days: 7,
      reason: reason
    }).catch(err => console.log(err)).then(() => message.channel.send(okEmbed));  
  }
}