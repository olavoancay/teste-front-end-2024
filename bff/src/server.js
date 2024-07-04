const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const API_KEY = process.env.YOUTUBE_API_KEY;
let favorites = [];

// Endpoint para buscar vídeos
app.get('/videos', async (req, res) => {
    const { q } = req.query;
    try {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${q}&key=${API_KEY}`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Erro ao buscar vídeos:', error);
        res.status(500).send('Erro ao buscar vídeos');
    }
});

// Endpoint para adicionar/remover favoritos
app.post('/favorites', (req, res) => {
    const { videoId } = req.body;
    const index = favorites.findIndex(fav => fav.videoId === videoId);
    if (index === -1) {
        favorites.push({ videoId });
    } else {
        favorites.splice(index, 1);
    }
    res.json(favorites);
});

// Endpoint para obter a lista de favoritos
app.get('/favorites', (req, res) => {
    res.json(favorites);
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Servidor BFF executando na porta ${PORT}`);
});
