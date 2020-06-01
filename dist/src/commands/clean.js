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
exports.command = void 0;
const commandsutil_1 = require("../utils/commandsutil");
exports.command = new commandsutil_1.Command({
    aliases: ['clean'],
    command: (message) => __awaiter(void 0, void 0, void 0, function* () {
        let count = 0;
        let Messages = yield message.channel.messages.fetch({ limit: 100 });
        Messages.forEach(element => {
            if (element.content.includes('has tripped the alarm') && element.author === message.client.user) {
                if (element.deletable) {
                    element.delete();
                    count++;
                }
            }
        });
        if (count == 0) {
            return message.channel.send(`You have 0 messages to clean!`);
        }
        else {
            message.delete();
            return message.channel.send(`Cleaned ${count} messages about your alarm being tripped.`).then(msg => msg.delete({ timeout: 5000 }));
        }
    }),
    description: 'Cleans all messages relating to your alarm (All = all within the last 100 messages)'
});
//# sourceMappingURL=clean.js.map