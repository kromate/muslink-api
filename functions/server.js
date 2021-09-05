require('dotenv').config();
const express = require("express");
const axios = require("axios");

const port = process.env.PORT || 5000;
const app = express();

app.listen(port);
// TODO: just have only the URL needs work
// https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=100&playlistId=PLKQ0g8HhSxnfw3d5sC21gPTvjF_X1WYNa&key=[YOUR_API_KEY]
app.get("/youtube/getYoutubePlaylist", async (request, response) => {
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
