// ========================
// Default Products Data
// ========================
const DEFAULT_PRODUCTS = [
  { name: 'Panadol Extra', desc: 'بانادول إكسترا - مسكن للآلام وخافض للحرارة', category: 'pain', price: 25, badge: 'الأكثر مبيعاً' },
  { name: 'Brufen 400mg', desc: 'بروفين 400 مجم - مضاد للالتهابات ومسكن قوي', category: 'pain', price: 30, badge: '' },
  { name: 'Cataflam 50mg', desc: 'كتافلام - مسكن سريع المفعول للآلام الحادة', category: 'pain', price: 45, badge: '' },
  { name: 'Antinal 200mg', desc: 'أنتينال - مطهر معوي لعلاج الإسهال والتقلصات', category: 'stomach', price: 35, badge: '' },
  { name: 'Nexium 40mg', desc: 'نيكسيوم - لعلاج حموضة المعدة وارتجاع المريء', category: 'stomach', price: 120, badge: '' },
  { name: 'Motilium 10mg', desc: 'موتيليوم - لعلاج الغثيان والقيء وعسر الهضم', category: 'stomach', price: 40, badge: '' },
  { name: 'Vitamin C 1000mg', desc: 'فيتامين سي - لتعزيز المناعة ومقاومة نزلات البرد', category: 'vitamins', price: 60, badge: 'متوفر' },
  { name: 'Centrum Silver', desc: 'سنتروم سيلفر - فيتامينات متعددة للبالغين فوق 50', category: 'vitamins', price: 350, badge: '' },
  { name: 'Omega-3 Fish Oil', desc: 'أوميجا 3 - لصحة القلب والأوعية الدموية والمفاصل', category: 'vitamins', price: 180, badge: '' },
  { name: 'CeraVe Moisturizer', desc: 'سيرافي - مرطب يومي للبشرة الجافة والحساسة', category: 'skincare', price: 450, badge: '' },
  { name: 'La Roche-Posay SPF50', desc: 'لاروش بوزيه - واقي شمس بعامل حماية عالي', category: 'skincare', price: 520, badge: '' },
  { name: 'Bioderma Sensibio', desc: 'بيوديرما - ماء ميسيلار لتنظيف البشرة الحساسة', category: 'skincare', price: 380, badge: '' },
  { name: 'Augmentin 1g', desc: 'أوجمنتين - مضاد حيوي واسع المجال للعدوى البكتيرية', category: 'antibiotics', price: 95, badge: '' },
  { name: 'Flagyl 500mg', desc: 'فلاجيل - مضاد للبكتيريا والطفيليات والعدوى اللاهوائية', category: 'antibiotics', price: 28, badge: '' },
  { name: 'Zithromax 500mg', desc: 'زيثروماكس - مضاد حيوي لعلاج التهابات الجهاز التنفسي', category: 'antibiotics', price: 75, badge: '' },
  { name: 'Telfast 180mg', desc: 'تلفاست - لعلاج أعراض الحساسية والعطس والرشح', category: 'allergy', price: 55, badge: '' },
  { name: 'Zyrtec 10mg', desc: 'زيرتك - مضاد للحساسية سريع المفعول بدون نعاس', category: 'allergy', price: 65, badge: '' },
  { name: 'Avamys Nasal Spray', desc: 'أفاميس - بخاخ أنف لعلاج التهاب الأنف التحسسي', category: 'allergy', price: 110, badge: '' },
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
// Load / Save Products
// ========================
function getProducts() {
  const stored = localStorage.getItem('pharmacy_products');
  if (!stored) {
    localStorage.setItem('pharmacy_products', JSON.stringify(DEFAULT_PRODUCTS));
    return [...DEFAULT_PRODUCTS];
  }
  return JSON.parse(stored);
}

function saveProducts(products) {
  localStorage.setItem('pharmacy_products', JSON.stringify(products));
}

// ========================
// DOM Ready
// ========================
let products = getProducts();
let deleteIndex = -1;

document.addEventListener('DOMContentLoaded', () => {
  renderTable();
  updateStats();

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
  document.getElementById('productForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const index = parseInt(document.getElementById('editIndex').value);
    const product = {
      name: document.getElementById('prodName').value.trim(),
      desc: document.getElementById('prodDesc').value.trim(),
      category: document.getElementById('prodCategory').value,
      price: parseInt(document.getElementById('prodPrice').value),
      badge: document.getElementById('prodBadge').value.trim()
    };

    if (index === -1) {
      products.push(product);
      showAdminToast('تمت الإضافة!', `تم إضافة "${product.name}" بنجاح.`);
    } else {
      products[index] = product;
      showAdminToast('تم التعديل!', `تم تعديل "${product.name}" بنجاح.`);
    }

    saveProducts(products);
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
  document.getElementById('confirmDeleteBtn').addEventListener('click', () => {
    if (deleteIndex >= 0 && deleteIndex < products.length) {
      const name = products[deleteIndex].name;
      products.splice(deleteIndex, 1);
      saveProducts(products);
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
