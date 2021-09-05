require('dotenv').config();
const express = require("express");
const axios = require("axios");

const port = process.env.PORT || 5000;
const app = express();

app.listen(port);
// TODO: just have only the URL needs work
// https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=100&playlistId=PLKQ0g8HhSxnfw3d5sC21gPTvjF_X1WYNa&key=[YOUR_API_KEY]
app.get("/youtube/getYoutubePlaylist", async (request, response) => {
    console.log(request.query.id);
    const url = "https://youtube.googleapis.com/youtube/v3/playlistItems";
	const youtubeUrl = `${url}?part=snippet&maxResults=100&playlistId=${request.query.id}&key=${process.env.API_KEY}`;
    try{
        const ytResponse = await axios.get(youtubeUrl);
        if(ytResponse.data.items.length){
        const data = ytResponse.data.items;
        const structuredData = []
        data.forEach((item)=>{
        const value =  {
                id:item.snippet.resourceId ? item.snippet.resourceId.videoId : undefined,
                title:item.snippet.title,
                thumbnails:item.snippet.thumbnails.default ? item.snippet.thumbnails.default.url : undefined,
                artist:item.snippet.videoOwnerChannelTitle? item.snippet.videoOwnerChannelTitle.split("-")[0] : undefined,
            }
            structuredData.push(value)
        })


      response.set("Access-Control-Allow-Origin", "*");
      response.send(structuredData);
        }else{
            response.set("Access-Control-Allow-Origin", "*");
      response.send({ error: 404, message:'Not Found' });
        }
    }catch(e){
        console.log(e);
        response.send(e);
        console.log('something went wrong o');
    }
});
