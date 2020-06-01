import { Command } from "../utils/commandsutil";
import { Message } from "discord.js";

export const command = new Command ({
    aliases: ['purge', 'clear'],
    command: async (message: Message): Promise<Message> => {

        let args: string[] = message.content.split(' ');
        let toPurge: number = Number(args[1]);
        
        if(toPurge < 1 || toPurge > 100 || toPurge == NaN) {
            return message.channel.send('You must purge between 1 and 100 messages.').then(msg => msg.delete({ timeout: 5000 }));
        } else {
            if(message.member?.hasPermission('MANAGE_MESSAGES') && message.guild?.me?.hasPermission('MANAGE_MESSAGES')) {
                message.delete();
                message.channel.bulkDelete(toPurge);

                return message.channel.send(`${toPurge} messages have been purged.`).then(msg => msg.delete({ timeout: 5000 }));
            } else {
                return message.channel.send('You or the bot must be able to manage messages').then(msg => msg.delete({ timeout: 5000 }));
            }
        }
    },
    description: 'Clears x amount of messages from a channel'
});