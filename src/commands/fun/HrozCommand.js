const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class SocialCommand extends BaseCommand {
  constructor() {
    super('hroz', 'fun', []);
  }

  async run(client, message, args) {
    const instagramEmbed = new Discord.MessageEmbed()
      .setTitle('Click Me!')
      .setURL('https://www.instagram.com/riza_xhaferi/')
      .setColor('#03fcfc')
      .addField('Check out Hroz\'s Instagram.', 'Press the blue heading.')
      .setTimestamp()
      .setFooter("Hroz\'s Instagram")
  
    await message.channel.send(instagramEmbed).catch(err => console.log(err));
  }
}