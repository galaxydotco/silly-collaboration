/*
    CIS 376 - 01 ; Dr. Cumbie
    Jasmine Morgan, Carina Estrada, and Anthony Guerrero
    4/20/2026
    Description: Search and Filter App for Shortcuts.
*/
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");
const searchMessage = document.getElementById("searchMessage");

function renderResults(items) {
  searchResults.innerHTML = "";
  if (items.length === 0) {
    searchResults.innerHTML = "<li>No results found.</li>";
    return;
  }
  items.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.action} | Windows Cmd: ${item.windows} `;
    searchResults.appendChild(li);
  });
}

function handleSearch() {
  const query = searchInput.value.trim().toLowerCase();
  if (!query) {
    renderResults(shortcutsData);
    searchMessage.textContent = "Type to search all fields";
    return;
  }
  
  const results = shortcutsData.filter(item => {
    const values = Object.values(item);
    return values.some(value => String(value).toLowerCase().includes(query));
  });
  renderResults(results);
  searchMessage.textContent = results.length ? `Found ${results.length} result(s)` : `No results for: ${query}`;
}


searchInput.addEventListener("input", handleSearch);

renderResults(shortcutsData);