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

  // ========================
  // Consultation Modal
  // ========================
  const modal = document.getElementById('consultationModal');
  const openBtn = document.getElementById('openConsultation');
  const closeBtn = document.getElementById('closeModal');
  const form = document.getElementById('consultationForm');
  const successToast = document.getElementById('successToast');

  function openModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  openBtn.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);

  // Close modal on overlay click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Close modal on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // Handle form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Collect form data
    const name = document.getElementById('patientName').value;
    const phone = document.getElementById('patientPhone').value;
    const age = document.getElementById('patientAge').value;
    const type = document.getElementById('problemType').value;
    const desc = document.getElementById('problemDesc').value;

    // Build WhatsApp message
    const message = `🏥 *استشارة طبية جديدة*\n\n👤 الاسم: ${name}\n📞 الهاتف: ${phone}\n🎂 العمر: ${age}\n🩺 نوع المشكلة: ${type}\n\n📝 الوصف:\n${desc}`;
    
    const whatsappUrl = `https://wa.me/201556728869?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp with the message
    window.open(whatsappUrl, '_blank');

    // Close modal and show success toast
    closeModal();
    form.reset();
    showToast(successToast);
  });

  // ========================
  // Product Search & Filter
  // ========================
  const searchInput = document.getElementById('productSearch');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');
  let activeFilter = 'all';

  // Filter buttons
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.dataset.filter;
      
      applyFilters();
    });
  });

  // Search input
  searchInput.addEventListener('input', () => {
    applyFilters();
  });

  function applyFilters() {
    const searchTerm = searchInput.value.toLowerCase().trim();

    productCards.forEach(card => {
      const category = card.dataset.category;
      const text = card.textContent.toLowerCase();

      const matchesFilter = activeFilter === 'all' || category === activeFilter;
      const matchesSearch = !searchTerm || text.includes(searchTerm);

      if (matchesFilter && matchesSearch) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  }
});

// ========================
// Add to Cart Animation
// ========================
function addToCart(btn) {
  const cartToast = document.getElementById('cartToast');
  
  // Button animation
  btn.classList.add('added');
  const icon = btn.querySelector('i');
  icon.className = 'ph ph-check';
  
  // Reset after animation
  setTimeout(() => {
    btn.classList.remove('added');
    icon.className = 'ph ph-shopping-cart-simple';
  }, 1500);

  // Show cart toast
  showToast(cartToast);
}

// ========================
// Toast Helper
// ========================
function showToast(toastEl) {
  toastEl.classList.add('show');
  setTimeout(() => {
    toastEl.classList.remove('show');
  }, 3000);
}
