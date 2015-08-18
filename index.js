var express = require("express");
var app = express();
var Twit = require('twit');
var T = new Twit({
    consumer_key:         'JBJUBMi6uBz1j4587RHoWVWX9' // Your Consumer Key
  , consumer_secret:      'ChwkS3eXX0obPAGPaw5thpRt8bMr4nbNa7fK3Vc4M8Bieeegr0' // Your Consumer Secret
  , access_token:         '150020683-nztFnojPcUyxUVXllWXFJ9p99JAaTA6MFE6tr5Wx' // Your Access Token
  , access_token_secret:  'jzQMrFnAFjyqMEC7aIDI5hymElWf329Y1dysj0vOAiEGu' // Your Access Token Secret
});






app.use(express.static(__dirname +'/public'));

//routes



app.route('/cool')
    .get(function(req,res){

    	res.sendFile(__dirname+'/public/html/404.html');

    });

    var server = app.listen(3000, function(){

console.log(" the server is running on port 3000");

    })

    var socketio = require("socket.io");
    var io = socketio.listen(server);
    var nbOpenSockets = 0;
    var stream = T.stream('statuses/filter', { track: '#will2015sa'})


    io.on('connection',function(socket){



console.log('Client connected !');
    if (nbOpenSockets <= 0) {
        nbOpenSockets = 0;
        console.log('First active client. Start streaming from Twitter');
        stream.start();
    }
 
    nbOpenSockets++;
 
    socket.on('disconnect', function() {
        console.log('Client disconnected !');
        nbOpenSockets--;
 
        if (nbOpenSockets <= 0) {
            nbOpenSockets = 0;
            console.log("No active client. Stop streaming from Twitter");
            stream.stop();
        }
    });


        socket.on('changeBackground', function(newColour) {

            console.log(newColour);

            socket.emit('setBackground', newColour);

            socket.broadcast.emit('setBackground', newColour);

        }); 

        stream.on('tweet', function(tweet) {

socket.emit('info', { tweet: tweet });


});



   
        socket.emit('initialize', "initialized");

    });









// T.get('search/tweets', { q: '#banana', count: 100 }, function(err, data, response) {
//   // Do something with the JSON data returned.
//   //  (Consult Twitter's documentation on the format: 
//   //    https://dev.twitter.com/rest/reference/get/search/tweets)
//   console.log(data); 

// });





// console.log("Listening for tweets from San Francisco...");
// var stream = T.stream('statuses/filter', { locations: [-122.75,36.8,-121.75,37.8] });
// var tweetsBuffer = [];
 
// stream.on('connect', function(request) {
//     console.log('Connected to Twitter API');
// });
 
// stream.on('disconnect', function(message) {
//     console.log('Disconnected from Twitter API. Message: ' + message);
// });
 
// stream.on('reconnect', function (request, response, connectInterval) {
//   console.log('Trying to reconnect to Twitter API in ' + connectInterval + ' ms');
// })
 
// stream.on('tweet', function(tweet) {
//     if (tweet.geo == null) {
//         return ;
//     }
 
//     //Create message containing tweet + username + profile pic + geo
//     var msg = {};
//     msg.text = tweet.text;
//     msg.geo = tweet.geo.coordinates;
//     msg.user = {
//         name: tweet.user.name,
//         image: tweet.user.profile_image_url
//     };
 
//     console.log(msg);

// })









