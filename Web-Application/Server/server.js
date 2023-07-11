const express = require('express');
const cors = require('cors');
const path = require('path');
const routes = require('./routes');
const config = require('./config.json');
const userlib = require('./userdbOperation');
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;


const app = express();
let db;
const url = 'mongodb+srv://liyux:Ashlyx1215.@recipe.mqzojkr.mongodb.net/?retryWrites=true&w=majority';

require('dotenv').config();

passport.use(new GitHubStrategy({
  clientID: "213bc46cb431985fbf28",
  clientSecret: "0e3fb9e0657ee102033cf03f76dc2b27ba2315b5",
  callbackURL: "http://localhost:3000/auth/github/callback"
},
function(profile, cb) {
  userlib.findOrCreate({ githubId: profile.id }, function (err, user) {
    return cb(err, user);
  });
}));

passport.serializeUser(function(user, done) {
  done(null, user._id);  // Here we are using the MongoDB user._id as the session identifier
});

passport.deserializeUser(function(id, done) {
  userlib.findUserById(id, function(err, user) {
    done(err, user);
  });
});


app.use(express.json());
// whitelist localhost 3000
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(cors({ credentials: true, origin: true }));
app.use(express.static(path.join(__dirname, '../client/build')));
app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: true }));
app.use(express.static(path.join(__dirname, '../client/build')));
app.get('/auth/github',
  passport.authenticate('github'));
app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });
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
