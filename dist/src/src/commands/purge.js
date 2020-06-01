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
    aliases: ['purge', 'clear', 'clean'],
    command: (message) => __awaiter(void 0, void 0, void 0, function* () {
        let args = message.content.split(' ');
        let toPurge = Number(args[1]);
        if (toPurge < 1 || toPurge > 100 || toPurge == NaN) {
            return message.channel.send('You must purge between 1 and 100 messages.');
        }
        else {
            message.channel.bulkDelete(toPurge);
            return message.channel.send(`${toPurge} messages have been purged.`);
        }
    }),
    description: 'Clears x amount of messages from a channel'
});
//# sourceMappingURL=purge.js.map