"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const discord_js_1 = require("discord.js");
const dotenv_1 = require("dotenv");
const commandsutil_1 = require("./utils/commandsutil");
const fs_1 = require("fs");
const path_1 = require("path");
const express_1 = __importDefault(require("express"));
exports.app = express_1.default();
const client = new discord_js_1.Client();
dotenv_1.config();
let commandHandler = new commandsutil_1.CommandHandler(client);
function loadHandler() {
    const registeredCommands = Promise.all(fs_1.readdirSync(path_1.join(__dirname, '../dist/commands'))
        .filter(fileName => fileName.endsWith('.js'))
        .map((fileName) => __awaiter(this, void 0, void 0, function* () {
        const path = path_1.join(__dirname, '../dist/commands', fileName);
        const file = yield Promise.resolve().then(() => __importStar(require(path)));
        commandHandler.registerCommand(file.command);
    })));
}
let x;
client.once('ready', () => {
    var _a, _b;
    let alex = {
        name: 'alex',
        isGay: true
    };
    loadHandler();
    console.log('Ready!');
    (_a = client.user) === null || _a === void 0 ? void 0 : _a.setStatus('online');
    (_b = client.user) === null || _b === void 0 ? void 0 : _b.setPresence({
        activity: {
            name: 'Gay',
            type: 'PLAYING'
        }
    });
});
client.on('message', (message) => {
    x = message.content;
});
exports.app.get('/', function (req, res) {
    res.send(x);
});
exports.app.get('/gay', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const x = client.channels.cache.get('499404898593538060');
        x.send("test");
    });
});
exports.app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
client.login(`${process.env.DEVTOKEN}`);
//# sourceMappingURL=idiot.js.map