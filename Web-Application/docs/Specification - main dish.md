Route 1: /getDish

________________________________________
**Description:** Returns cook information about a recipe, specified by id 
**Route Parameter(s):** None
**Query Parameter(s):** id (int)
**Route Handler:** getPastry(req, res) 
**Return Type:** JSON 
**Return Parameters:** {results (JSON array of { RecipeName (string), Author As Author, Ingredients (string), Directions (string), TotalTime(int) } **Expected (Output) Behavior:**
•	If the RecipeName(full name) is found return the singleton array of all the attributes available, but if the RecipeName is a string but is not found, return an empty array as ‘results’ without causing an error
•	Values like TotalTime might be NULL for some entries - return them as is.
________________________________________


Route 2: /search/dishes
________________________________________
**Description:** Returns an array of selected attributes for recipes that match the search query 
**Route Parameter(s):** None 
**Query Parameter(s):**
<!--   •	recipeName(string)*
  •	Recipe_Id(int)* -->
  •	RecipeName(string)*
<!--   •	Rate(float)* -->
**Route Handler:** searchDishes(req, res) 
**Return Type:** JSON 
**Return Parameters:** {results (JSON array of { RecipeId(int), Name (string), Rate(float)} 
**Expected (Output) Behavior:**
•	Return an array with all recipes that match the constraints. If no recipe satisfies the constraints, return an empty array as ‘results’ without causing an error
•	The behavior of the route with regard to page and, pagesize is:
o	Case 1: If the page parameter (page) is defined
	Return match entries with all the above return parameters for that page number by considering the page and pagesize parameters. For example, page 1 and page 7 for a page size 10 should have entries 1 through 10 and 61 through 70 respectively.
o	Case 2: If the page parameter (page) is not defined
	Return all match entries with all the above return parameters.
•	Alphabetically sort the results by the recipeName attribute

Route 3: /getSimilarRecipe

------

**Description:** Rank given recipes (up to 5) by similarity in nutritious with a given recipe , specified by recipeName 

**Route Parameter(s):** None

**Query Parameter(s)**: recipeName  (string), recipeList (array of string)

**Route Handler:** getSimilarRecipe(req, res)

**Return Type:** JSON

**Return Parameters :** {results
(JSON array of { RecipeName (string), Author(string), Ingredients (string), Directions (string), TotalTime(int)})

**Expected (Output) Behavior:**

- If the given recipeList (second parameter) is not empty, return these recipes in the order of similarity in nutritious with a given recipe (first parameter)
- Values like TotalTime might be NULL for some entries - return them as is.

