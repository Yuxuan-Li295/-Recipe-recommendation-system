const mysql = require('mysql');
const config = require('./config.json');

// TODO: fill in your connection details here
const connection = mysql.createConnection({
  host: config.rds_host,
  user: config.rds_user,
  password: config.rds_password,
  port: config.rds_port,
  database: config.rds_db,
});
connection.connect();
// Route 1 (handler)
async function hello(req, res) {
  // a GET request to /hello?name=Steve
  if (req.query.name) {
    res.send(`Hello, ${req.query.name}! Welcome to the FIFA server!`);
  } else {
    res.send('Hello! Welcome to the FIFA server!');
  }
}

/**
 * given recipe name, ingredient, total time, rating, 
 * return pastry recipes match the condition
 */
async function searchPastry(req, res) {
  const recipeName = req.query.recipeName ? req.query.recipeName : '';
  const ingredient = req.query.ingredient ? req.query.ingredient : '';
  const totalTimeLow = req.query.totalTimeLow ? req.query.totalTimeLow : 0;
  const totalTimeHigh = req.query.totalTimeHigh ? req.query.totalTimeHigh : 1000;
  const ratingLow = req.query.ratingLow ? req.query.ratingLow : 0;
  const ratingHigh = req.query.ratingHigh ? req.query.ratingHigh : 5;

  if (req.query.page && req.query.page !== 'null' && !Number.isNaN(req.query.page)) {
    const siz = req.query.pagesize ? req.query.pagesize : 10;
    const ofset = siz * (req.query.page - 1);
    const query = ` 
                    SELECT RecipeName, Author, PrepareTime, CookTime, TotalTime, AVGRating, Total_Review
                    FROM A_RecipeInfo
                            JOIN A_CookingTime ACT on A_RecipeInfo.RecipeID = ACT.RecipeID
                            LEFT JOIN Rating_T on Rating_T.RecipeID = A_RecipeInfo.RecipeID
                            JOIN A_CookBook ACB on A_RecipeInfo.RecipeID = ACB.RecipeID
                    WHERE RecipeName LIKE '%${recipeName}%'
                      AND Ingredients LIKE '%${ingredient}%'
                      AND TotalTime >= ${totalTimeLow}
                      AND TotalTime <= ${totalTimeHigh}
                      AND AVGRating >= ${ratingLow}
                      AND AVGRating <= ${ratingHigh}
                    ORDER BY RecipeName
                    LIMIT ${siz} OFFSET ${ofset};
                  `;

    connection.query(query, (error, results, fields) => {
      if (error) {
        console.log(fields);
        res.json({ error });
      } else {
        res.json({ results });
      }
    });
  } else {
    connection.query(`
                    SELECT RecipeName, Author, PrepareTime, CookTime, TotalTime, AVGRating, Total_Review
                    FROM A_RecipeInfo
                            JOIN A_CookingTime ACT on A_RecipeInfo.RecipeID = ACT.RecipeID
                            LEFT JOIN Rating_T on Rating_T.RecipeID = A_RecipeInfo.RecipeID
                            JOIN A_CookBook ACB on A_RecipeInfo.RecipeID = ACB.RecipeID
                    WHERE RecipeName LIKE '%${recipeName}%'
                      AND Ingredients LIKE '%${ingredient}%'
                      AND TotalTime >= ${totalTimeLow}
                      AND TotalTime <= ${totalTimeHigh}
                      AND AVGRating >= ${ratingLow}
                      AND AVGRating <= ${ratingHigh}
                    ORDER BY RecipeName;
                    `, (error, results, fields) => {
      if (error) {
        console.log(fields);
        res.json({ error });
      } else {
        res.json({ results });
      }
    });
  }
}

/**
 * given recipe name, get details of a pastry recipe 
 * */

async function getPastry(req, res) {
  const recipeName = req.query.recipeName ? req.query.recipeName : '';
  const query = ` SELECT ARI.RecipeName AS RecipeName, Author, Ingredients, Directions, RecipePhoto, TotalTime
                      FROM A_CookBook
                              JOIN A_RecipeInfo ARI on ARI.RecipeID = A_CookBook.RecipeID
                              JOIN A_Photo AP on ARI.RecipeID = AP.RecipeID
                              JOIN A_CookingTime ACT on ARI.RecipeID = ACT.RecipeID
                      WHERE RecipeName = '${recipeName}';
                    `;

  connection.query(query, (error, results, fields) => {
    if (error) {
      console.log(fields);
      res.json({ error });
    } else {
      res.json({ results });
    }
  });
}

/**
 * 
 * given recipe name, search for corresponding review
 */
async function getReview(req, res) {
  const recipeName = req.query.recipeName ? req.query.recipeName : '';
  const query = ` SELECT ProfileID, Comment, Rate
                  FROM A_Reviews
                          JOIN A_RecipeInfo ARI on ARI.RecipeID = A_Reviews.RecipeID
                  WHERE RecipeName = '${recipeName}';
                  `;

  connection.query(query, (error, results, fields) => {
    if (error) {
      console.log(fields);
      res.json({ error });
    } else {
      res.json({ results });
    }
  });
}
/**
 * 
 * @param {*} req 
 * @param {*} res
 * given profile id, search for corresponding user's review 
 */
async function getPersonReview(req, res) {
  const profileId = req.query.profileId ? req.query.profileId : '';
  const query = ` SELECT Comment, ARI.RecipeName, RecipePhoto, Rate, ProfileID
                  FROM A_Reviews
                      JOIN A_RecipeInfo ARI on ARI.RecipeID = A_Reviews.RecipeID
                      JOIN A_Photo AP on ARI.RecipeID = AP.RecipeID
                      JOIN A_CookingTime ACT on ARI.RecipeID = ACT.RecipeID
                  WHERE ProfileID = ${profileId};
                  `;

  connection.query(query, (error, results, fields) => {
    if (error) {
      console.log(fields);
      res.json({ error });
    } else {
      res.json({ results });
    }
  });
}

// #-------------------- Above: Pastry dataset ---- Below: Main Dish dataset ----------------
// Route: This query is used when a user goes into the
// main dish page and wants to search for some recipes based on recipe name,
// ingredient, rating and total cook time.

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * given recipe name, ingredient, total time, rating
 * retrun all matching dishes
 */
async function searchDishes(req, res) {
  const recipeName = req.query.recipeName ? req.query.recipeName : '';
  const ingredient = req.query.ingredient ? req.query.ingredient : '';
  const totalTimeLow = req.query.totalTimeLow ? req.query.totalTimeLow : 0;
  const totalTimeHigh = req.query.totalTimeHigh ? req.query.totalTimeHigh : 500;
  const ratingLow = req.query.ratingLow ? req.query.ratingLow : 0;
  const ratingHigh = req.query.ratingHigh ? req.query.ratingHigh : 5;
  if (req.query.page && req.query.page !== 'null' && !Number.isNaN(req.query.page)) {
    const siz = req.query.pagesize ? req.query.pagesize : 10;
    const ofset = siz * (req.query.page - 1);

    const query = `
    SELECT DISTINCT B_Recipe.Recipe_Id AS RecipeID, B_Recipe.Name AS RecipeName, Rate AS AVGRating, Total_Review AS NumReview
      FROM B_Recipe
      INNER JOIN (SELECT Cook_Id, Minutes FROM B_Cook_information) BCi on B_Recipe.Recipe_Id = BCi.Cook_Id
      INNER JOIN (SELECT User_Id FROM B_USER) BU ON BU.User_Id = Contributor_Id
      JOIN (SELECT Recipe_Id, Ingredient_Id FROM B_Recipe_Ingredient) BRI on B_Recipe.Recipe_Id = BRI.Recipe_Id
      JOIN (SELECT Ingredient_Name, Ingredient_Id FROM B_Ingredients) BI on BRI.Ingredient_Id = BI.Ingredient_Id
      JOIN B_Recipe_Review_Stats ON B_Recipe.Recipe_Id = B_Recipe_Review_Stats.Recipe_Id
      WHERE B_Recipe.Name LIKE '%${recipeName}%' AND Minutes>=${totalTimeLow} AND
            Minutes<=${totalTimeHigh} AND Ingredient_Name LIKE '%${ingredient}%' AND Rate>=${ratingLow}
            AND Rate<=${ratingHigh}
        LIMIT ${siz} OFFSET ${ofset}`;

    connection.query(query, (error, results) => {
      if (error) {
        console.log(error);
        res.json({ error });
      } else {
        res.json({ results });
      }
    });
  } else {
    connection.query(`
    SELECT DISTINCT B_Recipe.Recipe_Id AS RecipeID, B_Recipe.Name AS RecipeName, Rate AS AVGRating, Total_Review AS NumReview
      FROM B_Recipe
      INNER JOIN (SELECT Cook_Id, Minutes FROM B_Cook_information) BCi on B_Recipe.Recipe_Id = BCi.Cook_Id
      INNER JOIN (SELECT User_Id FROM B_USER) BU ON BU.User_Id = Contributor_Id
      JOIN (SELECT Recipe_Id, Ingredient_Id FROM B_Recipe_Ingredient) BRI on B_Recipe.Recipe_Id = BRI.Recipe_Id
      JOIN (SELECT Ingredient_Name, Ingredient_Id FROM B_Ingredients) BI on BRI.Ingredient_Id = BI.Ingredient_Id
      JOIN B_Recipe_Review_Stats ON B_Recipe.Recipe_Id = B_Recipe_Review_Stats.Recipe_Id
      WHERE B_Recipe.Name LIKE '%${recipeName}%' AND Minutes>=${totalTimeLow} AND
            Minutes<=${totalTimeHigh} AND Ingredient_Name LIKE '%${ingredient}%' AND Rate>=${ratingLow}
            AND Rate<=${ratingHigh}
       `, (error, results) => {
      if (error) {
        res.json({ error });
      } else {
        res.json({ results });
      }
    });
  }
}
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * given recipe name, return details of corresponding recipe
 */
async function getDish(req, res) {
  const recipeName = req.query.recipeName ? req.query.recipeName : '';
  const query = ` 
                SELECT B_Recipe.Name        AS RecipeName,
                      BU.Name              AS Author,
                      IL.Ingredients       AS Ingredients,
                      CI.Steps             AS Directions,
                      CI.Minutes,
                      BN.Carbohydrates_PDV AS Carbohydrates,
                      BN.Protein_PDV       AS Protein,
                      BN.Saturated_Fat_PDV AS SaturatedFat,
                      BN.Sodium_PDV        AS Sodium,
                      BN.Sugar_PDV         AS Sugar,
                      BN.Total_Fat_PDV     AS TotalFat,
                      B_Recipe.Rate        AS Rate1
                FROM B_Recipe
                        JOIN (SELECT User_Id, Name FROM B_USER) BU ON BU.User_Id = B_Recipe.Contributor_Id
                        JOIN (SELECT Steps, Minutes, Cook_Id FROM B_Cook_information) CI ON CI.Cook_Id = B_Recipe.Recipe_Id
                        JOIN B_Nutrition BN ON B_Recipe.Recipe_Id = BN.Nutrition_Id
                        JOIN B_Ingredients_List IL ON IL.Recipe_Id = B_Recipe.Recipe_Id
                WHERE B_Recipe.Name ='${recipeName}';
                `;

  connection.query(query, (error, results, fields) => {
    if (error) {
      console.log(fields);
      res.json({ error });
    } else {
      res.json({ results });
    }
  });
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * given user id, return corresponding user review
 */

async function getUserReview(req, res) {
  const userId = req.query.userId ? req.query.userId : 1533;
  const query = ` SELECT R.Recipe_Id AS RecipeID, Name AS RecipeName, BRBT.Rate AS Rating, R.Rate AS AVGRating, Review_Content AS ReviewContent
                  FROM B_Recipe R
                  JOIN B_Review_Belong_To BRBT on R.Recipe_Id = BRBT.Recipe_Id
                  WHERE User_Id = ${userId} ;
                  `;

  connection.query(query, (error, results, fields) => {
    if (error) {
      console.log(fields);
      res.json({ error });
    } else {
      res.json({ results });
    }
  });
}

// This query is used when the user goes into
// the user page of the main dish recommendation system.
// When selecting a specific user, it will list ingredients that user has commented on.

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * given user id, return user's favorate ingredients
 */
async function getUserFavIngredients(req, res) {
  const userId = req.query.userId ? req.query.userId : 1533;
  const query = `
                  WITH A AS (
                    SELECT R.Recipe_Id AS RecipeId
                    FROM B_Recipe R
                            JOIN B_Review_Belong_To BRBT on R.Recipe_Id = BRBT.Recipe_Id
                    WHERE User_Id = ${userId}
                  )
                  SELECT Ingredient_Name AS IngredientName, Count(*) AS Count
                  FROM A
                          JOIN B_Recipe_Ingredient RI ON A.RecipeId = RI.Recipe_Id
                          JOIN B_Ingredients BI on BI.Ingredient_Id = RI.Ingredient_Id
                  GROUP BY Ingredient_Name;
                  `;

  connection.query(query, (error, results, fields) => {
    if (error) {
      console.log(fields);
      res.json({ error });
    } else {
      res.json({ results });
    }
  });
}

// This query is used while showing user's rating preference on the user page.
// It will calculate the number of comments the user writes on each rating level.

/**
 * given user id, return number of user comments at different rating level
 */
async function getUserRatingDistrbution(req, res) {
  const userId = req.query.userId ? req.query.userId : 1533;
  const query = ` SELECT Rate AS Rating, COUNT(*) AS Count
                  FROM B_Review_Belong_To
                  WHERE User_Id = ${userId}
                  GROUP BY Rate
                  `;

  connection.query(query, (error, results, fields) => {
    if (error) {
      console.log(fields);
      res.json({ error });
    } else {
      res.json({ results });
    }
  });
}

/**
 * 
 * @param {*} req 
 * @param {*} res
 * given recipe name, return all the reviws corresponding to the dish 
 */
async function getReviewMaindishes(req, res) {
  const recipeName = req.query.recipeName ? req.query.recipeName : 'black coffee barbecue sauce';
  const query = `
                SELECT R.Name AS RecipeName, BU.Name AS Username, BU.User_Id AS UserID, BRBT.Rate AS Rating, R.Rate AS AVGRating, Review_Content AS ReviewContent
                FROM B_Recipe R
                JOIN B_Review_Belong_To BRBT on R.Recipe_Id = BRBT.Recipe_Id
                JOIN B_USER BU on BU.User_Id = BRBT.User_Id
                WHERE R.Name = '${recipeName}' 
                `;

  connection.query(query, (error, results) => {
    if (error) {
      res.json({ error });
    } else {
      res.json({ results });
    }
  });
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * given recipe name, return the nutretion distribution of the recipe
 */
async function getNutrition(req, res) {
  const recipeName = req.query.recipeName ? req.query.recipeName : '';
  const query = ` SELECT Name, Calorie_PDV, Total_Fat_PDV, Sugar_PDV, Protein_PDV, Sodium_PDV, Saturated_Fat_PDV, Carbohydrates_PDV
                  FROM B_Recipe
                  JOIN B_Nutrition BN on B_Recipe.Recipe_Id = BN.Nutrition_Id
                  WHERE Name = '${recipeName}';
                  `;

  connection.query(query, (error, results, fields) => {
    if (error) {
      console.log(fields);
      res.json({ error });
    } else {
      res.json({ results });
    }
  });
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * given substring of user name, return user information
 */
async function searchUsers(req, res) {
  const username = req.query.username ? req.query.username : '';
  const query = ` 
                SELECT Name AS Username, User_Id AS UserID, Number_of_Ratings AS NumRating
                FROM B_USER
                WHERE Name LIKE '%${username}%'
                  `;

  connection.query(query, (error, results, fields) => {
    if (error) {
      console.log(fields);
      res.json({ error });
    } else {
      res.json({ results });
    }
  });
}

/**
 * given user id, return user that has similar interest with given user
 */
async function getUserRecommByUser(req, res) {
  const { userId } = req.query;
  const query = ` 
                    WITH Rating_By_Me AS (SELECT Recipe_ID, Rate
                                        FROM B_Review_Belong_To
                                        WHERE User_Id = ${userId}
                                          AND Rate >= 4
                    ),
                      SIMILAR_USER AS (
                          SELECT User_Id, COUNT(*) AS RecommendRate
                          FROM B_Review_Belong_To
                                    JOIN Rating_By_Me ON Rating_By_Me.Recipe_Id = B_Review_Belong_To.Recipe_Id
                          WHERE User_Id != ${userId}
                            AND B_Review_Belong_To.Rate >= 4
                          GROUP BY User_Id
                      )
                    SELECT SIMILAR_USER.User_Id AS UserID, Name AS Username, RecommendRate
                    FROM SIMILAR_USER
                          JOIN B_USER ON SIMILAR_USER.User_Id = B_USER.User_Id
                    ORDER BY RecommendRate DESC
                    LIMIT 300;
                  `;

  connection.query(query, (error, results, fields) => {
    if (error) {
      console.log(fields);
      res.json({ error });
    } else {
      res.json({ results });
    }
  });
}

// This query is used on the recommendation page of the main dish recommendation system.
// It outputs dishes with similar ingredients which the user gives high rates on them.
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * given recipe id, return dishes similar with want the recipe
 */
async function getRecipeRecommByRecipe(req, res) {
  const { recipeId } = req.query;
  const query = ` 
                  WITH Ingredient_Contains AS (SELECT Ingredient_Id
                                              FROM B_Recipe_Ingredient
                                              WHERE Recipe_Id = ${recipeId}
                  ),
                      recomm_by_ingre AS (
                          select ri.Recipe_Id AS RecipeID, COUNT(*) AS RecommendRate
                          FROM Ingredient_Contains IC
                                    JOIN B_Recipe_Ingredient ri ON ri.Ingredient_Id = IC.Ingredient_Id
                          GROUP BY ri.Recipe_Id
                      )
                  SELECT recomm_by_ingre.RecipeID AS RecipeID, Name AS RecipeName, RecommendRate AS RecommendRate
                  FROM recomm_by_ingre
                          JOIN B_Recipe ON recomm_by_ingre.RecipeID = B_Recipe.Recipe_Id
                  ORDER BY RecommendRate DESC
                  LIMIT 300;
                  `;

  connection.query(query, (error, results, fields) => {
    if (error) {
      console.log(fields);
      res.json({ error });
    } else {
      res.json({ results });
    }
  });
}

// complex queries:
// The following two queries are considered as the most complex by us.
// They are used on the recommendation page in the main
// dish recommendation system. They used multiple join, aggregation, and subqueries.
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * given user id, return dishes similar with want user like
 */
async function getRecipeRecommByUser(req, res) {
  const { userId } = req.query;
  const query = `
                  WITH Good_Recipe_Rating_By_Me AS (SELECT RBT.Recipe_ID, Rate
                                                  FROM B_Review_Belong_To RBT
                                                          JOIN B_Recipe_Review_Stats BRRS on RBT.Recipe_Id = BRRS.Recipe_ID
                                                  WHERE User_Id = ${userId}
                                                    AND Rate >= 4
                                                    AND AVGRating >= 4
                                                    AND Total_Review >= 50
                  ),
                      Ingredient_Favorite AS (
                          SELECT Ingredient_Id
                          FROM Good_Recipe_Rating_By_Me rf
                                    JOIN B_Recipe_Ingredient ri ON ri.Recipe_Id = rf.Recipe_Id
                          GROUP BY Ingredient_Id
                      )
                  SELECT ri.Recipe_Id AS RecipeID, BR.Name AS RecipeName, COUNT(*) AS RecommendRate
                  FROM Ingredient_Favorite f
                          JOIN B_Recipe_Ingredient ri ON ri.Ingredient_Id = f.Ingredient_Id
                          JOIN B_Recipe BR on ri.Recipe_Id = BR.Recipe_Id
                  GROUP BY ri.Recipe_Id
                  ORDER BY RecommendRate DESC
                  LIMIT 300;
                `;

  connection.query(query, (error, results, fields) => {
    if (error) {
      console.log(fields);
      res.json({ error });
    } else {
      res.json({ results });
    }
  });
}

module.exports = {
  hello,
  searchPastry,
  getPastry,
  searchDishes,
  getDish,
  getUserReview,
  getUserFavIngredients,
  getUserRatingDistrbution,
  getReviewMaindishes,
  getReview,
  getPersonReview,
  getNutrition,
  searchUsers,
  getUserRecommByUser,
  getRecipeRecommByRecipe,
  getRecipeRecommByUser,
};
