




$("#button-search").click(function(){

    axios.get("https://www.googleapis.com/youtube/v3/search",
    {params: {
        part: "snippet",
        q: $("#keyword-field").val(),
        type: "video",
        maxResults: 6,
        key: "AIzaSyCpRPmpzV8_iTPbBDUeg9jOWnjdyxj2Gao"
    }})
    .then(({data}) => {

        data.items.forEach((video) => {

            $("#video-list").append(`<iframe width="560" height="315" src="https://www.youtube.com/embed/${video.id.videoId}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`)

            console.log(video.id.videoId);
        });

    })
    .catch((err) => {
        console.log(err);
    })

});