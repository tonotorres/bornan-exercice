const express = require('express');
const router = express.Router();
const app = express();

router.get('/', (req, res) => {
  res.render('index', { title: 'Bornan - Ejercicio JS' });
});

router.get('/disculpas', (req, res) => {
  res.render('disculpas', { title: 'Disculpas' });
});

module.exports = router;
