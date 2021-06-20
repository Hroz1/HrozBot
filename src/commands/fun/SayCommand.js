const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class SayCommand extends BaseCommand {
  constructor() {
    super('say', 'fun', []);
  }

  async run(client, message, args) {
   const messageToSay = args.join(" ");
   
  try {
    const ree = args.join(" ");
    message.channel.send(ree);
  } catch (err) {
    console.log(err);
    message.channel.send('I am not able to say that message');
  }
  }
}