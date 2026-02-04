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



