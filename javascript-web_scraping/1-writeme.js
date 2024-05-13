#!/usr/bin/node
const request = require('request');
request.get(process.argv[2], (error, response, body) => {
  if (error) throw error;
  console.log('code:', response.statusCode);
});
