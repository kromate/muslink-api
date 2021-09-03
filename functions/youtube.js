require('dotenv').config();
const express = require("express");
const axios = require("axios");

const port = process.env.PORT || 3000;
const app = express();

app.listen(port);
app.get("/youtube/getYoutubeSongById", async (request, response) => {
    console.log(request.query.id);
    const url = "https://youtube.googleapis.com/youtube/v3/videos";
	const youtubeUrl = `${url}?part=snippet&id=${request.query.id}&key=${process.env.API_KEY}`;
    try{
        const ytResponse = await axios.get(youtubeUrl);
        // console.log(ytResponse);
        if(ytResponse.data.items.length){
        const tags = ytResponse.data.items[0].snippet.tags
        const title = ytResponse.data.items[0].snippet.title
        const artist = ytResponse.data.items[0].snippet.channelTitle.split("-")[0]
        // const id = ytResponse.data.items[0].id;
        // const title = `${artistName} - ${songName}`;

      response.set("Access-Control-Allow-Origin", "*");
      response.send({ tags, title, artist });
        }else{
            response.set("Access-Control-Allow-Origin", "*");
      response.send({ error: 404, message:'Not Found' });
        }
    }catch(e){
        console.log(e);
        console.log('something went wrong o');
    }
});
