"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const chalk = require('chalk');
class Logger {
    info(info) {
        console.log(chalk.blue(`INFO: `) + info);
    }
    warning(warn) {
        console.log(chalk.yellow(`WARNING: `) + warn);
    }
    error(error) {
        console.log(chalk.red(`ERROR: `) + error);
    }
    bot(bot) {
        console.log(chalk.green(`BOT: `) + bot);
    }
    darkrp(darkrp) {
        console.log(chalk.hex('#1194f0')(`DARKRP: `) + darkrp);
    }
}
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map