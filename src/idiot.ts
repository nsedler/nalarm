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
        readdirSync(join(__dirname, '../dist/commands'))
            .filter(fileName => fileName.endsWith('.js'))
            .map(async fileName => {
                const path = join(__dirname, '../dist/commands', fileName);
                const file: { command: Command } = await import(path);
                commandHandler.registerCommand(file.command);
            }),
    )
}

let x: any;

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

app.get('/gay', async function(req, res) {
	const x: Channel | undefined = client.channels.cache.get('499404898593538060');
	(x as TextChannel).send("test")
});
  
app.listen(3000, function () {
	console.log('Example app listening on port 3000!');
});

client.login(`${process.env.DEVTOKEN}`);