const rootURL = !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : '';

// DB wrapper - used to fetch all the pastry from pastry dataset
const getPastrySearch = async (
  recipeName,
  ingredient,
  totalTimeLow,
  totalTimeHigh,
  ratingLow,
  ratingHigh,
  page,
  pagesize,
) => {
  const res = await fetch(`${rootURL}/search/pastry?recipeName=${recipeName}&ingredient=${ingredient}&totalTimeLow=${totalTimeLow}&totalTimeHigh=${totalTimeHigh}&ratingLow=${ratingLow}&ratingHigh=${ratingHigh}&page=${page}&pagesize=${pagesize}`, {
    method: 'GET',
  });
  return res.json();
};

// DB wrapper - used to fetch a certain pastry. Name,
// instruction, ingredients, links to img will be returned
const getPastry = async (name) => {
  const res = await fetch(`${rootURL}/getPastry?recipeName=${name}`, {
    method: 'GET',
  });
  return res.json();
};

// DB wrapper, get the reviews from the pastry dataset.
const getReview = async (name) => {
  const res = await fetch(`${rootURL}/review?recipeName=${name}`, {
    method: 'GET',
  });
  return res.json();
};

// DB wrapper, get all the reviews belongs to a certain user.
const getPersonReview = async (profileId) => {
  const res = await fetch(`${rootURL}/pastryReview?profileId=${profileId}`, {
    method: 'GET',
  });
  return res.json();
};

// #-------------------- Above: Pastry dataset ---- Below: Main Dish dataset ----------------

// DB wrapper, search for certain main dishes given a bunch of conditions.
const getDishesSearch = async (
  recipeName,
  ingredient,
  totalTimeLow,
  totalTimeHigh,
  ratingLow,
  ratingHigh,
  page,
  pagesize,
) => {
  const res = await fetch(`${rootURL}/search/dishes?recipeName=${recipeName}&ingredient=${ingredient}&totalTimeLow=${totalTimeLow}&totalTimeHigh=${totalTimeHigh}&ratingLow=${ratingLow}&ratingHigh=${ratingHigh}&page=${page}&pagesize=${pagesize}`, {
    method: 'GET',
  });
  return res.json();
};

// DB wrapper, get all the dishes from the main dish dataset.
const getDish = async (name) => {
  const res = await fetch(`${rootURL}/getDish?recipeName=${name}`, {
    method: 'GET',
  });
  return res.json();
};

// DB wrapper, get all the reviews from the main dish dataset.
const getUserReview = async (userId) => {
  const res = await fetch(`${rootURL}/getUserReview?userId=${userId}`, {
    method: 'GET',
  });
  return res.json();
};

// DB wrapper, analyse the user's favorate ingredients.
const getUserFavIngredients = async (userId) => {
  const res = await fetch(`${rootURL}/getUserFavIngredients?userId=${userId}`, {
    method: 'GET',
  });
  return res.json();
};

// DB wrapper, analyse the user's rating distribution.
const getUserRatingDistrbution = async (userId) => {
  const res = await fetch(`${rootURL}/getUserRatingDistrbution?userId=${userId}`, {
    method: 'GET',
  });
  return res.json();
};

// DB wrapper, recommend recipe according to user
const getRecipeRecommByUser = async (userId) => {
  const res = await fetch(`${rootURL}/getRecipeRecommByUser?userId=${userId}`, {
    method: 'GET',
  });
  return res.json();
};

// DB wrapper, recommend recipe according to the similar recipe
const getRecipeRecommByRecipe = async (RecipeId) => {
  const res = await fetch(`${rootURL}/getRecipeRecommByRecipe?recipeId=${RecipeId}`, {
    method: 'GET',
  });
  return res.json();
};

// DB wrapper, recommand similar user who shares the similar user behavior.
const getUserRecommByUser = async (userId) => {
  const res = await fetch(`${rootURL}/getUserRecommByUser?userId=${userId}`, {
    method: 'GET',
  });
  return res.json();
};

// DB wrapper, get nutritions of a certain recipe.
const getNutrition = async (recipeName) => {
  const res = await fetch(`${rootURL}/nutrition?recipeName=${recipeName}`, {
    method: 'GET',
  });
  return res.json();
};

// DB wrapper, search an user according to his/her name
const getUserSearch = async (username) => {
  const res = await fetch(`${rootURL}/search/users?username=${username}`, {
    method: 'GET',
  });
  return res.json();
};

// DB wrapper, search for reviews of a main dish
const getReviewMaindishes = async (name) => {
  const res = await fetch(`${rootURL}/review/maindishes?recipeName=${name}`, {
    method: 'GET',
  });
  return res.json();
};

export {
  getPastrySearch,
  getPastry,
  getDishesSearch,
  getDish,
  getUserReview,
  getUserFavIngredients,
  getUserRatingDistrbution,
  getPersonReview,
  getReview,
  getNutrition,
  getUserSearch,
  getReviewMaindishes,
  getRecipeRecommByRecipe,
  getRecipeRecommByUser,
  getUserRecommByUser,
};
