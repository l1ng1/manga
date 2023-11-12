const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Настроим прокси для пересылки запросов
app.use('/api', createProxyMiddleware({
  target: 'https://api.remanga.org',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '/api', // Удаление "/api" из пути запроса, если необходимо
  },
}));

// Добавим заголовки CORS для вашего локального сервера
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:19006'); // Замените этот адрес на адрес вашего React Native приложения
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Начнем прослушивать порт
const port = 3000; // Вы можете выбрать любой доступный порт
app.listen(port, () => {
  console.log(`Прокси-сервер запущен на порту ${port}`);
});
