function goToPages() {
    let selectedMeals = [];
    document.querySelectorAll('input[name="meal"]:checked').forEach((checkbox) => {
        selectedMeals.push(checkbox.value);
    });

    if (selectedMeals.length > 0) {
        selectedMeals.forEach(meal => {
            window.open(meal + "/index.html", "_blank"); // Open each folder's index.html in a new tab
        });
    } else {
        alert("Please select at least one meal.");
    }
}