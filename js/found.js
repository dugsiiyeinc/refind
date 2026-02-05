

const foundListingsContainer = document.getElementById('foundListings');
const foundSearchInput = document.getElementById('foundSearchInput');
const foundSearchBtn = document.getElementById('foundSearchBtn');
const foundCountBadge = document.getElementById('foundCount');

let allFoundItems = [];
function initFoundItemsPage() {
  loadFoundItems();
  displayFoundItems(allFoundItems);
  updateItemCount();
}
// LOAD FOUND ITEMS FROM LOCALSTORAGE
function loadFoundItems() {
  const items = JSON.parse(localStorage.getItem('refindItems')) || [];
  allFoundItems = items.filter(item => item.status === 'found');
}
// DISPLAY FOUND ITEMS
function displayFoundItems(items) {
  if (!foundListingsContainer) return;
  
  if (items.length === 0) {
    foundListingsContainer.innerHTML = `
      <div class="found-empty-state" style="grid-column: 1/-1;">
        <i class="fas fa-circle-check"></i>
        <h3>No found items yet</h3>
        <p>Try adjusting your search or check back later.</p>
      </div>
    `;
    return;
  }
  
  foundListingsContainer.innerHTML = items.map(item => `
    <div class="found-listing-card">
      <img 
        src="${item.thumbnailUrl}" 
        alt="${item.title}" 
        class="found-listing-image"
        onerror="this.src='https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=400'"
      >
      <span class="found-listing-status">Found</span>
      <div class="found-listing-content">
        <h3 class="found-listing-title">${item.title}</h3>
        <p class="found-listing-desc">${item.description}</p>
        <div class="found-listing-meta">
          <div class="found-meta-item">
            <i class="fas fa-location-dot"></i>
            <span>${item.location}</span>
          </div>
          <div class="found-meta-item">
            <i class="fas fa-phone"></i>
            <span>${item.contact}</span>
          </div>
          <div class="found-meta-item">
            <i class="fas fa-calendar"></i>
            <span>${formatDate(item.date)}</span>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}
function searchFoundItems() {
  const searchTerm = foundSearchInput.value.toLowerCase().trim();
  
  if (searchTerm === '') {
    displayFoundItems(allFoundItems);
    updateItemCount();
    return;
  }
  
  const filteredItems = allFoundItems.filter(item => {
    return (
      item.title.toLowerCase().includes(searchTerm) ||
      item.description.toLowerCase().includes(searchTerm) ||
      item.location.toLowerCase().includes(searchTerm) ||
      item.contact.toLowerCase().includes(searchTerm)
    );
  });
  
  displayFoundItems(filteredItems);
  updateItemCount(filteredItems.length);
}
function updateItemCount(count) {
  if (!foundCountBadge) return;
  
  const displayCount = count !== undefined ? count : allFoundItems.length;
  foundCountBadge.textContent = `${displayCount} ${displayCount === 1 ? 'item' : 'items'}`;
}
if (foundSearchBtn) {
  foundSearchBtn.addEventListener('click', searchFoundItems);
}

if (foundSearchInput) {
  foundSearchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
      searchFoundItems();
    }
  });
  
  // Real-time search as user types
  foundSearchInput.addEventListener('input', searchFoundItems);
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
if (foundListingsContainer) {
  initFoundItemsPage();
}
