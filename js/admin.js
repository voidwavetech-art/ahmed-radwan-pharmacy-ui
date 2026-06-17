// ========================
// Default Products Data
// ========================
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

const CATEGORY_LABELS = {
  pain: 'مسكنات',
  stomach: 'معدة وهضم',
  vitamins: 'فيتامينات',
  skincare: 'عناية بالبشرة',
  antibiotics: 'مضادات حيوية',
  allergy: 'حساسية'
};

// ========================
let products = [];
let complaints = [];
let deleteIndex = -1;

async function initAdminData() {
  const dbData = await getDbData();
  products = dbData.products;
  
  // Initialize default products if none exist in Firebase
  if (!products) {
    products = DEFAULT_PRODUCTS;
    await saveDbProducts(products);
  }
  
  complaints = dbData.complaints || [];

  renderTable();
  updateStats();
  renderComplaints();
}

document.addEventListener('DOMContentLoaded', () => {
  initAdminData();

  // ========================
  // Search & Filter
  // ========================
  document.getElementById('adminSearch').addEventListener('input', renderTable);
  document.getElementById('adminCategoryFilter').addEventListener('change', renderTable);

  // ========================
  // Add Product Button
  // ========================
  document.getElementById('addProductBtn').addEventListener('click', () => {
    resetForm();
    document.getElementById('modalTitle').textContent = 'إضافة منتج جديد';
    document.getElementById('modalSubtitle').textContent = 'أدخل بيانات المنتج';
    document.getElementById('submitBtnText').textContent = 'إضافة المنتج';
    openModal('productModal');
  });

  // ========================
  // Product Form Submit
  // ========================
  document.getElementById('productForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const index = parseInt(document.getElementById('editIndex').value);
    const product = {
      name: document.getElementById('prodName').value.trim(),
      desc: document.getElementById('prodDesc').value.trim(),
      category: document.getElementById('prodCategory').value,
      price: parseInt(document.getElementById('prodPrice').value),
      badge: document.getElementById('prodBadge').value.trim(),
      image: document.getElementById('prodImage').value.trim()
    };

    if (index === -1) {
      products.push(product);
      showAdminToast('تمت الإضافة!', `تم إضافة "${product.name}" بنجاح.`);
    } else {
      products[index] = product;
      showAdminToast('تم التعديل!', `تم تعديل "${product.name}" بنجاح.`);
    }

    await saveDbProducts(products);
    renderTable();
    updateStats();
    closeModal('productModal');
    resetForm();
  });

  // ========================
  // Close Modals
  // ========================
  document.getElementById('closeProductModal').addEventListener('click', () => closeModal('productModal'));
  document.getElementById('cancelProductBtn').addEventListener('click', () => closeModal('productModal'));
  document.getElementById('cancelDeleteBtn').addEventListener('click', () => closeModal('deleteModal'));

  document.getElementById('productModal').addEventListener('click', (e) => {
    if (e.target.id === 'productModal') closeModal('productModal');
  });
  document.getElementById('deleteModal').addEventListener('click', (e) => {
    if (e.target.id === 'deleteModal') closeModal('deleteModal');
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal('productModal');
      closeModal('deleteModal');
    }
  });

  // ========================
  // Confirm Delete
  // ========================
  document.getElementById('confirmDeleteBtn').addEventListener('click', async () => {
    if (deleteIndex >= 0 && deleteIndex < products.length) {
      const name = products[deleteIndex].name;
      products.splice(deleteIndex, 1);
      await saveDbProducts(products);
      renderTable();
      updateStats();
      closeModal('deleteModal');
      showAdminToast('تم الحذف!', `تم حذف "${name}" بنجاح.`);
    }
  });
});

// ========================
// Render Table
// ========================
function renderTable() {
  const searchTerm = document.getElementById('adminSearch').value.toLowerCase().trim();
  const categoryFilter = document.getElementById('adminCategoryFilter').value;
  const tbody = document.getElementById('productsTableBody');
  const tableEmpty = document.getElementById('tableEmpty');

  const filtered = products.filter((p, i) => {
    const matchSearch = !searchTerm || p.name.toLowerCase().includes(searchTerm) || p.desc.includes(searchTerm);
    const matchCategory = categoryFilter === 'all' || p.category === categoryFilter;
    return matchSearch && matchCategory;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = '';
    tableEmpty.style.display = 'flex';
    return;
  }

  tableEmpty.style.display = 'none';

  tbody.innerHTML = filtered.map((p) => {
    const realIndex = products.indexOf(p);
    const catLabel = CATEGORY_LABELS[p.category] || p.category;
    const badgeHtml = p.badge
      ? `<span class="table-badge">${p.badge}</span>`
      : `<span class="table-badge empty">—</span>`;

    return `
      <tr>
        <td class="font-en" style="color: var(--neutral-600); font-weight: 500;">${realIndex + 1}</td>
        <td class="table-product-name font-en">${p.name}</td>
        <td class="table-desc">${p.desc}</td>
        <td><span class="table-category cat-${p.category}">${catLabel}</span></td>
        <td class="table-price font-en">${p.price} EGP</td>
        <td>${badgeHtml}</td>
        <td>
          <div class="table-actions">
            <button class="action-btn" onclick="editProduct(${realIndex})" title="تعديل">
              <i class="ph ph-pencil-simple"></i>
            </button>
            <button class="action-btn delete" onclick="confirmDelete(${realIndex})" title="حذف">
              <i class="ph ph-trash-simple"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

// ========================
// Edit Product
// ========================
function editProduct(index) {
  const p = products[index];
  document.getElementById('editIndex').value = index;
  document.getElementById('prodName').value = p.name;
  document.getElementById('prodDesc').value = p.desc;
  document.getElementById('prodCategory').value = p.category;
  document.getElementById('prodPrice').value = p.price;
  document.getElementById('prodBadge').value = p.badge || '';
  document.getElementById('prodImage').value = p.image || '';

  document.getElementById('modalTitle').textContent = 'تعديل المنتج';
  document.getElementById('modalSubtitle').textContent = `تعديل بيانات "${p.name}"`;
  document.getElementById('submitBtnText').textContent = 'حفظ التعديلات';

  openModal('productModal');
}

// ========================
// Delete Product
// ========================
function confirmDelete(index) {
  deleteIndex = index;
  document.getElementById('deleteProductName').textContent = products[index].name;
  openModal('deleteModal');
}

// ========================
// Stats
// ========================
function updateStats() {
  document.getElementById('statTotal').textContent = products.length;
  const categories = new Set(products.map(p => p.category));
  document.getElementById('statCategories').textContent = categories.size;
  const badged = products.filter(p => p.badge && p.badge.trim() !== '').length;
  document.getElementById('statBadged').textContent = badged;
}

// ========================
// Helpers
// ========================
function openModal(id) {
  document.getElementById(id).classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal(id) {
  document.getElementById(id).classList.remove('active');
  document.body.style.overflow = '';
}

function resetForm() {
  document.getElementById('productForm').reset();
  document.getElementById('editIndex').value = -1;
}

function showAdminToast(title, msg) {
  document.getElementById('toastTitle').textContent = title;
  document.getElementById('toastMsg').textContent = msg;
  const toast = document.getElementById('adminToast');
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// ========================
// Complaints Management
// ========================
function renderComplaints() {
  const list = document.getElementById('complaintsList');
  const empty = document.getElementById('complaintsEmpty');
  const count = document.getElementById('complaintsCount');

  count.textContent = complaints.length;

  if (complaints.length === 0) {
    list.innerHTML = '';
    empty.style.display = 'flex';
    return;
  }

  empty.style.display = 'none';

  list.innerHTML = complaints.map((c, i) => `
    <div class="complaint-card ${c.read ? '' : 'unread'}">
      <div class="complaint-card-icon">
        <i class="ph ph-megaphone"></i>
      </div>
      <div class="complaint-card-body">
        <span class="complaint-card-type">${c.type || 'رسالة'}</span>
        <p class="complaint-card-desc">${c.desc || c.message}</p>
        <span class="complaint-card-date"><i class="ph ph-clock"></i> ${c.date}</span>
      </div>
      <div class="complaint-card-actions">
        ${!c.read ? `<button class="action-btn" onclick="markRead(${i})" title="تم الاطلاع"><i class="ph ph-check"></i></button>` : ''}
        <button class="action-btn delete" onclick="deleteComplaint(${i})" title="حذف"><i class="ph ph-trash-simple"></i></button>
      </div>
    </div>
  `).join('');
}

async function markRead(index) {
  complaints[index].read = true;
  await saveDbComplaints(complaints);
  renderComplaints();
}

async function deleteComplaint(index) {
  complaints.splice(index, 1);
  await saveDbComplaints(complaints);
  renderComplaints();
  showAdminToast('تم الحذف!', 'تم حذف الشكوى بنجاح.');
}

// Clear all complaints button
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('clearAllComplaints').addEventListener('click', async () => {
    complaints = [];
    await saveDbComplaints(complaints);
    renderComplaints();
    showAdminToast('تم الحذف!', 'تم حذف جميع الشكاوى.');
  });
});
