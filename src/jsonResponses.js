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

const getDrinks = (request, response) => {
  const responseJSON = {
    faveDrinks,
  };

  respondJSON(request, response, 200, responseJSON);
};

const getDrinksMeta = (request, response) => respondJSONMeta(request, response, 200);

const addDrink = (request, response, body) => {
  console.dir(body);
  const responseJSON = {
    message: 'Name is required',
  };

  if (!body.name) {
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  let responseCode = 201;

  if (faveDrinks[body.name]) {
    responseCode = 204;
  } else {
    faveDrinks[body.name] = {};
  }

  faveDrinks[body.name].name = body.name;

  if (responseCode === 201) {
    responseJSON.message = 'Added to favorite drinks!';
    return respondJSON(request, response, responseCode, responseJSON);
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
  addDrink,
  getDrinks,
  getDrinksMeta,
  notFound,
  notFoundMeta,
};
