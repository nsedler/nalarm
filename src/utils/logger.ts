const chalk = require('chalk');

export class Logger {
    info(info: string) {
        console.log(chalk.blue(`INFO: `) + info)
    }

    warning(warn: string) {
        console.log(chalk.yellow(`WARNING: `) + warn)
    }

    error(error:string) {
        console.log(chalk.red(`ERROR: `) + error)
    }

    bot(bot: string) {
        console.log(chalk.green(`BOT: `) + bot)
    }

    darkrp(darkrp: string) {
        console.log(chalk.hex('#1194f0')(`DARKRP: `) + darkrp)
    }
}