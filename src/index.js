import express from 'express'
import path from 'path'
import http from 'http'
import socketio from 'socket.io'
import {rankwords} from './lib'

let app = express();
let server = http.Server(app);
let io = socketio(server);

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, '../views'))

app.use(express.static(path.resolve(__dirname, '../public')))

app.get('/', (req, res) => {
  res.render('index')
})

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('text', (msg) => {
    rankwords(msg).then(point => {
      console.log(point);
      io.emit('point', point)
    })
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

let port = process.env.PORT || 8080
server.listen(port, () => {
  console.log('listening on *:', port)
});

