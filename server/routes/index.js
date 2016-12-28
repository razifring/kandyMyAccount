var express = require('express');
var path = require('path');
var apiCache = require('apicache');

module.exports = function(app) {
  app.get('/', function (req, res){
    res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
  });

  // see cache
  app.get('/api/cache/index', (req, res) => {
    res.json(apiCache.getIndex())
  });

  // clear all cache
  app.get('/api/cache/clear', (req, res) => {
    res.json(apiCache.clear())
  });
};