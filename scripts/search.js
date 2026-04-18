/*
    CIS 376 - 01 ; Dr. Cumbie
    Jasmine Morgan, Carina Estrada, and Anthony Guerrero
    4/20/2026
    Description: Search and Filter App for Shortcuts.
*/
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");
const searchMessage = document.getElementById("searchMessage");

let shortcutsData = []; // global var to hold fetched data

// 1. fetch data from json file
async function loadData() { // async makes the code wait for the data to arrive before displaying it
  try {
    const response = await fetch('assets/data.json'); // send request
    shortcutsData = await response.json(); // convert raw response into js array
    renderResults(shortcutsData); // show all results initially
    searchMessage.textContent = "Data loaded! Type to search..."; // data loaded and call renderResults
  } catch (error) { // if a file is missing or typo
    console.error("Error loading JSON data:", error);
    searchMessage.textContent = "Error loading data.";
  }
}
// 2. render data to the html 
function renderResults(items) {
  searchResults.innerHTML = ""; // clear previous results
  if (items.length === 0) { // if search has no result, let user know
    searchResults.innerHTML = "<li>No results found.</li>";
    return;
  }
  items.forEach(item => {  // loop through each object in the array 
    const li = document.createElement("li");
    li.innerHTML = `<strong>${item.shortcut}</strong>: ${item.description} <br> <small>Added by: ${item.author}</small>`;
    searchResults.appendChild(li); // add the new list item to the result list
  });
}

// 3. handle filtering 
function handleSearch() {
  const query = searchInput.value.trim().toLowerCase(); // get the current input, trim whitespace, make it lowercase
  
  if (!query) { // if search box is empty, show full result list
    renderResults(shortcutsData);
    searchMessage.textContent = "Type to search all fields";
    return;
  }
  
  const results = shortcutsData.filter(item => { // filter the array
    return (
      item.shortcut.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.author.toLowerCase().includes(query)
    );
  });

  renderResults(results); // display filtered results
  searchMessage.textContent = results.length ? `Found ${results.length} result(s)` : `No results for: ${query}`; // update the message
}

// event listeners
searchInput.addEventListener("input", handleSearch);

// initialize app
loadData();