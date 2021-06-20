const { MessageAttachment } = require('discord.js');
const BaseCommand = require('../../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class RoleCommand extends BaseCommand {
  constructor() {
    super('promotetmod', 'recruit', []);
  }

  async run(client, message, args) {
    //.role @member 
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('You do not have permission to use this command.');
    if (!message.guild.me.hasPermission("ADMINISTRATOR")) return message.channel.send('I require \`MANAGE ROLES\`permission to recruit.')

    const Mod = message.guild.roles.cache.get('828035440569090158');
    const trialMod = message.guild.roles.cache.get('855568797721559060');
    const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    const staffPrefix = 'Mod | '

    if (!Mod) return message.channel.send('There is no Moderator role to remove.');
    if (!args[0]) return message.channel.send("\`.promotetmod @member\` or \`.promotetmod ID\`");
    if (!mentionedMember) return message.channel.send('The member stated is not in the server');
   
    await mentionedMember.roles.add(Mod.id).catch(err => message.channel.send(`I was unable to add the Mod role due to an error: ${err}`));
    await mentionedMember.roles.remove(trialMod.id).catch(err => message.channel.send(`I was unable to remove the Trial Mod role due to an error: ${err}`));
    await mentionedMember.setNickname(staffPrefix + mentionedMember.user.username);

    const movementEmbed = new Discord.MessageEmbed()
    .setTitle("__Movement__")
    .setDescription(`<@${mentionedMember.user.id}> Promoted to Moderator.`)
    .setColor("#48f542")
    .setTimestamp();
    
  const channel = await message.guild.channels.cache.get("854077421166133268");
  channel.send(movementEmbed);
  }
}