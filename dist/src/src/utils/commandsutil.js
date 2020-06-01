"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandHandler = exports.Command = void 0;
class Command {
    constructor(options) {
        this.options = options;
        options.aliases = options.aliases.map(options => options.toLowerCase());
    }
}
exports.Command = Command;
class CommandHandler {
    constructor(bot) {
        this.bot = bot;
        this.commands = [];
        this.bot.on('message', (message) => this.handleCommands(message));
    }
    registerCommand(command) {
        this.commands.push(command);
    }
    handleCommands(message) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!message.guild)
                return;
            if (message.author.bot)
                return;
            const rawMessageContent = message.content.split(' ');
            let cmd = rawMessageContent
                .splice(0, 1)
                .toString()
                .toLowerCase();
            const messageContent = rawMessageContent.join(' ');
            if (!cmd.startsWith("."))
                return;
            else
                cmd = cmd.slice(".".length);
            const commands = this.commands.filter(({ options: { aliases } }) => aliases.includes(cmd));
            if (commands.length > 0) {
                const commandsRan = commands.map(({ options: { command, ownerOnly } }) => __awaiter(this, void 0, void 0, function* () {
                    if (ownerOnly) {
                        if (message.author.id === '185063150557593600') {
                            yield command(message, messageContent);
                        }
                        else {
                            message.channel.send("You must be an owner to run this command");
                        }
                    }
                    else {
                        yield command(message, messageContent);
                    }
                }));
                yield Promise.all(commandsRan);
            }
        });
    }
}
exports.CommandHandler = CommandHandler;
//# sourceMappingURL=commandsutil.js.map