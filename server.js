var http = require('http');
var path = require('path');
var express = require('express');
var fs = require('fs');

var app = express();
var server = http.createServer(app);

app.use(express.static(path.resolve(__dirname, 'client\/dist')));
app.use(express.static(path.resolve(__dirname, 'server\/assets')));

app.get('/api/levels/:id', function (req, res) {
  console.info('[/level/:id]', req.params);
  res.sendFile(path.normalize(__dirname + '/server/levels/' + req.params.id));
});

app.get('/', function (req, res) {
  console.info('[/*]', req.params);
  res.sendFile('index.html', { root: path.join(__dirname, './client/dist')   });
});

server.listen(process.env.PORT || 8081, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
});