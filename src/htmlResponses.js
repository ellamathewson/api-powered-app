/* eslint-disable linebreak-style */
const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);

const css = fs.readFileSync(`${__dirname}/../client/style.css`);
const beansImage = fs.readFileSync(`${__dirname}/../images/beans.jpg`);

// gets the index page
const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

// applies css to page
const getCSS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(css);
  response.end();
};

// grabs the image used in the background
const getImage = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'image/jpeg' });
  response.write(beansImage);
  response.end();
};

module.exports = {
  getIndex,
  getCSS,
  getImage,
};
