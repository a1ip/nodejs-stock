/* to download every csv file of stocks which are listed on NASDAQ from alphavantage using API*/
const fs = require('fs')
const csv = require('csv-parser')
const users = [];
var url;
const API_KEY= 'JDBVQUW2HL07WAGK';
 // for path and name of csv file
const https = require('https')

function generateUsername(symbol) {
    return `${symbol}`.toLowerCase();
}
var symbolName = process.argv[process.argv.length-1];
const path = `./data/${symbolName}.csv`;
url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbolName}&outputsize=full&apikey=${API_KEY}&datatype=csv`;    
https.get(url, resp => resp.pipe(fs.createWriteStream(path)))
fs.createReadStream('./data/input/input.csv')
  .pipe(csv())
  .on('data', function (row) {
    const symbolName = generateUsername(row.Symbol);
    
    const user = {
        symbolName,
    }
    users.push(user)
    
    //   const path = `./test/${symbolName}.csv`;
    //   url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbolName}&outputsize=full&apikey=${API_KEY}&datatype=csv`;    
    //   https.get(url, resp => resp.pipe(fs.createWriteStream(path)))
    
  })
  .on('end', function () {
    //console.log(users)
      // TODO: SAVE users data to another file
    })
