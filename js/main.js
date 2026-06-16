// ========================
// Cart State
// ========================
let cart = [];

// ========================
// DOM Ready
// ========================
document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');

  // Sticky navbar shadow
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
          top: targetElement.offsetTop - 80,
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
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (modal.classList.contains('active')) closeModal();
      if (cartOverlay.classList.contains('active')) closeCartSidebar();
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('patientName').value;
    const phone = document.getElementById('patientPhone').value;
    const age = document.getElementById('patientAge').value;
    const type = document.getElementById('problemType').value;
    const desc = document.getElementById('problemDesc').value;

    const message = `🏥 *استشارة طبية جديدة*\n\n👤 الاسم: ${name}\n📞 الهاتف: ${phone}\n🎂 العمر: ${age}\n🩺 نوع المشكلة: ${type}\n\n📝 الوصف:\n${desc}`;
    window.open(`https://wa.me/201556728869?text=${encodeURIComponent(message)}`, '_blank');
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

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.dataset.filter;
      applyFilters();
    });
  });

  searchInput.addEventListener('input', () => applyFilters());

  function applyFilters() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    productCards.forEach(card => {
      const category = card.dataset.category;
      const text = card.textContent.toLowerCase();
      const matchesFilter = activeFilter === 'all' || category === activeFilter;
      const matchesSearch = !searchTerm || text.includes(searchTerm);
      card.classList.toggle('hidden', !(matchesFilter && matchesSearch));
    });
  }

  // ========================
  // Cart Sidebar
  // ========================
  const cartOverlay = document.getElementById('cartOverlay');
  const openCartBtn = document.getElementById('openCart');
  const closeCartBtn = document.getElementById('closeCart');
  const clearCartBtn = document.getElementById('clearCart');
  const sendOrderBtn = document.getElementById('sendOrder');

  function openCartSidebar() {
    cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCartSidebar() {
    cartOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  openCartBtn.addEventListener('click', openCartSidebar);
  closeCartBtn.addEventListener('click', closeCartSidebar);
  cartOverlay.addEventListener('click', (e) => { if (e.target === cartOverlay) closeCartSidebar(); });

  clearCartBtn.addEventListener('click', () => {
    cart = [];
    renderCart();
    showToast(document.getElementById('cartToast'));
  });

  sendOrderBtn.addEventListener('click', () => {
    if (cart.length === 0) return;

    let orderLines = cart.map((item, i) => {
      return `${i + 1}. ${item.name} × ${item.qty} = ${item.price * item.qty} EGP`;
    });

    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

    const message = `🛒 *طلب جديد من صيدلية أحمد رضوان*\n\n` +
      orderLines.join('\n') +
      `\n\n💰 *الإجمالي: ${total} EGP*` +
      `\n\nشكراً لتعاملكم معنا! 🌿`;

    window.open(`https://wa.me/201556728869?text=${encodeURIComponent(message)}`, '_blank');

    // Clear cart after sending
    cart = [];
    renderCart();
    closeCartSidebar();
    showToast(successToast);
  });
});

// ========================
// Add to Cart
// ========================
function addToCart(btn) {
  const card = btn.closest('.product-card');
  const name = card.querySelector('h4').textContent;
  const priceText = card.querySelector('.product-price').textContent;
  const price = parseInt(priceText.replace(/[^0-9]/g, ''));

  // Check if already in cart
  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ name, price, qty: 1 });
  }

  // Button animation
  btn.classList.add('added');
  const icon = btn.querySelector('i');
  icon.className = 'ph ph-check';
  setTimeout(() => {
    btn.classList.remove('added');
    icon.className = 'ph ph-shopping-cart-simple';
  }, 1200);

  renderCart();
  showToast(document.getElementById('cartToast'));
}

// ========================
// Render Cart
// ========================
function renderCart() {
  const cartItems = document.getElementById('cartItems');
  const cartEmpty = document.getElementById('cartEmpty');
  const cartFooter = document.getElementById('cartFooter');
  const cartBadge = document.getElementById('cartBadge');
  const cartTotal = document.getElementById('cartTotal');

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  // Update badge
  cartBadge.textContent = totalItems;
  if (totalItems > 0) {
    cartBadge.classList.remove('hidden');
    cartBadge.classList.add('pulse');
    setTimeout(() => cartBadge.classList.remove('pulse'), 400);
  } else {
    cartBadge.classList.add('hidden');
  }

  // Toggle empty state
  if (cart.length === 0) {
    cartEmpty.style.display = 'flex';
    cartItems.innerHTML = '';
    cartFooter.style.display = 'none';
    return;
  }

  cartEmpty.style.display = 'none';
  cartFooter.style.display = 'flex';
  cartTotal.textContent = `${totalPrice} EGP`;

  // Render items
  cartItems.innerHTML = cart.map((item, index) => `
    <div class="cart-item">
      <div class="cart-item-icon">
        <i class="ph ph-pill"></i>
      </div>
      <div class="cart-item-info">
        <div class="cart-item-name font-en">${item.name}</div>
        <div class="cart-item-price font-en">${item.price} EGP</div>
      </div>
      <div class="cart-item-controls">
        <button class="qty-btn" onclick="changeQty(${index}, -1)">−</button>
        <span class="qty-value">${item.qty}</span>
        <button class="qty-btn" onclick="changeQty(${index}, 1)">+</button>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart(${index})">
        <i class="ph ph-trash-simple"></i>
      </button>
    </div>
  `).join('');
}

// ========================
// Cart Actions
// ========================
function changeQty(index, delta) {
  cart[index].qty += delta;
  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }
  renderCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  renderCart();
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
