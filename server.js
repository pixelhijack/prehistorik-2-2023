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
  const level = JSON.parse(fs.readFileSync(path.normalize(__dirname + '/server/levels/level-' + req.params.id + '.json', 'utf8')));
  const levelconfig = JSON.parse(fs.readFileSync(path.normalize(__dirname + '/server/levelconfigs/levelconfig-' + req.params.id + '.json', 'utf8')));
  //res.sendFile(path.normalize(__dirname + '/server/levels/level-' + req.params.id + '.json'));
  res.send({
    level, 
    levelconfig
  });
});

app.get('/', function (req, res) {
  console.info('[/*]', req.params);
  res.sendFile('index.html', { root: path.join(__dirname, './client/dist')   });
});

server.listen(process.env.PORT || 8081, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
});