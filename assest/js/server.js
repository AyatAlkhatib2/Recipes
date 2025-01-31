const fs = require('fs');
const path = require('path');

const categories = ["breakfast", "lunch", "dinner", "dessert"];

function updateRecipesJSON() {
    let allRecipes = [];

    categories.forEach(category => {
        let recipeFolder = path.join(__dirname, category, "recipes");

        if (fs.existsSync(recipeFolder)) {
            let files = fs.readdirSync(recipeFolder);

            files.forEach(file => {
                if (file.endsWith(".html")) {
                    let filePath = path.join(recipeFolder, file);
                    let stats = fs.statSync(filePath);

                    allRecipes.push({
                        name: file.replace(".html", ""),
                        file: `${category}/recipes/${file}`,
                        dateUpdated: stats.mtime.toISOString()
                    });
                }
            });
        }
    });

    // Sort recipes by last modified date (newest first)
    allRecipes.sort((a, b) => new Date(b.dateUpdated) - new Date(a.dateUpdated));

    fs.writeFileSync("recipes.json", JSON.stringify(allRecipes, null, 2));
    console.log("✅ recipes.json updated!");
}

// Run the function once when the server starts
updateRecipesJSON();
