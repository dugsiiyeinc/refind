const lossListingsContainer = document.getElementById('lossListings');
const lossSearchInput = document.getElementById('lossSearchInput');
const lossSearchBtn = document.getElementById('lossSearchBtn');
const lossCountBadge = document.getElementById('lossCount');

let allLostItems = [];

function initLostItemsPage() {
  loadLostItems();
  displayLostItems(allLostItems);
  updateItemCount();
}

// LOAD LOST ITEMS FROM LOCALSTORAGE

function loadLostItems() {
  const items = JSON.parse(localStorage.getItem('refindItems')) || [];
  allLostItems = items.filter(item => item.status === 'lost');
}

// DISPLAY LOST ITEMS

function displayLostItems(items) {
  if (!lossListingsContainer) return;
  
  if (items.length === 0) {
    lossListingsContainer.innerHTML = `
      <div class="loss-empty-state" style="grid-column: 1/-1;">
        <i class="fas fa-circle-exclamation"></i>
        <h3>No lost items found</h3>
        <p>Try adjusting your search or check back later.</p>
      </div>
    `;
    return;
  }