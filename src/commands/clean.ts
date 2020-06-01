import { Command } from "../utils/commandsutil";
import { Message } from "discord.js";

export const command = new Command ({
    aliases: ['clean'],
    command: async (message: Message): Promise<Message> => {
        let count: number = 0;
        let Messages = await message.channel.messages.fetch({ limit: 100 });

        Messages.forEach(element => {
            if(element.content.includes('has tripped the alarm') && element.author === message.client.user) {
                if(element.deletable) {
                    element.delete();
                    count++
                }
            }
        });

        if(count == 0) {
            return message.channel.send(`You have 0 messages to clean!`)
        } else {
            message.delete();
            return message.channel.send(`Cleaned ${count} messages about your alarm being tripped.`).then(msg => msg.delete({ timeout: 5000 }))
        }
    },
    description: 'Cleans all messages relating to your alarm (All = all within the last 100 messages)'
});