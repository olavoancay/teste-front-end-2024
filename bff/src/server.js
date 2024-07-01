const express = require('express');
const app = express();
const axios = require('axios');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
require('dotenv').config();
app.use(bodyParser.json());


const JWT_SECRET = process.env.JWT_SECRET;
const YOUTUBE_API_KEY = 'AIzaSyD7qCOBCKNy28Mo4Y_r9jPs-ccQPNflCgg';

// Rota de login sem fazer validações
app.post('/login', (req, res) => {
    const token = jwt.sign({ user: req.body.user }, JWT_SECRET);
    res.json({ token });
});

// Rota para buscar vídeos
app.get('/videos', async (req, res) => {
    const { q } = req.query;
    const response = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${q}&key=${YOUTUBE_API_KEY}`);
    res.json(response.data); 
});

let favorites = [];

//Rota para adicionar vídeos aos favoritos
app.post('/favorites', (req, res) => {
    const { video } = req.body;
    favorites.push(video);
    res.json(favorites);
  });
  
  // Rota para remover vídeo dos favoritos
  app.delete('/favorites', (req, res) => {
    const { videoId } = req.body;
    favorites = favorites.filter(v => v.id !== videoId);
    res.json(favorites);
  });
  
  // Rota para listar vídeos favoritos
  app.get('/favorites', (req, res) => {
    res.json(favorites);
  });
  
  app.listen(3002, () => console.log('BFF running on port 3002'));
