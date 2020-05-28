import { Command } from "../utils/commandsutil";
import { Message } from "discord.js";

export const command = new Command ({
    aliases: ['ping'],
    command: async (message: Message): Promise<Message> => {

        return message.channel.send(`Client ping: ${message.client.ws.ping}ms`)
    },
    description: 'ping pong'
});