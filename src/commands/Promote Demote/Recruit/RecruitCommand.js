const { MessageAttachment } = require('discord.js');
const BaseCommand = require('../../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class RoleCommand extends BaseCommand {
  constructor() {
    super('recruit', 'recruit', []);
  }

  async run(client, message, args) {
    //.role @member 
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('You do not have permission to use this command.');
    if (!message.guild.me.hasPermission("ADMINISTRATOR")) return message.channel.send('I require \`MANAGE ROLES\`permission to recruit.')

    const trialMod = message.guild.roles.cache.get('855568797721559060');
    const staffTeam = message.guild.roles.cache.get('856167620058546176');
    const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    const staffPrefix = 'TMod | '

    if (!trialMod) return message.channel.send('There is no Trial Mod role to remove.');
    if (!staffTeam) return message.channel.send('There is no Staff Team role to remove.');
    if (!args[0]) return message.channel.send("\`.demote @member\` or \`.demote ID\`");
    if (!mentionedMember) return message.channel.send('The member stated is not in the server');
   
    await mentionedMember.roles.add(trialMod.id).catch(err => message.channel.send(`I was unable to remove the Trial Mod role due to an error: ${err}`));
    await mentionedMember.roles.add(staffTeam.id).catch(err => message.channel.send(`I was unable to remove the Trial Mod role due to an error: ${err}`));
    await mentionedMember.setNickname(staffPrefix + mentionedMember.user.username);

    const movementEmbed = new Discord.MessageEmbed()
    .setTitle("__Movement__")
    .setDescription(`<@${mentionedMember.user.id}> Recruited to Trial Moderator.`)
    .setColor("#42ddf5")
    .setTimestamp();
    
  const channel = await message.guild.channels.cache.get("855570163893010478");
  channel.send(movementEmbed);
  }
}