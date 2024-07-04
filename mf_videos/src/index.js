const API_KEY = 'AIzaSyD7qCOBCKNy28Mo4Y_r9jPs-ccQPNflCgg';

async function fetchFavorites() {
    const response = await fetch('http://localhost:3002/favorites');
    return response.json();
}

async function fetchVideos(query) {
    const response = await fetch(`http://localhost:3002/videos?q=${query}`);
    return response.json();
}

async function toggleFavorite(videoId) {
    const response = await fetch('http://localhost:3002/favorites', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ videoId }),
    });
    return response.json();
}

function createVideoItem(video, isFavorite) {
    const videoItem = document.createElement('div');
    videoItem.className = 'video-item';
    videoItem.innerHTML = `
        <h3>${video.snippet.title}</h3>
        <iframe width="200" height="150" src="https://www.youtube.com/embed/${video.id.videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        <p>${video.snippet.description}</p>
        <button class="favorite-button ${isFavorite ? 'favorite' : ''}" data-video-id="${video.id.videoId}">⭐</button>
    `;
    return videoItem;
}

async function displayVideos(videos) {
    const favorites = await fetchFavorites();
    const videoList = document.getElementById('video-list');
    videoList.innerHTML = '';
    videos.forEach(video => {
        const isFavorite = favorites.some(fav => fav.videoId === video.id.videoId);
        const videoItem = createVideoItem(video, isFavorite);
        videoList.appendChild(videoItem);
    });

    document.querySelectorAll('.favorite-button').forEach(button => {
        button.addEventListener('click', async (event) => {
            const videoId = event.target.getAttribute('data-video-id');
            const favorites = await toggleFavorite(videoId);
            event.target.classList.toggle('favorite', favorites.some(fav => fav.videoId === videoId));
        });
    });
}

document.getElementById('search-button').addEventListener('click', async () => {
    const query = document.getElementById('search-input').value;
    const data = await fetchVideos(query);
    displayVideos(data.items);
});

document.addEventListener('DOMContentLoaded', async () => {
    if (window.location.pathname.includes('favoritos')) {
        const favorites = await fetchFavorites();
        const videoList = document.getElementById('video-list');
        videoList.innerHTML = '';
        favorites.forEach(async favorite => {
            const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${favorite.videoId}&key=${API_KEY}`);
            const data = await response.json();
            const video = data.items[0];
            const videoItem = createVideoItem(video, true);
            videoList.appendChild(videoItem);
        });
    }
});
