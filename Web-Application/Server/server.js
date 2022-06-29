const express = require('express');
const cors = require('cors');
const path = require('path');
const routes = require('./routes');
const config = require('./config.json');
const userlib = require('./userdbOperation');

const app = express();
let db;
const url = 'mongodb+srv://cis350:cis350@cluster0.ivirc.mongodb.net/cis550?retryWrites=true&w=majority';

require('dotenv').config();

app.use(express.json());
// whitelist localhost 3000
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(cors({ credentials: true, origin: true }));
app.use(express.static(path.join(__dirname, '../client/build')));

// Route - search pastry
app.get('/search/pastry', routes.searchPastry);

// Route - get certain pastry
app.get('/getPastry', routes.getPastry);

// Route - search all certain dishes
app.get('/search/dishes', routes.searchDishes);

// Route - Get all the dishes from main dish dataset
app.get('/getDish', routes.getDish);

// Route - Get the distribution for rates that a user has made
app.get('/getUserRatingDistrbution', routes.getUserRatingDistrbution);

// Route - get the favourate ingredients of a user
app.get('/getUserFavIngredients', routes.getUserFavIngredients);

// get the review of the a user
app.get('/getUserReview', routes.getUserReview);

// Route - get review according to recipe name
app.get('/review', routes.getReview);

// Route - get the reviews for the main dish dataset
app.get('/review/maindishes', routes.getReviewMaindishes);

// Route - search the information of users
app.get('/search/users', routes.searchUsers);

// Route - get reviews according to profile ID
app.get('/pastryReview', routes.getPersonReview);

// Route - get nutritions
app.get('/nutrition', routes.getNutrition);

// Route - recommand recipe given user
app.get('/getRecipeRecommByUser', routes.getRecipeRecommByUser);

// Route - recommand recipe given recipe
app.get('/getRecipeRecommByRecipe', routes.getRecipeRecommByRecipe);

// Route - recommand user given user
app.get('/getUserRecommByUser', routes.getUserRecommByUser);

// Route - login an user according to userName and password
app.get('/login/:userName/:password', async (req, resp) => {
  // check the name was provided
  const { userName, password } = req.params;
  try {
    const result = await userlib.checkUser(db, userName, password);
    // send the response
    if (result) {
      return resp.status(201).json({ success: true, data: result, error: null });
    }
    return resp.status(201).json({ success: false, data: null, error: 'invalid user' });
  } catch (err) {
    console.log(err);
    return resp.status(201).json({ success: false, data: null, error: err });
  }
});

// handle all other invalid urls
// wildcard endpoint - send react app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Default response for any other request
app.use((_req, res) => {
  res.status(404);
});

const port = process.env.PORT || config.server_port;
app.listen(port, async () => {
  console.log(`Server running at ${port}`);
  db = await userlib.connect(url);
});

module.exports = app;
