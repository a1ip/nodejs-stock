/* db with csv file */

const mysql = require('mysql'); 
const fs = require('fs');
var url;
var symbol = process.argv[process.argv.length-1];
const API_KEY= 'JDBVQUW2HL07WAGK';
url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=full&apikey=${API_KEY}&datatype=csv`;    

/* download api with downloadable link with https module*/
const path = `./data/${symbol}.csv`; // for path and name of csv file
const https = require('https')

/* create connection with mysql */
connection = mysql.createConnection({  
    host     : 'localhost',
    user     : 'root',
    password : '111111',
    database : 'capstone',
    //multipleStatements: true // for multiple queries
  });

function http2()
{
  return new Promise(function (resolve, reject){
      if(!fs.existsSync(path))
    var http = https.get(url, resp => resp.pipe(fs.createWriteStream(path)))
    console.log('complete');
    resolve();

  })
}

//CREATE TABLE IF NOT EXISTS daily (name VARCHAR(50), timestamp DATE NOT NULL, open DECIMAL(10,4) NOT NULL, high DECIMAL(10,4) NOT NULL, low DECIMAL(10,4) NOT NULL, close DECIMAL(10,4) NOT NULL, volume INT NOT NULL, constraint daily_PK primary key(name, timestamp));
function http3()
{
  return new Promise(function (resolve, reject){
    connection.connect(function(err) {
      if (err) console.log('error')
      console.log('connected')
      var sql = 
      `LOAD DATA LOCAL INFILE './data/${symbol}.csv' 
      IGNORE INTO TABLE daily 
      FIELDS TERMINATED BY ',' 
      LINES TERMINATED BY '\n' 
      IGNORE 1 ROWS (timestamp,open,high,low,close,volume) SET name = '${symbol}';`
      if(fs.existsSync(path))
      connection.query(sql,function(err,rows,fields){
      if(err) console.log(err)
          console.log(rows,fields);
      })
    })
  })
}
async function activate(){
  await http2();
  await http3();
}

module.exports= {activate};