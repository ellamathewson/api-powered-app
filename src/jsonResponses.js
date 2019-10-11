/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable linebreak-style */

// Descriptions of AllDrinks from https://github.com/CoffeeJson/json/blob/gh-pages/coffee.json, by Robert James Gabriel

const faveDrinks = [];
// const today = new Date();
const allDrinks = require('./allDrinks.json');

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

const getAllDrinks = (request, response) => {
  const responseJSON = {
    allDrinks,
  };
  respondJSON(request, response, 200, responseJSON);
};

const addDrink = (request, response, body) => {
  console.dir(body);
  const responseJSON = {
    message: 'All fields are required',
  };

  if (!body.name || !body.date || !body.cafe || !body.description || !body.cost || !body.rating) {
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  // assumes we are doing a creation
  let responseCode = 201;

  // checks to see if we need to update instead by seeing if the drink already exists
  let drinkIndex = -1;
  for (let i = 0; i < faveDrinks.length; i++) {
    if (faveDrinks[i].name === body.name && faveDrinks[i].cafe === body.cafe) {
      responseCode = 204;
      drinkIndex = i;
      break;
    }
  }

  if (responseCode === 204) {
    faveDrinks[drinkIndex].name = body.name;
    faveDrinks[drinkIndex].date = body.date;
    faveDrinks[drinkIndex].cafe = body.cafe;
    faveDrinks[drinkIndex].description = body.description;
    faveDrinks[drinkIndex].cost = body.cost;
    faveDrinks[drinkIndex].rating = body.rating;

    return respondJSONMeta(request, response, responseCode);
  }
  // otherwise create a new drink in the array
  console.dir('pushing new object');
  faveDrinks.push({
    name: body.name,
    date: body.date,
    cafe: body.cafe,
    description: body.description,
    cost: body.cost,
    rating: body.rating,
  });

  responseJSON.message = 'Added to favorite drinks!';
  return respondJSON(request, response, responseCode, responseJSON);

  // if (faveDrinks[body.name]) {
  //   if (faveDrinks[body.name].name === body.name
  //     && faveDrinks[body.name].date === body.date
  //     && faveDrinks[body.name].cafe === body.cafe) {
  //     responseCode = 204;
  //   }
  // } else {
  //   faveDrinks[body.name] = {};
  // }

  // if drink already exists, edit current one
  // faveDrinks[body.name].name = [];
  // faveDrinks[body.name].cafe = [];
  // faveDrinks[body.name].date = [];
  // faveDrinks[body.name].description = [];
  // faveDrinks[body.name].cost = [];
  // faveDrinks[body.name].rating = [];

  // faveDrinks[body.name].name.push(body.name);
  // faveDrinks[body.name].cafe.push(body.cafe);
  // faveDrinks[body.name].date.push(body.date);
  // faveDrinks[body.name].description.push(body.description);
  // faveDrinks[body.name].cost.push(body.cost);
  // faveDrinks[body.name].rating.push(body.rating);

  // if (responseCode === 201) {
  //   responseJSON.message = 'Added to favorite drinks!';
  //   return respondJSON(request, response, responseCode, responseJSON);
  // } return respondJSONMeta(request, response, responseCode);
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
  getAllDrinks,
  notFound,
  notFoundMeta,
};
