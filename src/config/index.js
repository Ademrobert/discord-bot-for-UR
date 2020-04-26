require('dotenv').config()

const {
  LOG_LEVEL= 'debug',
  BOT_TOKEN= '',
  DB_FILE= 'db_test',
  PREFIX= '!',
} = process.env;
const NOTALLOWED_COMMANDS = [ "_echo @everyone", "_echo @here" ];

module.exports = {
  logLevel: LOG_LEVEL,
  database: {
    file: {
      name: DB_FILE,
    }
  },
  bot: {
    token: BOT_TOKEN,
    notAllowedCommands: NOTALLOWED_COMMANDS,
    prefix: PREFIX,
  }
};
