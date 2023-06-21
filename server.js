const { WebSocketServer } = require('ws');
const mongoose = require('mongoose')
const StationData = require('./src/Database/StationData')

async function main() {
    mongoose.connect('mongodb://127.0.0.1:27017/meteo')
    console.log('Connexion à la base de données effectuée.')
}

main().catch(error => console.log(error))

const wss = new WebSocketServer({ port: 8081 });
const connections = []
console.log('Serveur socket démarré')

wss.on('connection', function connection(ws) {

  console.log('Connexion au serveur socket')
  ws.on('error', console.error);

  connections.push(ws)


  ws.on('message', function message(data) {
    const jsonObject = JSON.parse(data)

    const transformedData = {
      "stationId": jsonObject["stationId"],
      "dataDate": Date.now(),
      "datas": jsonObject["datas"]
    }


    console.log('Reçu: %s', JSON.stringify(transformedData));

    const stationDatas = new StationData({
      stationId: transformedData["stationId"],
      dataDate: transformedData["dataDate"],
      datas: transformedData["datas"]
    })

    stationDatas.save().then(() => {
      console.log("Data enregistrées")
      connections.forEach(connection => {
        connection.send(JSON.stringify(transformedData))
      })
      console.log('EMISSION EFFECTUEE');
    
    })

  });

});