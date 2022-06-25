Route 1: /getPastry

------

**Description:** Returns information about a recipe, specified by recipeName 

**Route Parameter(s):** None

**Query Parameter(s)**: recipeName  (string)

**Route Handler:** getPastry(req, res)

**Return Type:** JSON

**Return Parameters :** {results
(JSON array of { RecipeName (string), Ingredients (string), Directions (string), RecipePhoto (string), TotalTime(int) }

**Expected (Output) Behavior:**

- If the RecipeName(full name) is found return the singleton array of all the attributes available, but if the RecipeName is a string but is not found, return an empty array as ‘results’ without causing an error

- Values like TotalTime might be NULL for some entries - return them as is.

  

------

Route 2: /search/pastry

------



**Description:** Returns an array of selected attributes for recipes that match the search query

**Route Parameter(s):** None

**Query Parameter(s):**

- recipeName(string)*
- ingredient(string)*
- totalTimeLow(int)*(default: 0)
- totalTimeHigh(int)*(default: 1000)
- ratingLow(int)*(default: 0)
- ratingHigh(int)*(default: 5)
- page (int)*

- pagesize (int)(default: 10)*

**Route Handler:** searchPastry(req, res)

**Return Type:** JSON

**Return Parameters:** {results (JSON array of { recipeName(string), Author (string), PrepareTime
(int), CookTime(int), TotalTime(int), AVGRating(float), Total_Review(int) }) }

**Expected (Output) Behavior:**

- Return an array with all recipes that match the constraints. If no recipe satisfies the constraints, return an empty array as ‘results’ without causing an error
- The behavior of the the route with regard to page and, pagesize is:
  - Case 1: If the page parameter (page) is defined
    - Return match entries with all the above return parameters for that page number by considering the page and pagesize parameters. For example, page 1 and page 7 for a page size 10 should have entries 1 through 10 and 61 through 70 respectively.
  - Case 2: If the page parameter (page) is not defined
    - Return all match entries with all the above return parameters. 
- xHigh and xLow are the upper and lower bound filters for an attribute x. Entries that match the ends of the bounds should be included in the match. For example, if ratingLowwere 1 and ratingHigh were 5, then all recipes whose AVGRatingwas >=1 and <=5 would be included.
- Values like TotalTime might be NULL for some entries - return them as is.
- Alphabetically sort the results by the recipeName attribute



------

Route 3: /getPastryReview

------

**Description:** Returns reviews about a recipe, specified by recipeName 

**Route Parameter(s):** None

**Query Parameter(s)**: recipeName (string)

**Route Handler:** getPastryReview(req, res)

**Return Type:** JSON

**Return Parameters :** {results(JSON array of { Comment(string), Rate(int) }

**Expected (Output) Behavior:**

- If the RecipeName(full name) is found return the singleton array of all the attributes available, but if the RecipeName is a string but is not found, return an empty array as ‘results’ without causing an error.

------

Route 4: /clearFridge  

------

**Description:** Returns recipes that consume largest number of ingredients that the user wants to use. Possibly we can return recipes that consume the top 5 largest number of ingredients

**Route Parameter(s):** None

**Query Parameter(s)**: ingredients  (array of string)

**Route Handler:** clearFridge (req, res)

**Return Type:** JSON

**Return Parameters :** {results
(JSON array of { RecipeName (string), Ingredients (string), Directions (string), RecipePhoto (string), TotalTime(int) }

**Expected (Output) Behavior:**

- If the recipes which are satisfied the conditions are found, return the singleton array of all the attributes available, but if not recipes are fond, return an empty array as ‘results’ without causing an error
- Values like TotalTime might be NULL for some entries - return them as is.



