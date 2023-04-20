//client er den variabel der bruges til at oprette forbindelse til mqtt serveren
let client
//connectionDiv peger på et DIV element i HTML siden
let connectionDiv
//trying to make changes
//setup er den funktion der kører, før selve web-appen starter
function setup() {
  noLoop()
  //tag fat i en div i HTML dokumentet - med id "connection"
  connectionDiv = select('#connection')

  //forsøg at oprette forbindelse til MQTT serveren
  client = mqtt.connect('wss://mqtt.nextservices.dk') // mqtt variablen kommer fra mqtt.min.js biblioteket //wss er en Websocket protocol.

  //hvis forbindelsen lykkes kaldes denne funktion
  client.on('connect', (m) => {
    console.log('Client connected: ', m)
    connectionDiv.html('You are now connected to mqtt.nextservices.dk')
  })

  //subscribe på emnet ...
  client.subscribe('KMGAutoVideoSpiller3T')

  client.publish('KMGAutoVideoSpiller3T', 'Wassup', {qos: 0, retain: false}, function (error){
    if (error){
      console.log(error)
    } else
    {
      console.log('published')
    }
  })
  //når vi modtager beskeder fra MQTT serveren kaldes denne funktion
  client.on('message', (topic, message) => {
    console.log('Received Message: ' + message.toString())
    console.log('On Topic: ' + topic)



    //Sæt beskeden ind på hjemmesiden
    connectionDiv.html('Received message: <b>' + message + '</b> on topic: <b>' + topic + '</b>')
  })
}
function loop(){

}
