import { Message, Client } from "discord.js";
import { Command } from "../utils/commandsutil";

export const command = new Command({ 
    aliases: ['quit', 'stop', 'kill', 'die'],
    command: async(message: Message): Promise<void> => {
        
        return message.channel.send("Bye bye...").then(() => message.client.destroy()).then(() => process.exit(1));
    },
    description: 'Shutsdown the bot',
    ownerOnly: true
});