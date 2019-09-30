/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable linebreak-style */

const faveDrinks = {};

const respondJSON = (request, response, status, object) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  response.writeHead(status, headers);
  response.write(JSON.stringify(object));
  response.end();
};

const respondJSONMeta = (request, response, status) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  response.writeHead(status, headers);
  response.end();
};

const addNewDrink = (request, response, body) => {
  const responseJSON = {
    message: 'Name is required',
  };

  if (!body.drink) {
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, respondJSON);
  }

  const responseCode = 201;

  //   if (faveDrinks[body.drink]) {
  //     responseCode = 204;
  //   } else {
  //     faveDrinks[body.drink] = {};
  //   }

  faveDrinks[body.drink].drink = body.drink;

  if (responseCode === 201) {
    responseJSON.message = 'Added to favorite drinks!';
    return responseJSON(request, response, responseCode, responseJSON);
  } return respondJSONMeta(request, response, responseCode);
};

const notFound = (request, response) => {
  // create error message for response
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  // return a 404 with an error message
  respondJSON(request, response, 404, responseJSON);
};

const notFoundMeta = (request, response) => {
  respondJSONMeta(request, response, 404);
};

// public exports
module.exports = {
  addNewDrink,
  notFound,
  notFoundMeta,
};
