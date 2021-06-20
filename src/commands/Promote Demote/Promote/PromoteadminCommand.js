const { MessageAttachment } = require('discord.js');
const BaseCommand = require('../../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class RoleCommand extends BaseCommand {
  constructor() {
    super('promoteadmin', 'recruit', []);
  }

  async run(client, message, args) {
    //.role @member 
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('You do not have permission to use this command.');
    if (!message.guild.me.hasPermission("ADMINISTRATOR")) return message.channel.send('I require \`MANAGE ROLES\`permission to recruit.')

    const headAdmin = message.guild.roles.cache.get('855955609257771028');
    const Admin = message.guild.roles.cache.get('836304393435217930');
    const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    const staffPrefix = 'Head Admin | '

    if (!headAdmin) return message.channel.send('There is no Head Administrator role to remove.');
    if (!args[0]) return message.channel.send("\`.promotemod @member\` or \`.promotemod ID\`");
    if (!mentionedMember) return message.channel.send('The member stated is not in the server');
   
    await mentionedMember.roles.add(headAdmin.id).catch(err => message.channel.send(`I was unable to add the Head Admin role due to an error: ${err}`));
    await mentionedMember.roles.remove(Admin.id).catch(err => message.channel.send(`I was unable to remove the Admin role due to an error: ${err}`));
    await mentionedMember.setNickname(staffPrefix + mentionedMember.user.username);

    const movementEmbed = new Discord.MessageEmbed()
    .setTitle("__Movement__")
    .setDescription(`<@${mentionedMember.user.id}> Promoted to Head Administrator.`)
    .setColor("#48f542")
    .setTimestamp();
    
  const channel = await message.guild.channels.cache.get("855570163893010478");
  channel.send(movementEmbed);
  }
}