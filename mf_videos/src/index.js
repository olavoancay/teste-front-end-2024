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

document.getElementById('search-button').addEventListener('click', async () => {
    const query = document.getElementById('search-input').value;
    const data = await fetchVideos(query);
    const videos = data.items;
    const favorites = await fetchFavorites();
    const videoList = document.getElementById('video-list');
    videoList.innerHTML = '';
    videos.forEach(video => {
        const isFavorite = favorites.some(fav => fav.videoId === video.id.videoId);
        const videoItem = document.createElement('div');
        videoItem.className = 'video-item';
        videoItem.innerHTML = `
            <h3>${video.snippet.title}</h3>
            <img src="${video.snippet.thumbnails.default.url}" alt="${video.snippet.title}">
            <p>${video.snippet.description}</p>
            <button class="favorite-button ${isFavorite ? 'favorite' : ''}" data-video-id="${video.id.videoId}">⭐</button>
        `;
        videoList.appendChild(videoItem);
    });

    document.querySelectorAll('.favorite-button').forEach(button => {
        button.addEventListener('click', async (event) => {
            const videoId = event.target.getAttribute('data-video-id');
            const favorites = await toggleFavorite(videoId);
            event.target.classList.toggle('favorite', favorites.some(fav => fav.videoId === videoId));
        });
    });
});
