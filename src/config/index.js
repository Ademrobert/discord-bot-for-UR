require('dotenv').config()

const {
  LOG_LEVEL= 'debug',
  BOT_TOKEN= '',
  PREFIX= '!',
} = process.env;
const NOTALLOWED_COMMANDS = [ "_echo @everyone", "_echo @here" ];

module.exports = {
  logLevel: LOG_LEVEL,
  bot: {
    token: BOT_TOKEN,
    notAllowedCommands: NOTALLOWED_COMMANDS,
    prefix: PREFIX,
  }
};
