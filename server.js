var express = require('express');
var pg = require('pg');
var connString = process.env.DATABASE_URL;






pg.connect(connString, function(err, client, done) {
  var app = express();
  app.use(express.json());
  app.use(express.urlencoded());
  app.get('/', function(req, res){
    res.send('These aren\'t the droids you are looking for.');
  });
  app.post("/factory_results", function (req, res) {
    var data = req.body;
    client.query("insert into audit (action, pkg) VALUES ($1, $2);", [ 'F', JSON.stringify(data)], function (err, results) {
      if (err) {
        console.log(err);
        res.send("FAILED TO SAVE");
      } else {
        res.send("OK");
      }

    });
  });
  app.post("/registration", function (req, res) {
    var data = req.body;
    client.query("insert into audit (action, pkg) VALUES ($1, $2);", [ 'R', JSON.stringify(data)], function (err, results) {
      if (err) {
        console.log(err);
        res.send("FAILED TO SAVE");
      } else {
        res.send("OK");
      }
    });
  });
  app.post("/enrollment", function (req, res) {
    var data = req.body;
    client.query("insert into audit (action, pkg) VALUES ($1, $2);", [ 'E', JSON.stringify(data)], function (err, results) {
      if (err) {
        console.log(err);
        res.send("FAILED TO SAVE");
      } else {
        res.send("OK");
      }
    });
  });
  app.listen(process.env.PORT || 3000);
});

