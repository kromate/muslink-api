require('dotenv').config();
const express = require("express");
const axios = require("axios");

const port = process.env.PORT || 3000;
const app = express();

app.listen(port);
// https://kromate-muslink-api-qjwp4665c9g5v-3000.githubpreview.dev/youtube/getYoutubeSongsBySearch/?sn=Overthinking&an=Sophie%20Pecora;

app.get("/youtube/getYoutubeSongsBySearch", async (request, response) => {
    console.log(request.query.artistName);
    const url = "https://www.googleapis.com/youtube/v3/search";
	const q = `${request.query.an} - ${request.query.sn}`;
	const type = "audio";
	const youtubeUrl = `${url}?part=snippet&q=${q}&type=${type}&key=${process.env.API_KEY}`;
    try{
        const ytResponse = await axios.get(youtubeUrl);
        // console.log(ytResponse);
        if(ytResponse.data.items.length){
        const thumbnails = ytResponse.data.items[0].snippet.thumbnails.default.url;
        const title = ytResponse.data.items[0].snippet.title.split("-")[1];
        const artist = ytResponse.data.items[0].snippet.title.split("-")[0]
        const id = ytResponse.data.items[0].id.videoId
        // const id = ytResponse.data.items[0].id;
        // const title = `${artistName} - ${songName}`;

      response.set("Access-Control-Allow-Origin", "*");
      response.send({ thumbnails, title, artist, id });
    //   response.send(ytResponse.data);
        }else{
            response.set("Access-Control-Allow-Origin", "*");
      response.send({ error: 404, message:'Not Found' });
        }
    }catch(e){
        console.log(e);
        console.log('something went wrong o');
    }
});
