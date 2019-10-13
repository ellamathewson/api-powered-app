/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable linebreak-style */

// Descriptions of AllDrinks from https://github.com/CoffeeJson/json/blob/gh-pages/coffee.json, by Robert James Gabriel

// array holding all of the favorite drinks
const faveDrinks = [];

// grabs the presaved JSOn object of allDrinks
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

// grabs the favorite drinks from array
const getDrinks = (request, response) => {
  const responseJSON = {
    faveDrinks,
  };

  respondJSON(request, response, 200, responseJSON);
};

const getDrinksMeta = (request, response) => respondJSONMeta(request, response, 200);

// grabs all the drinks from the page
const getAllDrinks = (request, response) => {
  const responseJSON = {
    allDrinks,
  };
  respondJSON(request, response, 200, responseJSON);
};

const getAllDrinksMeta = (request, response) => respondJSONMeta(request, response, 200);

// adds drink to faveDrinks array
const addDrink = (request, response, body) => {
  console.dir(body);
  const responseJSON = {
    message: 'All fields are required',
  };

  // all fields must be filled out for it to be added
  if (!body.name || !body.date || !body.cafe || !body.description || !body.cost || !body.rating) {
    // if it doesnt, respond to user that there are missing parameters
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

  // if it's updating, updates the data to the new data provided
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

  // responds to the page
  responseJSON.message = 'Added to favorite drinks!';
  return respondJSON(request, response, responseCode, responseJSON);
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
  getAllDrinksMeta,
  notFound,
  notFoundMeta,
};
