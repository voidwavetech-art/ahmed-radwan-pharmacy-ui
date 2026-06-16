// Add sticky behavior to navbar on scroll
document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      navbar.style.boxShadow = 'var(--shadow-md)';
      navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    } else {
      navbar.style.boxShadow = 'var(--shadow-sm)';
      navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
    }
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Offset for navbar
          behavior: 'smooth'
        });
      }
    });
  });
});
