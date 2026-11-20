const WHATSAPP_NUMBER = "962790479489";

const COLORING_EXTRA_PRICE = 0.50;

const products = [

    { id: 1, name: "فازة يد ممسكة بالزهور", price: 1.00, image: "images/p1.jpeg" },

    { id: 2, name: "مجسم وجه بنت للزراعة (إكليل ورود)", price: 1.00, image: "images/p2.jpeg" },

    { id: 3, name: "مجسم وجه بنت للزراعة (زوج 1)", price: 1.00, image: "images/p3.jpeg" },

    { id: 4, name: "مجسم وجه بنت للزراعة (زوج 2)", price: 1.00, image: "images/p4.jpeg" },

    { id: 5, name: "وعاء دائري بتصميم فقاعات", price: 1.00, image: "images/p5.jpeg" },

    { id: 6, name: "وعاء صدفة بحرية (زوج)", price: 1.00, image: "images/p6.jpeg" },

    { id: 7, name: "صحن يد – Hand Bowl", price: 1.00, image: "images/p7.jpeg" },

    { id: 8, name: "مجسمات وضعيات التأمل (3 قطع)", price: 1.00, image: "images/p8.jpeg" }

];

let cart = [];

const productsContainer = document.getElementById("products-container");

const cartBtn = document.getElementById("cart-btn");

const closeCartBtn = document.getElementById("close-cart");

const cartSidebar = document.getElementById("cart-sidebar");

const cartItemsContainer = document.getElementById("cart-items");

const cartCountEl = document.getElementById("cart-count");

const cartTotalEl = document.getElementById("cart-total");

const whatsappBtn = document.getElementById("whatsapp-order-btn");

function renderProducts() {

    productsContainer.innerHTML = products.map(product => `
<div class="product-card">
<img src="${product.image}" alt="${product.name}" onerror="this.src='https://placehold.co/400x300/1a1a1a/d4af37?text=NUVE+DECOR'">
<div>
<h3 class="product-title">${product.name}</h3>
<p class="product-price" id="price-preview-${product.id}">السعر الأساسي: ${product.price.toFixed(2)} دينار</p>
<div class="options-group">
<label>اللون:</label>
<select id="color-${product.id}">
<option value="أبيض">أبيض</option>
<option value="أسود">أسود</option>
<option value="ذهبي">ذهبي</option>
<option value="فضي">فضي</option>
</select>
</div>
<div class="options-group">
<label>التلوين حسب الطلب (+0.50 دينار للقطعة):</label>
<select id="coloring-${product.id}" onchange="updatePricePreview(${product.id}, ${product.price})">
<option value="بدون تلوين">بدون تلوين</option>
<option value="مع تلوين (+0.50 دينار)">مع تلوين (+0.50 دينار)</option>
</select>
</div>
<div class="options-group">
<label>الكمية:</label>
<input type="number" id="qty-${product.id}" value="1" min="1" onchange="updatePricePreview(${product.id}, ${product.price})">
</div>
</div>
<button class="add-to-cart-btn" onclick="addToCart(${product.id})">

                إضافة إلى السلة 🛒
</button>
</div>

    `).join("");

}

function updatePricePreview(productId, basePrice) {

    const coloringVal = document.getElementById(`coloring-${productId}`).value;

    const qtyVal = Math.max(1, parseInt(document.getElementById(`qty-${productId}`).value) || 1);

    const hasColoring = coloringVal.includes("مع تلوين");

    const unitPrice = basePrice + (hasColoring ? COLORING_EXTRA_PRICE : 0);

    const totalForItem = unitPrice * qtyVal;

    document.getElementById(`price-preview-${productId}`).textContent =

        `سعر القطعة: ${unitPrice.toFixed(2)} دينار | الإجمالي: ${totalForItem.toFixed(2)} دينار`;

}

function addToCart(productId) {

    const product = products.find(p => p.id === productId);

    const color = document.getElementById(`color-${productId}`).value;

    const coloring = document.getElementById(`coloring-${productId}`).value;

    const qty = Math.max(1, parseInt(document.getElementById(`qty-${productId}`).value) || 1);

    const hasColoring = coloring.includes("مع تلوين");

    const unitPrice = product.price + (hasColoring ? COLORING_EXTRA_PRICE : 0);

    cart.push({

        id: product.id,

        name: product.name,

        color: color,

        coloring: coloring,

        qty: qty,

        unitPrice: unitPrice,

        subtotal: unitPrice * qty

    });

    updateCartUI();

    cartSidebar.classList.add("open");

}

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCartUI();

}

function updateCartUI() {

    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);

    const totalPrice = cart.reduce((sum, item) => sum + item.subtotal, 0);

    cartCountEl.textContent = totalQty;

    cartTotalEl.textContent = `${totalPrice.toFixed(2)} دينار`;

    if (cart.length === 0) {

        cartItemsContainer.innerHTML = `<p class="empty-msg">السلة فارغة حالياً</p>`;

        return;

    }

    cartItemsContainer.innerHTML = cart.map((item, index) => `
<div class="cart-item">
<div class="cart-item-info">
<h4>${item.name} (${item.qty})</h4>
<p>اللون: ${item.color} | ${item.coloring}</p>
<p><strong>${item.subtotal.toFixed(2)} دينار</strong></p>
</div>
<button class="remove-btn" onclick="removeFromCart(${index})">حذف</button>
</div>

    `).join("");

}

whatsappBtn.addEventListener("click", () => {

    if (cart.length === 0) {

        alert("السلة فارغة! أضف منتجاً أولاً.");

        return;

    }

    let message = "مرحباً NUVE DECOR، أود طلب المنتجات التالية:\n\n";

    cart.forEach((item, i) => {

        message += `${i + 1}. *${item.name}*\n`;

        message += `   - اللون: ${item.color}\n`;

        message += `   - التلوين: ${item.coloring}\n`;

        message += `   - الكمية: ${item.qty}\n`;

        message += `   - السعر: ${item.subtotal.toFixed(2)} دينار\n\n`;

    });

    const totalPrice = cart.reduce((sum, item) => sum + item.subtotal, 0);

    message += `*المجموع الكلي: ${totalPrice.toFixed(2)} دينار*`;

    const encodedMessage = encodeURIComponent(message);

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    window.open(url, "_blank");

});

cartBtn.addEventListener("click", () => cartSidebar.classList.add("open"));

closeCartBtn.addEventListener("click", () => cartSidebar.classList.remove("open"));

renderProducts();

updateCartUI();
 