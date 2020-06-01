import { Message, Client, TextChannel } from "discord.js";
import { command } from "../commands/ping";
import { app, logger } from "../idiot";

export class Command {
    constructor(public options: CommandOptions){
        options.aliases = options.aliases.map(options => options.toLowerCase())
    }
}

interface CommandOptions {
    command: (message: Message, messageContent: string) => Promise<unknown>;
    aliases: string[];
    description: string;
    ownerOnly?: boolean;
}

export class CommandHandler {

    private commands: Command[] = [];

    constructor(private bot: Client) {
        this.bot.on('message', (message: Message) => this.handleCommands(message));
    }

    public registerCommand(command: Command): void {
        this.commands.push(command);
    }

    private async handleCommands(message: Message): Promise<void> {
        if(!message.guild) return;
        if(message.author!.bot) return;

        const rawMessageContent = message.content.split(' ');

        let channel: TextChannel | undefined = message.channel as TextChannel;
        
        let cmd = rawMessageContent
            .splice(0, 1)
            .toString()
            .toLowerCase();

        const messageContent = rawMessageContent.join(' ');
        
        if(!cmd.startsWith(".")) return;
        else cmd = cmd.slice(".".length);
        
        const commands = this.commands.filter(({options: {aliases} }) => aliases.includes(cmd));

        if(commands.length > 0) {
                const commandsRan = commands.map(async ({ options: { command, ownerOnly } } ) => {
                    
                    if(ownerOnly) {
                        if(message.author.id === '185063150557593600'){
                            await command(message, messageContent);
                        } else {
                            message.channel.send("You must be an owner to run this command");
                        }
                    } else {
                        await command(message, messageContent);
                    }
                });
            
            logger.bot(`${message.author.username} used ${cmd} in Guild: ${message.guild.name} : ${channel.name}`);
            await Promise.all(commandsRan);
        }
    }
}