const { MessageAttachment } = require('discord.js');
const BaseCommand = require('../../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class RoleCommand extends BaseCommand {
  constructor() {
    super('terminate', 'Terminate', []);
  }

  async run(client, message, args) {

    //.role @member 
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('You do not have permission to use this command.');
    if (!message.guild.me.hasPermission("ADMINISTRATOR")) return message.channel.send('I require \`MANAGE ROLES\`permission to terminate someone.')

    const trialMod = message.guild.roles.cache.get('855568797721559060');
    const Mod = message.guild.roles.cache.get('828035440569090158');
    const Admin = message.guild.roles.cache.get('836304393435217930');
    const headAdmin = message.guild.roles.cache.get('855955609257771028');
    const staffTeam = message.guild.roles.cache.get('856167620058546176');
    const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

    if (!trialMod) return message.channel.send('There is no Trial Moderator role to remove.');
    if (!Mod) return message.channel.send('There is no Moderator role to remove.');
    if (!Admin) return message.channel.send('There is no Administrator role to remove.');
    if (!headAdmin) return message.channel.send('There is no Head Administrator role to remove.');
    if (!staffTeam) return message.channel.send('There is no Staff Team role to remove.');
    if (!args[0]) return message.channel.send("\`.terminate @member\` or \`.terminate ID\`");
    if (!mentionedMember) return message.channel.send('The member stated is not in the server');
   
    await mentionedMember.roles.remove(trialMod.id).catch(err => message.channel.send(`I was unable to remove the Trial Moderator role due to an error: ${err}`));
    await mentionedMember.roles.remove(Mod.id).catch(err => message.channel.send(`I was unable to add the Moderator role due to an error: ${err}`));
    await mentionedMember.roles.remove(Admin.id).catch(err => message.channel.send(`I was unable to remove the Administrator role due to an error: ${err}`));
    await mentionedMember.roles.remove(headAdmin.id).catch(err => message.channel.send(`I was unable to remove the Head Administrator role due to an error: ${err}`));
    await mentionedMember.roles.remove(staffTeam.id).catch(err => message.channel.send(`I was unable to remove the Staff Team role due to an error: ${err}`));
    await mentionedMember.setNickname(mentionedMember.user.username);

    const movementEmbed = new Discord.MessageEmbed()
      .setTitle("__Movement__")
      .setDescription(`<@${mentionedMember.user.id}> Terminated.`)
      .setColor("#bf42f5")
      .setTimestamp();
      
    const channel = await message.guild.channels.cache.get("855570163893010478");
    channel.send(movementEmbed);
  }
}