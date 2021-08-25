const request = require('request')
const mysql = require('mysql'); 

connection = mysql.createConnection({  
    host     : 'localhost',
    user     : 'root',
    password : '111111',
    database : 'testfile',
    //multipleStatements: true // for multiple queries
  });

const API_KEY= 'JDBVQUW2HL07WAGK';
var symbol = process.argv[process.argv.length-1];
var url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=full&apikey=${API_KEY}`;

var dbExport = request(url, function(error, response, body){
  var data = JSON.parse(body);
  content = data['Time Series (Daily)'];

  var keys = Object.keys(content) // get key for date
  //console.log(keys);
  connection.connect(function(err) {
    if (err) console.log('error')
      console.log('connected')
      var sql = `insert IGNORE into daily(name, timestamp, open, high,low,close,volume) values (?)`
        keys.forEach(function(key, index) // extract and insert data from API into mysql DB
        {
            var row = content[key]
            var date = keys[index]
            var open = parseFloat(row['1. open'])
            var high = parseFloat(row['2. high'])
            var low = parseFloat(row['3. low'])
            var close = parseFloat(row['4. close'])
            var volume = parseInt(row['5. volume'])

            var array = [`${symbol}`, date,open,high,low,close,volume]
            connection.query(sql,[array],function(err,rows,fields){
                if(err) console.log(err)
                    //console.log(rows,fields);
                })
        })
       })
    })

module.exports = dbExport;