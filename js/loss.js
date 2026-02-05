

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
  
  lossListingsContainer.innerHTML = items.map(item => `
    <div class="loss-listing-card">
      <img 
        src="${item.thumbnailUrl}" 
        alt="${item.title}" 
        class="loss-listing-image"
        onerror="this.src='https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=400'"
      >
      <span class="loss-listing-status">Lost</span>
      <div class="loss-listing-content">
        <h3 class="loss-listing-title">${item.title}</h3>
        <p class="loss-listing-desc">${item.description}</p>
        <div class="loss-listing-meta">
          <div class="loss-meta-item">
            <i class="fas fa-location-dot"></i>
            <span>${item.location}</span>
          </div>
          <div class="loss-meta-item">
            <i class="fas fa-phone"></i>
            <span>${item.contact}</span>
          </div>
          <div class="loss-meta-item">
            <i class="fas fa-calendar"></i>
            <span>${formatDate(item.date)}</span>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}
// SEARCH FUNCTIONALITY
function searchLostItems() {
  const searchTerm = lossSearchInput.value.toLowerCase().trim();
  
  if (searchTerm === '') {
    displayLostItems(allLostItems);
    updateItemCount();
    return;
  }
  
  const filteredItems = allLostItems.filter(item => {
    return (
      item.title.toLowerCase().includes(searchTerm) ||
      item.description.toLowerCase().includes(searchTerm) ||
      item.location.toLowerCase().includes(searchTerm) ||
      item.contact.toLowerCase().includes(searchTerm)
    );
  });
  
  displayLostItems(filteredItems);
  updateItemCount(filteredItems.length);
}
// UPDATE ITEM COUNT
function updateItemCount(count) {
  if (!lossCountBadge) return;
  
  const displayCount = count !== undefined ? count : allLostItems.length;
  lossCountBadge.textContent = `${displayCount} ${displayCount === 1 ? 'item' : 'items'}`;
}
// EVENT LISTENERS
if (lossSearchBtn) {
  lossSearchBtn.addEventListener('click', searchLostItems);
}

if (lossSearchInput) {
  lossSearchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
      searchLostItems();
    }
  });
  
  // Real-time search as user types
  lossSearchInput.addEventListener('input', searchLostItems);
}
function formatDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    return 'Today';
  } else if (diffDays === 1) {
    return 'Yesterday';
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }
}
if (lossListingsContainer) {
  initLostItemsPage();
}
