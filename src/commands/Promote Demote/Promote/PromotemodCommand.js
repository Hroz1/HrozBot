const { MessageAttachment } = require('discord.js');
const BaseCommand = require('../../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class RoleCommand extends BaseCommand {
  constructor() {
    super('promotemod', 'recruit', []);
  }

  async run(client, message, args) {
    //.role @member 
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('You do not have permission to use this command.');
    if (!message.guild.me.hasPermission("ADMINISTRATOR")) return message.channel.send('I require \`MANAGE ROLES\`permission to recruit.')

    const Admin = message.guild.roles.cache.get('853728555481694228');
    const Mod = message.guild.roles.cache.get('828035440569090158');
    const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    const staffPrefix = 'Admin | '

    if (!Admin) return message.channel.send('There is no Administrator role to remove.');
    if (!args[0]) return message.channel.send("\`.promotemod @member\` or \`.promotemod ID\`");
    if (!mentionedMember) return message.channel.send('The member stated is not in the server');
   
    await mentionedMember.roles.add(Admin.id).catch(err => message.channel.send(`I was unable to add the Admin role due to an error: ${err}`));
    await mentionedMember.roles.remove(Mod.id).catch(err => message.channel.send(`I was unable to remove the Mod role due to an error: ${err}`));
    await mentionedMember.setNickname(staffPrefix + mentionedMember.user.username);

    const movementEmbed = new Discord.MessageEmbed()
    .setTitle("__Movement__")
    .setDescription(`<@${mentionedMember.user.id}> Promoted to Administrator.`)
    .setColor("#48f542")
    .setTimestamp();
    
  const channel = await message.guild.channels.cache.get("855570163893010478");
  channel.send(movementEmbed);
  }
}