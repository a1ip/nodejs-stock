const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {

  var period= req.query.period;
  var symbol = req.query.symbol;
  var interval = "";
  var date_notYear="";
  var sql = "";

  if(req.query.interval>0)
    interval = "/" + req.query.interval;
   
  if(period!='year')
    date_notYear = 'DATE_FORMAT(timestamp, "%y"), ';
      
      /* high: highest, low: lowest volume: sum other than that is as it is*/
  sql = `SELECT name, DATE_FORMAT(timestamp,'%Y-%m-%d') as date, open, 
         max(high) as high, min(low) as low, close, sum(volume) 
         FROM daily WHERE name = '${symbol}' GROUP BY ${date_notYear} 
         FLOOR(${period}(timestamp)${interval}) ORDER BY date;`

  connection.query(sql,function(err,rows){
    if (err) throw error;
    res.send(rows);
  });
});
 
module.exports = router;