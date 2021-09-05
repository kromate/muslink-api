
// This endpoint is for getYoutubeSongById and takes in a song id query
// https://kromate-muslink-api-qjwp4665c9g5v-3000.githubpreview.dev/youtube/getYoutubeSongById?id=f0teM3X2GAg
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



// This endpoint is for getYoutubeSongsBySearch and takes in a song sn(Song Name) & an(Artist Name) query
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


// this endpoint returns an array with a list of songs
// input-key: id, output-key: id, title, thumbnails, artist
// https://kromate-muslink-api-6qj45wwxcr69g-5000.githubpreview.dev/youtube/getYoutubePlaylist/?id=PLKQ0g8HhSxnfoXbeWQwaw_dL5chQ8_LKT

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


