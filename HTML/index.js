const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MzZjZmE2ODRlOGExZGFkY2U0YmZiYTZiMzhhMTg5NCIsIm5iZiI6MTcyMTg3Mjc5NC43MTk5MzcsInN1YiI6IjY1MjI3NjY4MGNiMzM1MTZmZWMzNGVjZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6W28xhcQKYv6VLYWhlQr6FrmmH0n4lga7t_RnfjR82o'
    }
};

fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', options)
    .then(response => response.json())
    .then(data => {
        if (data.results && data.results.length > 0) {
            const id = data.results[0].id;
            console.log('Trending movie ID:', id);

            // Fetch video details using the retrieved id
            fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
                .then(videoResponse => videoResponse.json())
                .then(videoData => {
                    console.log('Video Data:', videoData);
                    // Filter and log trailer data
                    const trailers = videoData.results.filter(video => video.type === "Trailer");
                    if (trailers.length > 0) {
                        const trailer = trailers[0];
                        console.log('First Trailer:', trailer);

                        // Update the YouTube iframe src with the trailer key
                        const ytKey = trailer.key;
                        const youtubeIframe = document.getElementById('videoframe');
                        youtubeIframe.src = `https://www.youtube.com/embed/${ytKey}?autoplay=1&mute=1&controls=0`;
                    } else {

                        console.log('No trailers found');
                    }
                })
                .catch(videoErr => console.error('Video Fetch Error:', videoErr));
        } else {
            console.error('No results found');
        }
    })
    .catch(err => console.error('Fetch Error:', err));


fetch("https://api.themoviedb.org/3/trending/movie/day?language=en-US", options).then(data => data.json()).then(data => {
    console.log("backdrop data");
    console.log(data);
    const imgpath = data.results;
    const cardContainer = document.getElementById('cards-container')
    // cardContainer.innerHTML = ''
    imgpath.forEach(element => {
        const cards= `<div class="card"><img src="https://image.tmdb.org/t/p/w500/${element.backdrop_path}"/></div>`
        // console.log("imgg" + imgg);
        cardContainer.innerHTML += cards

    });
})


fetch("https://api.themoviedb.org/3/tv/popular?language=en-US&page=1 ", options).then(data => data.json()).then(data => {
    console.log("backdrop data");
    console.log(data);
    const imgpath = data.results;
    const cardContainer = document.getElementById('cards2-container')
    // cardContainer.innerHTML = ''
    imgpath.forEach(element => {
        const cards= `<div class="card"><img src="https://image.tmdb.org/t/p/w500/${element.backdrop_path}"/></div>`
        // console.log("imgg" + imgg);
        cardContainer.innerHTML += cards

    });
})
