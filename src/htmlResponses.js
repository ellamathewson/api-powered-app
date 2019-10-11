/* eslint-disable linebreak-style */
const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
// const addDrink = fs.readFileSync(`${__dirname}/../client/addDrink.html`);

const css = fs.readFileSync(`${__dirname}/../client/style.css`);
const beansImage = fs.readFileSync(`${__dirname}/../images/beans.jpg`);

const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

// const getAddDrink = (request, response) => {
//   response.writeHead(200, { 'Content-Type': 'text/html' });
//   response.write(addDrink);
//   response.end();
// };

const getCSS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(css);
  response.end();
};

const getImage = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'image/jpeg' });
  response.write(beansImage);
  response.end();
  // fs.stat(file, (err, status) => {
  //     if(err) {
  //         if(err.code === 'ENOENT') {
  //             response.writeHead(404);
  //         }
  //         return response.end(err);
  //     }
  //     const stream = writeHead(request, response, stats, file, 'image/jpeg');
  //     stream.on('open', () => {
  //         stream.pipe(response);
  //     });
  //     stream.on('error', (streamErr) => {
  //         response.end(streamErr);
  //     });
  // })
};

module.exports = {
  getIndex,
  getCSS,
  getImage,
  // getAddDrink,
};
