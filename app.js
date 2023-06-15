const mongoose = require('mongoose')
const StationData = require('./src/Database/StationData')

const { Server } = require('socket.io')

async function main() {
    mongoose.connect('mongodb://127.0.0.1:27017/meteo')
    console.log('Connexion à la base de données effectuée.')
}

main().catch(error => console.log(error))

const io = new Server({
    cors: {
        origin: ["http://localhost:3000", "http://localhost", "192.168.60.1", "192.168.60.142"]
      }
})

console.log("Serveur socket démarré")


io.on("connection", (socket) => {

    io.of("/").adapter.on("join-room", (room, id) => {
        console.log(`socket ${id} has joined room ${room}`);
    }); // Example given on : https://socket.io/docs/v4/rooms/

    console.log("Nouvelle connexion au serveur : " + socket.id)

    socket.join("ESIEE-1")


    socket.on('data', data => {

        console.log('Message reçu : ' + data)
        
        const stationDatas = new StationData({
            stationId: data["stationId"],
            dataDate: data["dataDate"],
            datas: data["datas"]
        })

        stationDatas.save().then( () => {
            console.log("Données enregistrées")
            io.to(data["stationId"]).emit("data", stationDatas)
        })

        
    })

    socket.on('hello', message => {
        console.log("Hello reçu " + JSON.stringify(message))
    })

    socket.on('disconnect', () => {
        console.log("Station déconnectée du serveur socket.")
    })
})

io.listen(3001)