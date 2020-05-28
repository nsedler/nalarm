import { Message } from "discord.js";
import { Command } from "../utils/commandsutil";

export const command = new Command({
    aliases: ['say', 'echo'],
    command: async(message: Message): Promise<Message> => {
        
        return message.channel.send(message.toString().split(' ').splice(1, message.toString().split(' ').length).join(' '));
    },
    description: 'Repeats what you say'
});