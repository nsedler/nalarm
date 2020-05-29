import { Client, Message, Presence, Guild, Channel, TextChannel } from 'discord.js';
import { config as dotenv } from "dotenv"
import { CommandHandler, Command } from './utils/commandsutil';
import { readdirSync } from 'fs';
import { join } from 'path';

import express, { json } from 'express';

export const app: express.Application = express();
const client = new Client();

dotenv();

let commandHandler = new CommandHandler(client);

interface gayMan {
    name: string,
    isGay: boolean
}

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

let x: any;
let port = process.env.PORT || 80
client.once('ready', () => {

    let alex: gayMan = {
        name: 'alex', 
        isGay: true
	};
	
	

    loadHandler();
    console.log('Ready!');
    client.user?.setStatus('online')
    client.user?.setPresence({
        activity: {
            name: 'Gay',
            type: 'PLAYING'
        }
    });
});

client.on('message', (message: Message) => {
	x = message.content;
});

app.get('/', function (req, res) {
	res.send(x);
});

app.get('/alarm', async function(req, res) {
    const alarmChannel: Channel | undefined = client.channels.cache.get('499404898593538060') as TextChannel;

    let auth: any = req.query.auth;
    let alarmTripper: any = req.query.tripped;
    
    if(auth == `8qMLx9k7`) {
        (alarmChannel as TextChannel).send(`<@185063150557593600>, <@260940872848375810> ${alarmTripper} has tripped the alarm.`);
        res.send('You have been notified');
    } else {
        res.send('Incorrect auth');
    }
});
  
app.listen(port, function () {
	console.log(`Now listening on port ${port}`);
});

client.login(`NTAzMzU1ODIxMTY2NjkwMzA2.XtAAMg.5I2hPSaiDTc700HOR9eKF9kmaF0`);