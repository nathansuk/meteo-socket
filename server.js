const { WebSocketServer } = require('ws');

const wss = new WebSocketServer({ port: 8080 });
console.log('Serveur socket démarré')

wss.on('connection', function connection(ws) {
  console.log('Connexion au serveur socket')
  ws.on('error', console.error);

  const sendResponse = (data) => {
      ws.send(JSON.stringify(data))
  }
  
  ws.on('message', function message(data) {
    const jsonObject = JSON.parse(data)
    const transformedData = {
      "stationId": jsonObject["stationId"],
      "dataDate": new Date(),
      "datas": jsonObject["datas"]
    }
    console.log('Reçu: %s', JSON.stringify(transformedData));

    sendResponse(transformedData)
    console.log('EMISSION EFFECTUEE');
    
  });

  ws.send('something');
});