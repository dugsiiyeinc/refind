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