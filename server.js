import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws) {
  console.log('Connexion au serveur socket')
  ws.on('error', console.error);

  ws.on('message', function message(data) {
    console.log('Reçu: %s', data);
  });

  ws.send('something');
});