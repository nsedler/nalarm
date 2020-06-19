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
exports.app = exports.logger = void 0;
const discord_js_1 = require("discord.js");
const commandsutil_1 = require("./utils/commandsutil");
const fs_1 = require("fs");
const path_1 = require("path");
const express_1 = __importDefault(require("express"));
const log = __importStar(require("./utils/logger"));
let config = require('./config.json');
exports.logger = new log.Logger();
exports.app = express_1.default();
const client = new discord_js_1.Client();
let commandHandler = new commandsutil_1.CommandHandler(client);
/**
 * loads all of the handlers for the commands
 */
function loadHandler() {
    const registeredCommands = Promise.all(fs_1.readdirSync(path_1.join(__dirname, '../src/commands'))
        .filter(fileName => fileName.endsWith('.js'))
        .map((fileName) => __awaiter(this, void 0, void 0, function* () {
        const path = path_1.join(__dirname, '../src/commands', fileName);
        const file = yield Promise.resolve().then(() => __importStar(require(path)));
        commandHandler.registerCommand(file.command);
    })));
}
let port = process.env.PORT || 80;
client.once('ready', () => {
    var _a, _b, _c;
    loadHandler();
    (_a = client.user) === null || _a === void 0 ? void 0 : _a.setStatus('online');
    (_b = client.user) === null || _b === void 0 ? void 0 : _b.setPresence({
        activity: {
            name: 'Watching over your base',
            type: 'PLAYING'
        }
    });
    exports.logger.info(`${(_c = client.user) === null || _c === void 0 ? void 0 : _c.username} is now online`);
});
/**
 * only reason you should have anything happen on the default route is
 * for automatic keep up of heroku from https://cron-job.org/en/
 */
exports.app.get('/', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        exports.logger.info(`Automatic keep up of heroku.`);
        res.send(`Automatic keep up of heroku.`);
    });
});
exports.app.get('/alarm', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const guild = client.guilds.cache.get(config.guild);
        const alarmChannel = guild === null || guild === void 0 ? void 0 : guild.channels.cache.get(config.channel);
        const alarmRole = guild === null || guild === void 0 ? void 0 : guild.roles.cache.get(config.role);
        let auth = req.query.auth;
        let alarmTripper = req.query.tripped;
        if (auth == config.auth) {
            alarmChannel.send(`${alarmRole}, ${alarmTripper} has tripped the alarm`);
            exports.logger.darkrp(`${alarmTripper} has tripped the alarm`);
            res.send('You have been notified');
        }
        else {
            exports.logger.warning(`${req.ip} has attempted to use the api without correct auth`);
            res.send('Incorrect auth');
        }
    });
});
/**
 * This route is only used for testing
 * "port" should only be 80 if you are testing / debugging in your own environment
 */
if (port === 80) {
    exports.app.get('/test', function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const guild = client.guilds.cache.get(config.guild);
            const alarmChannel = guild === null || guild === void 0 ? void 0 : guild.channels.cache.get(config.channel);
            const alarmRole = guild === null || guild === void 0 ? void 0 : guild.roles.cache.get(config.role);
            let auth = req.query.auth;
            let alarmTripper = req.query.tripped;
            if (auth == `test`) {
                alarmChannel.send(`${alarmRole}, This is a test, ${alarmTripper} has tripped the alarm`);
                exports.logger.darkrp(`${alarmTripper} has tripped the alarm`);
                res.send('You have been notified');
            }
            else {
                exports.logger.warning(`${req.ip} has attempted to use the api without correct auth`);
                res.send('Incorrect auth');
            }
        });
    });
}
exports.app.listen(port, function () {
    exports.logger.info(`Now listening on port ${port}`);
});
client.login(`${config.token}`);
//# sourceMappingURL=idiot.js.map