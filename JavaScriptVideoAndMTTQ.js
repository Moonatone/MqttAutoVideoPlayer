const url = 'wss://mqtt.nextservices.dk'
const videoPlayer = document.getElementById('videoPlayer');

let isClicked = new Boolean()

const myButton = document.getElementById('myButton');

const myDiv = document.getElementById('connection')


const options = {
  clean: true
}

const client = mqtt.connect(url, options)
client.on('connect', function() {
  console.log('connected');

  client.subscribe('KMGAutoVideoSpiller3T', function(err){
    if(!err){
      client.publish('KMGAutoVideoSpiller3T', 'this is a new message')
    }
  })
})

client.on('message', function(topic, message){
  if(message == 'it works' && topic == 'KMGAutoVideoSpiller3T'){
    console.log("Rubber Duck");
    videoPlayer.pause();
  } 
  if(message == 'try out'&& topic == 'KMGAutoVideoSpiller3T'){
    videoPlayer.currentTime = 0;
    videoPlayer.play();
    console.log("Rubber Duck");
  }
})

client.on('message', function(topic, message){
  console.log(message.toString());
  //myDiv.innerHTML = 'Received message: <b>' + message + '</b> on topic: <b>' + topic + '</b>'
})

myButton.addEventListener("click", function() {
  if(isClicked != true){
    isClicked = true
  } else{
    isClicked = false
  }
  myFunction();
  console.log("Rubber Duck");
});

function myFunction(){
  if(isClicked == true){
  client.publish('KMGAutoVideoSpiller3T', 'try out', {qos: 0, retain: false});
  console.log("Rubber Duck2");
  } else {
    client.publish('KMGAutoVideoSpiller3T', 'it works')
  }
}





