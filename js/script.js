// SAMPLE DATA
const itemsData = [
  {
    id: 1,
    title: "Black Leather Wallet",
    description: "Lost black leather wallet containing ID cards and some cash. Has a small scratch on the front.",
    location: "Central Park, New York",
    contact: "+39 123 456 789",
    status: "lost",
    thumbnailUrl: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400",
    date: "2026-01-28"
  },
  {
    id: 2,
    title: "iPhone 15 Pro",
    description: "Found an iPhone 15 Pro with a blue case near the coffee shop. Screen protector is slightly cracked.",
    location: "Starbucks, Downtown",
    contact: "+39 987 654 321",
    status: "found",
    thumbnailUrl: "https://images.unsplash.com/photo-1592286927505-83d9b14fd6eb?w=400",
    date: "2026-01-27"
  },
  {
    id: 3,
    title: "Golden Retriever Dog",
    description: "Lost golden retriever, very friendly, responds to 'Max'. Wearing a red collar with tag.",
    location: "Riverside Park",
    contact: "+39 555 123 456",
    status: "lost",
    thumbnailUrl: "https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=400",
    date: "2026-01-26"
  },
  {
    id: 4,
    title: "Silver Watch",
    description: "Found a beautiful silver watch near the train station. Has engravings on the back.",
    location: "Central Station",
    contact: "+39 444 789 123",
    status: "found",
    thumbnailUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
    date: "2026-01-25"
  },
  {
    id: 5,
    title: "Red Backpack",
    description: "Lost red backpack with laptop inside. Has university logo on the front pocket.",
    location: "University Library",
    contact: "+39 333 222 111",
    status: "lost",
    thumbnailUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
    date: "2026-01-24"
  },
  {
    id: 6,
    title: "Set of Car Keys",
    description: "Found car keys with BMW keychain and several other keys attached. Found in parking lot.",
    location: "Shopping Mall Parking",
    contact: "+39 666 777 888",
    status: "found",
    thumbnailUrl: "https://images.unsplash.com/photo-1582719366962-6aa8c6a01b6a?w=400",
    date: "2026-01-23"
  },
  {
    id: 7,
    title: "Blue Bicycle",
    description: "Lost blue mountain bike, 21 speed, has some scratches on the frame. Serial number available.",
    location: "City Center",
    contact: "+39 222 333 444",
    status: "lost",
    thumbnailUrl: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400",
    date: "2026-01-22"
  },
  {
    id: 8,
    title: "Wedding Ring",
    description: "Found gold wedding ring with diamond stones near the beach. Has inscription inside.",
    location: "Sunset Beach",
    contact: "+39 888 999 000",
    status: "found",
    thumbnailUrl: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400",
    date: "2026-01-21"
  }
];

if (!localStorage.getItem('refindItems')) {
  localStorage.setItem('refindItems', JSON.stringify(itemsData));
}

// DOM ELEMENTS

const hamburgerBtn = document.getElementById('hamburgerBtn');
const reportBtns = document.querySelectorAll('#reportBtn, #ctaReportBtn, #aboutReportBtn');
const reportModal = document.getElementById('reportModal');
const closeModalBtn = document.getElementById('closeModal');
const cancelBtn = document.getElementById('cancelBtn');
const reportForm = document.getElementById('reportForm');

// MOBILE MENU TOGGLE

if (hamburgerBtn) {
  let mobileMenu = document.querySelector('.mobile-menu');
  if (!mobileMenu) {
    mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    mobileMenu.id = 'mobileMenu';
    const pcMenu = document.querySelector('.pc-menu ul');
    if (pcMenu) {
      const menuHTML = `
        <ul>
          ${Array.from(pcMenu.children).map(li => li.outerHTML).join('')}
        </ul>
        <button class="report-btn btn-primary" onclick="document.getElementById('reportBtn').click()">
          <i class="fas fa-plus"></i>
          Report Item
        </button>
      `;
      mobileMenu.innerHTML = menuHTML;
    }
    const header = document.querySelector('.main-header');
    if (header) {
      header.parentNode.insertBefore(mobileMenu, header.nextSibling);
    }
  }
  
  hamburgerBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    hamburgerBtn.classList.toggle('active');
    if (mobileMenu.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  });
  const mobileLinks = mobileMenu.querySelectorAll('a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      hamburgerBtn.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
  document.addEventListener('click', (e) => {
    if (mobileMenu.classList.contains('active') && 
        !mobileMenu.contains(e.target) && 
        !hamburgerBtn.contains(e.target)) {
      mobileMenu.classList.remove('active');
      hamburgerBtn.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

// MODAL FUNCTIONS

function openModal() {
  if (reportModal) {
    reportModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal() {
  if (reportModal) {
    reportModal.classList.remove('active');
    document.body.style.overflow = '';
    if (reportForm) {
      reportForm.reset();
    }
  }
}

if (reportBtns) {
  reportBtns.forEach(btn => {
    btn.addEventListener('click', openModal);
  });
}

if (closeModalBtn) {
  closeModalBtn.addEventListener('click', closeModal);
}

if (cancelBtn) {
  cancelBtn.addEventListener('click', closeModal);
}

if (reportModal) {
  reportModal.addEventListener('click', (e) => {
    if (e.target === reportModal) {
      closeModal();
    }
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && reportModal && reportModal.classList.contains('active')) {
    closeModal();
  }
});

// FORM SUBMISSION
if (reportForm) {
  reportForm.addEventListener('submit', (e) => {
    e.preventDefault();
    

    const formData = new FormData(reportForm);
    const newItem = {
      id: Date.now(),
      title: formData.get('title'),
      description: formData.get('description'),
      location: formData.get('location'),
      contact: formData.get('contact'),
      status: formData.get('status'),
      thumbnailUrl: formData.get('thumbnailUrl') || 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=400',
      date: new Date().toISOString().split('T')[0]
    };
    
    const wordCount = newItem.description.trim().split(/\s+/).length;
    if (wordCount > 100) {
      alert('Description must be 100 words or less. Current: ' + wordCount + ' words');
      return;
    }
    let items = JSON.parse(localStorage.getItem('refindItems')) || [];
    items.unshift(newItem);
    localStorage.setItem('refindItems', JSON.stringify(items));

    alert('Item reported successfully!');
    

    closeModal();
    

    window.location.reload();
  });
}

// DISPLAY RECENT LISTINGS 
const recentListingsContainer = document.getElementById('recentListings');

if (recentListingsContainer) {
  displayRecentListings();
}

function displayRecentListings() {
  const items = JSON.parse(localStorage.getItem('refindItems')) || [];
  const recentItems = items.slice(0, 6); // Show 6 most recent items
  
  if (recentItems.length === 0) {
    recentListingsContainer.innerHTML = `
      <div class="loss-empty-state" style="grid-column: 1/-1;">
        <i class="fas fa-box-open"></i>
        <h3>No items yet</h3>
        <p>Be the first to report an item!</p>
      </div>
    `;
    return;
  }
  
  recentListingsContainer.innerHTML = recentItems.map(item => `
    <div class="listing-card">
      <img src="${item.thumbnailUrl}" alt="${item.title}" class="listing-image" onerror="this.src='https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=400'">
      <div class="listing-content">
        <span class="listing-status ${item.status}">${item.status === 'lost' ? 'Lost' : 'Found'}</span>
        <h3 class="listing-title">${item.title}</h3>
        <p class="listing-desc">${item.description}</p>
        <div class="listing-meta">
          <div><i class="fas fa-location-dot"></i> ${item.location}</div>
          <div><i class="fas fa-phone"></i> ${item.contact}</div>
          <div><i class="fas fa-calendar"></i> ${formatDate(item.date)}</div>
        </div>
      </div>
    </div>
  `).join('');
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

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  const pcMenuLinks = document.querySelectorAll('.pc-menu a');
  pcMenuLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.includes(currentPage)) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
  
  const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');
  mobileMenuLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.includes(currentPage)) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

setActiveNavLink();
