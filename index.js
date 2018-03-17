// Setup basic express server
var express = require('express');
var app = express();
var path = require('path');
var server = require('http').Server(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;


server.listen(port, function () {
  console.log('Server listening at port %d', port);
});


app.use(express.static(path.join(__dirname, 'public')));

var numUsers = 0;

io.on('connection', function (socket) {
  var addedUser = false;

  socket.on('add user', function (username) {
    if (addedUser) return;

    socket.broadcast.emit('user joined', {
      username: socket.username,
      numUsers: numUsers
    });
  });

 
  socket.on('disconnect', function () {
    if (addedUser) {
      --numUsers;

    }
  });
});