// ========================
// Cart State
// ========================
let cart = [];

// ========================
// Product Icon/Color Map
// ========================
const CATEGORY_STYLE = {
  pain:        { icon: 'ph-pill', color: 'var(--primary)', bg: 'linear-gradient(135deg, #E8F5E0, #C8E6B8)' },
  stomach:     { icon: 'ph-flask', color: 'var(--warning)', bg: 'linear-gradient(135deg, #FFF3E0, #FFE0B2)' },
  vitamins:    { icon: 'ph-leaf', color: 'var(--success)', bg: 'linear-gradient(135deg, #E0F2F1, #B2DFDB)' },
  skincare:    { icon: 'ph-drop', color: '#E879A0', bg: 'linear-gradient(135deg, #FCE4EC, #F8BBD0)' },
  antibiotics: { icon: 'ph-prescription', color: '#6366F1', bg: 'linear-gradient(135deg, #EDE7F6, #D1C4E9)' },
  allergy:     { icon: 'ph-flower-lotus', color: '#EC4899', bg: 'linear-gradient(135deg, #FDE7F0, #F9BCD8)' }
};

const VISIBLE_COUNT = 8;

const DEFAULT_PRODUCTS = [
  { name: 'Panadol Extra', desc: 'بانادول إكسترا - مسكن للآلام وخافض للحرارة', category: 'pain', price: 108, badge: 'متوفر', image: 'images/panadol-extra-tab-01762260859.webp' },
  { name: 'Brufen 400mg', desc: 'بروفين 400 مجم - مضاد للالتهابات ومسكن قوي', category: 'pain', price: 78, badge: 'متوفر', image: 'images/brufen-400mg-30-tablets-x0m6-01721234522.webp' },
  { name: 'Cataflam 50mg', desc: 'كتافلام - مسكن سريع المفعول للآلام الحادة', category: 'pain', price: 86, badge: 'متوفر', image: 'images/cataflam-50-mg-tab-01723552610.webp' },
  { name: 'Antinal 200mg', desc: 'أنتينال - مطهر معوي لعلاج الإسهال والتقلصات', category: 'stomach', price: 52, badge: 'متوفر', image: 'images/antinal-tablet-01668934670.webp' },
  { name: 'Nexium 40mg', desc: 'نيكسيوم - لعلاج حموضة المعدة وارتجاع المريء', category: 'stomach', price: 488, badge: 'متوفر', image: 'images/nexium-40-mg-28-tab-u0yk-01666699935.webp' },
  { name: 'Motilium 10mg', desc: 'موتيليوم - لعلاج الغثيان والقيء وعسر الهضم', category: 'stomach', price: 100, badge: 'متوفر', image: 'images/motilium-10-mg-40-tab-9z55-01666530255.webp' },
  { name: 'Vitamin C 1000mg', desc: 'فيتامين سي - لتعزيز المناعة ومقاومة نزلات البرد', category: 'vitamins', price: 54, badge: 'متوفر', image: 'images/vitacid-c-plus-vitamin-c-zinc-12tab-jfh8-01673385089.webp' },
  { name: 'Centrum Silver', desc: 'سنتروم سيلفر - فيتامينات متعددة للبالغين فوق 50', category: 'vitamins', price: 300, badge: 'متوفر', image: 'images/centrum-silver-30tab-orxv-01764163062.webp' },
  { name: 'Omega-3 Fish Oil', desc: 'أوميجا 3 - لصحة القلب والأوعية الدموية والمفاصل', category: 'vitamins', price: 230, badge: 'متوفر', image: 'images/limitless-omega-3-30-capsule-cu7j-1643294585.webp' },
  { name: 'CeraVe Moisturizer', desc: 'سيرافي - مرطب يومي للبشرة الجافة والحساسة', category: 'skincare', price: 550, badge: 'متوفر', image: 'images/cerave-moisturizing-cream-177g-tube-mnco-01723386479.webp' },
  { name: 'La Roche-Posay SPF50', desc: 'لاروش بوزيه - واقي شمس بعامل حماية عالي', category: 'skincare', price: 1070, badge: 'متوفر', image: 'images/anthelios-ultra-spf50-senza-profumo-50-ml-tpri-01648214702.webp' },
  { name: 'Bioderma Sensibio', desc: 'بيوديرما - ماء ميسيلار لتنظيف البشرة الحساسة', category: 'skincare', price: 899, badge: 'متوفر', image: 'images/bioderma-sensibio-h2o-hypoallergenic-makeup-removing-micellar-solution-for-sensitive-skin-parabens-freeuhde-01735401584.webp' },
  { name: 'Augmentin 1g', desc: 'أوجمنتين - مضاد حيوي واسع المجال للعدوى البكتيرية', category: 'antibiotics', price: 210, badge: 'متوفر', image: 'images/augmentin-antibiotic-1g-14tab-aoh8-1641396704.webp' },
  { name: 'Flagyl 500mg', desc: 'فلاجيل - مضاد للبكتيريا والطفيليات والعدوى اللاهوائية', category: 'antibiotics', price: 34, badge: 'متوفر', image: 'images/flagyl-500-tablet-01721656290.webp' },
  { name: 'Zithromax 500mg', desc: 'زيثروماكس - مضاد حيوي لعلاج التهابات الجهاز التنفسي', category: 'antibiotics', price: 160, badge: 'متوفر', image: 'images/zithromax-500mg-3tab-obkj-01667661122.webp' },
  { name: 'Telfast 180mg', desc: 'تلفاست - لعلاج أعراض الحساسية والعطس والرشح', category: 'allergy', price: 116, badge: 'متوفر', image: 'images/telfast-antihistamine-allergy-tablets-180-mg-20-tablets-01742218244.webp' },
  { name: 'Zyrtec 10mg', desc: 'زيرتك - مضاد للحساسية سريع المفعول بدون نعاس', category: 'allergy', price: 100, badge: 'متوفر', image: 'images/zyrtec-10-mg-20-tab-1642424493.webp' },
  { name: 'Avamys Nasal Spray', desc: 'أفاميس - بخاخ أنف لعلاج التهاب الأنف التحسسي', category: 'allergy', price: 80, badge: 'متوفر', image: 'images/avamys-nasal-spray-01724063287.webp' },
];

function loadProducts() {
  let stored = localStorage.getItem('pharmacy_products');
  const version = localStorage.getItem('pharmacy_data_version');

  // Initialize or migrate to v1.2 if needed
  if (!stored || version !== '1.2') {
    localStorage.setItem('pharmacy_products', JSON.stringify(DEFAULT_PRODUCTS));
    localStorage.setItem('pharmacy_data_version', '1.2');
    stored = JSON.stringify(DEFAULT_PRODUCTS);
  }

  const products = JSON.parse(stored);
  const grid = document.getElementById('productsGrid');
  if (!grid) return;

  grid.innerHTML = products.map((p, i) => {
    const style = CATEGORY_STYLE[p.category] || CATEGORY_STYLE.pain;
    const badgeHtml = p.badge
      ? `<div class="product-badge" ${p.badge === 'متوفر' ? 'style="background-color: var(--success);"' : ''}>${p.badge}</div>`
      : '';
    const hiddenClass = i >= VISIBLE_COUNT ? ' extra-product' : '';

    const imgHtml = p.image
      ? `<div class="product-img has-image"><img src="${p.image}" alt="${p.name}"></div>`
      : `<div class="product-img" style="background: ${style.bg};"><i class="ph ${style.icon}" style="color: ${style.color};"></i></div>`;

    return `
      <div class="product-card${hiddenClass}" data-category="${p.category}" style="${i >= VISIBLE_COUNT ? 'display:none;' : ''}">
        ${badgeHtml}
        ${imgHtml}
        <h4 class="font-en">${p.name}</h4>
        <p class="product-desc">${p.desc}</p>
        <div class="product-footer">
          <span class="product-price font-en">${p.price} EGP</span>
          <button class="btn-add" onclick="addToCart(this)"><i class="ph ph-shopping-cart-simple"></i></button>
        </div>
      </div>
    `;
  }).join('');

  // Add "Show More" button if needed
  const showMoreContainer = document.getElementById('showMoreContainer');
  if (showMoreContainer) {
    if (products.length > VISIBLE_COUNT) {
      showMoreContainer.style.display = 'flex';
    } else {
      showMoreContainer.style.display = 'none';
    }
  }
}

// ========================
// DOM Ready
// ========================
document.addEventListener('DOMContentLoaded', () => {
  // Load products from localStorage (admin managed)
  loadProducts();

  // Show More button
  const showMoreBtn = document.getElementById('showMoreBtn');
  if (showMoreBtn) {
    showMoreBtn.addEventListener('click', () => {
      document.querySelectorAll('.extra-product').forEach(card => {
        card.style.display = '';
        card.classList.remove('extra-product');
      });
      document.getElementById('showMoreContainer').style.display = 'none';
    });
  }

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
      if (orderInfoModal.classList.contains('active')) closeOrderInfoModal();
      if (document.getElementById('complaintModal').classList.contains('active')) {
        document.getElementById('complaintModal').classList.remove('active');
        document.body.style.overflow = '';
      }
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
    const productCards = document.querySelectorAll('.product-card');
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
    openOrderInfoModal();
  });

  // ========================
  // Order Info Modal
  // ========================
  const orderInfoModal = document.getElementById('orderInfoModal');
  const closeOrderInfoBtn = document.getElementById('closeOrderInfo');
  const orderInfoForm = document.getElementById('orderInfoForm');

  function openOrderInfoModal() {
    // Close cart sidebar first
    closeCartSidebar();

    // Populate order summary
    const summaryItems = document.getElementById('orderSummaryItems');
    const summaryTotal = document.getElementById('orderSummaryTotal');
    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

    summaryItems.innerHTML = cart.map(item => `
      <div class="order-summary-item">
        <div>
          <span class="order-summary-item-name font-en">${item.name}</span>
          <span class="order-summary-item-qty"> × ${item.qty}</span>
        </div>
        <span class="order-summary-item-price font-en">${item.price * item.qty} EGP</span>
      </div>
    `).join('');
    summaryTotal.textContent = `${total + 30} EGP`;

    // Open modal
    orderInfoModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeOrderInfoModal() {
    orderInfoModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  closeOrderInfoBtn.addEventListener('click', closeOrderInfoModal);
  orderInfoModal.addEventListener('click', (e) => { if (e.target === orderInfoModal) closeOrderInfoModal(); });

  orderInfoForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('customerName').value;
    const phone = document.getElementById('customerPhone').value;
    const address = document.getElementById('customerAddress').value;
    const landmark = document.getElementById('customerLandmark').value;
    const notes = document.getElementById('customerNotes').value;

    let orderLines = cart.map((item, i) => {
      return `${i + 1}. ${item.name} × ${item.qty} = ${item.price * item.qty} EGP`;
    });
    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

    let message = `🛒 *طلب جديد من صيدلية أحمد رضوان*\n\n`;
    message += `👤 *الاسم:* ${name}\n`;
    message += `📞 *الهاتف:* ${phone}\n`;
    message += `📍 *العنوان:* ${address}\n`;
    if (landmark) message += `🏢 *علامة مميزة:* ${landmark}\n`;
    if (notes) message += `📝 *ملاحظات:* ${notes}\n`;
    message += `\n━━━━━━━━━━━━━━\n`;
    message += `📦 *المنتجات:*\n\n`;
    message += orderLines.join('\n');
    message += `\n\n🚚 *التوصيل: 30 EGP*`;
    message += `\n💰 *الإجمالي: ${total + 30} EGP*`;
    message += `\n\nشكراً لتعاملكم معنا! 🌿`;

    window.open(`https://wa.me/201556728869?text=${encodeURIComponent(message)}`, '_blank');

    // Clear everything
    cart = [];
    renderCart();
    closeOrderInfoModal();
    orderInfoForm.reset();
    showToast(successToast);
  });

  // ========================
  // Complaint Modal
  // ========================
  const complaintModal = document.getElementById('complaintModal');
  const openComplaintBtn = document.getElementById('openComplaint');
  const closeComplaintBtn = document.getElementById('closeComplaint');
  const complaintForm = document.getElementById('complaintForm');

  function openComplaintModal() {
    complaintModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeComplaintModal() {
    complaintModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  openComplaintBtn.addEventListener('click', openComplaintModal);
  closeComplaintBtn.addEventListener('click', closeComplaintModal);
  complaintModal.addEventListener('click', (e) => { if (e.target === complaintModal) closeComplaintModal(); });

  complaintForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const type = document.getElementById('complaintType').value;
    const desc = document.getElementById('complaintDesc').value;

    // Save to localStorage for admin to see
    const complaints = JSON.parse(localStorage.getItem('pharmacy_complaints') || '[]');
    complaints.push({
      type,
      desc,
      date: new Date().toLocaleString('ar-EG'),
      read: false
    });
    localStorage.setItem('pharmacy_complaints', JSON.stringify(complaints));

    closeComplaintModal();
    complaintForm.reset();
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
  document.getElementById('cartSubtotal').textContent = `${totalPrice} EGP`;
  cartTotal.textContent = `${totalPrice + 30} EGP`;

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
