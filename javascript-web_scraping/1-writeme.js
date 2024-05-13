#!/usr/bin/node

const fs = require('fs');
const fileName = process.argv[2];
const textToTransform = process.argv[3];

fs.writeFile(fileName, textToTransform, err => {
  if (err) {
    console.log(err);
  }
});
