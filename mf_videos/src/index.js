document.getElementById('search-button').addEventListener('click', async () => {
    const query = document.getElementById('search-input').value;
    const response = await fetch(`http://localhost:3002/videos?q=${query}`);
    const videos = await response.json();
    const videoList = document.getElementById('video-list');
    videoList.innerHTML = '';
    videos.items.forEach(video => {
        const videoItem = document.createElement('div');
        videoItem.className = 'video-item';
        videoItem.innerHTML = `
            <h3>${video.snippet.title}</h3>
            <img src="${video.snippet.thumbnails.default.url}" alt="${video.snippet.title}">
            <p>${video.snippet.description}</p>
        `;
        videoList.appendChild(videoItem);
    });
});
