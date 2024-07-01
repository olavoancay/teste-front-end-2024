document.getElementById('search-button').addEventListener('click', async () => {
    const query = document.getElementById('search-input').value;
    const response = await fetch(`http://localhost:3002/search?query=${query}`);
    const videos = await response.json();
    const videoList = document.getElementById('video-list');
    videoList.innerHTML = '';
    videos.forEach(video => {
        const videoItem = document.createElement('div');
        videoItem.className = 'video-item';
        videoItem.innerHTML = `
            <h3>${video.title}</h3>
            <img src="${video.thumbnail}" alt="${video.title}">
            <p>${video.description}</p>
        `;
        videoList.appendChild(videoItem);
    });
});
