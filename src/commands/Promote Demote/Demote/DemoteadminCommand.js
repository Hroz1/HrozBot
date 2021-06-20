const { MessageAttachment } = require('discord.js');
const BaseCommand = require('../../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class RoleCommand extends BaseCommand {
  constructor() {
    super('demoteadmin', 'demote', []);
  }

  async run(client, message, args) {

    //.role @member 
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('You do not have permission to use this command.');
    if (!message.guild.me.hasPermission("ADMINISTRATOR")) return message.channel.send('I require \`MANAGE ROLES\`permission to recruit.')

    const Admin = message.guild.roles.cache.get('836304393435217930');
    const Mod = message.guild.roles.cache.get('828035440569090158');
    const staffPrefix = 'Mod | '
    const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

    if (!Admin) return message.channel.send('There is no Administrator role to remove.');
    if (!Mod) return message.channel.send('There is no Trial Moderator role to add.');
    if (!args[0]) return message.channel.send("\`.demote @member\` or \`.demote ID\`");
    if (!mentionedMember) return message.channel.send('The member stated is not in the server');
   
    await mentionedMember.roles.remove(Admin.id).catch(err => message.channel.send(`I was unable to remove the Administrator role due to an error: ${err}`));
    await mentionedMember.roles.add(Mod.id).catch(err => message.channel.send(`I was unable to add the Moderator role due to an error: ${err}`));
    await mentionedMember.setNickname(staffPrefix + mentionedMember.user.username);

    const movementEmbed = new Discord.MessageEmbed()
      .setTitle("__Movement__")
      .setDescription(`<@${mentionedMember.user.id}> Demoted to Moderator.`)
      .setColor("#ab0808")
      .setTimestamp();
      
    const channel = await message.guild.channels.cache.get("855570163893010478");
    channel.send(movementEmbed);
  }
}