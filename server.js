var express = require('express');
var pg = require('pg');
var connString = process.env.HEROKU_POSTGRESQL_BRONZE_URL;
pg.connect(connString, function(err, client, done) {
  var app = express();
  app.use(express.json());
  app.use(express.urlencoded());
  app.get('/', function(req, res){
    res.send('These aren\'t the droids you are looking for.');
  });
  app.post("/blessed", function (req, res) {
    var data = req.body;
    console.log(data);
    client.query("insert into blessed (pkg) VALUES ($1);", [JSON.stringify(data)], function (err, results) {
      if (err) {console.log(err);}
      res.send("OK");
    });
  });
  app.listen(process.env.PORT || 3000);
});

