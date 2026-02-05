const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);
document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll(
    '.about-split, .about-value-card, .about-story, .about-join'
  );
  
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
  
  // About page report button
  const aboutReportBtn = document.getElementById('aboutReportBtn');
  if (aboutReportBtn) {
    aboutReportBtn.addEventListener('click', () => {
      const reportBtn = document.getElementById('reportBtn');
      if (reportBtn) {
        reportBtn.click();
      }
    });
  }
});
