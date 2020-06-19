import { Client, Guild, Channel, TextChannel, Role } from 'discord.js';
import { Config } from './structs/config'
import { CommandHandler, Command } from './utils/commandsutil';

import { readdirSync } from 'fs';
import { join } from 'path';
import express from 'express';
import * as log from './utils/logger';

let config: Config = require('./config.json');

export let logger = new log.Logger();
export const app: express.Application = express();

const client = new Client();

let commandHandler = new CommandHandler(client);

/**
 * loads all of the handlers for the commands
 */
function loadHandler(): void {
    const registeredCommands = Promise.all (
        readdirSync(join(__dirname, '../src/commands'))
            .filter(fileName => fileName.endsWith('.js'))
            .map(async fileName => {
                const path = join(__dirname, '../src/commands', fileName);
                const file: { command: Command } = await import(path);
                commandHandler.registerCommand(file.command);
            }),
    )
}

let port = process.env.PORT || 80

client.once('ready', () => {
    
    loadHandler();
    
    client.user?.setStatus('online')
    client.user?.setPresence({
        activity: {
            name: 'Watching over your base',
            type: 'PLAYING'
        }
    });

    logger.info(`${client.user?.username} is now online`);
});

/**
 * only reason you should have anything happen on the default route is 
 * for automatic keep up of heroku from https://cron-job.org/en/
 */
app.get('/', async function(req, res) {
    logger.info(`Automatic keep up of heroku.`);
    res.send(`Automatic keep up of heroku.`);
});

app.get('/alarm', async function(req, res) {
    const guild: Guild | undefined = client.guilds.cache.get(config.guild);
    const alarmChannel: TextChannel | undefined = guild?.channels.cache.get(config.channel) as TextChannel;
    const alarmRole: Role | undefined =  guild?.roles.cache.get(config.role);

    let auth: any = req.query.auth;
    let alarmTripper: any = req.query.tripped;

    if(auth == config.auth) {
        (alarmChannel as TextChannel).send(`${alarmRole}, ${alarmTripper} has tripped the alarm`);
        logger.darkrp(`${alarmTripper} has tripped the alarm`);
        res.send('You have been notified');
    } else {
        logger.warning(`${req.ip} has attempted to use the api without correct auth`)
        res.send('Incorrect auth');
    }
});

/**
 * This route is only used for testing
 * "port" should only be 80 if you are testing / debugging in your own environment
 */
if(port === 80){
    app.get('/test', async function(req, res) {
        const guild: Guild | undefined = client.guilds.cache.get(config.guild);
        const alarmChannel: Channel | undefined = guild?.channels.cache.get(config.channel) as TextChannel;
        const alarmRole: Role | undefined =  guild?.roles.cache.get(config.role);

        let auth: any = req.query.auth;
        let alarmTripper: any = req.query.tripped;
        
        if(auth == `test`) {
            (alarmChannel as TextChannel).send(`${alarmRole}, This is a test, ${alarmTripper} has tripped the alarm`);
            logger.darkrp(`${alarmTripper} has tripped the alarm`);
            res.send('You have been notified');
        } else {
            logger.warning(`${req.ip} has attempted to use the api without correct auth`)
            res.send('Incorrect auth');
        }
    });
}
app.listen(port, function () {
    logger.info(`Now listening on port ${port}`);
});

client.login(`${config.token}`);