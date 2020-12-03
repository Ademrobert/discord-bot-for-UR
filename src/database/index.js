const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

module.exports = {
  getConnection: (options) => {
    const adapter = new FileSync(`${__dirname}/db/${`${options.filename}.json`}`);    
    return low(adapter)
  }
} 

