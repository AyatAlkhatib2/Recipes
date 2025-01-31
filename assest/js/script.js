document.addEventListener("DOMContentLoaded", () => {
    fetchRecipes();
    setupHamburgerMenu();
});

function setupHamburgerMenu() {
    const hamburger = document.getElementById("hamburger");
    const menu = document.getElementById("ham-menu");

    hamburger.addEventListener("click", () => {
        menu.classList.toggle("hidden");
    });
}

async function fetchRecipes() {
    try {
        const response = await fetch("recipes/recipes.json");
        const recipes = await response.json();

        // Sort recipes by dateUpdated (newest first)
        recipes.sort((a, b) => new Date(b.dateUpdated) - new Date(a.dateUpdated));

        let recipeList = document.getElementById("recipeList");
        recipeList.innerHTML = "";

        recipes.forEach(recipe => {
            let recipeDiv = document.createElement("div");
            recipeDiv.classList.add("recipe");
            recipeDiv.innerHTML = `<strong>${recipe.name}</strong><br>Updated: ${new Date(recipe.dateUpdated).toLocaleString()}`;
            recipeList.appendChild(recipeDiv);
        });
    } catch (error) {
        console.error("Error fetching recipes:", error);
    }
}


document.addEventListener("DOMContentLoaded", function () {
    const menuBtn = document.getElementById("menu-btn");
    const sidebar = document.getElementById("sidebar");
    const closeBtn = document.getElementById("close-btn");

    // Open Sidebar
    menuBtn.addEventListener("click", function () {
        sidebar.classList.add("open");
    });

    // Close Sidebar
    closeBtn.addEventListener("click", function () {
        sidebar.classList.remove("open");
    });

    // Close sidebar if user clicks outside of it
    document.addEventListener("click", function (event) {
        if (!sidebar.contains(event.target) && event.target !== menuBtn) {
            sidebar.classList.remove("open");
        }
    });
});