/* Données de secours si catalogue-data.js n'est pas chargé. */
const fallbackCategories = [
  { id: "chaussures", label: "Chaussures", icon: "👟", accent: "#9f2f2b" },
  { id: "football", label: "Maillots & foot", icon: "⚽", accent: "#3d7659" },
  { id: "gaming", label: "Gaming", icon: "🎮", accent: "#5967a8" },
  { id: "mangas", label: "Mangas & livres", icon: "📚", accent: "#a2483d" },
  { id: "cartes", label: "Cartes", icon: "🃏", accent: "#8b6e26" },
  { id: "meubles", label: "Meubles", icon: "🪑", accent: "#7a4e2f" },
  { id: "vetements", label: "Vêtements", icon: "🧥", accent: "#345c74" },
  { id: "curiosites", label: "Curiosités", icon: "🧭", accent: "#7b5b32" },
];

const fallbackProducts = [
  {
    id: "maillot-majorque-2018",
    name: "Maillot de Majorque 2018",
    category: "football",
    icon: "👕",
    price: 27,
    marketPrice: 30,
    condition: "Très bon état",
    detail: "Taille L",
    shipping: "Dès CHF 5.– ou retrait à Orbe",
    stock: 1,
    description: "Maillot utilisé avec soin. Aucun trou ni tache visible. Les détails exacts seront complétés avec les vraies photos.",
  },
  {
    id: "crampons-adidas-x",
    name: "Chaussures de football X",
    category: "chaussures",
    icon: "👟",
    price: 85,
    marketPrice: 130,
    condition: "Bon état",
    detail: "Pointure 42",
    shipping: "Envoi postal ou retrait à Orbe",
    stock: 1,
    description: "Crampons utilisés mais non abîmés. Semelles et état précis à montrer sur les photos de la fiche finale.",
  },
  {
    id: "console-retro",
    name: "Console rétro avec manettes",
    category: "gaming",
    icon: "🎮",
    price: 60,
    condition: "Bon état",
    detail: "Testée et fonctionnelle",
    shipping: "Envoi postal partout en Suisse",
    stock: 1,
    description: "Console testée avec deux manettes. Les câbles et accessoires inclus seront listés précisément.",
  },
  {
    id: "manga-aventure-tome-1",
    name: "Manga d’aventure — Tome 1",
    category: "mangas",
    icon: "📕",
    price: 8,
    condition: "Très bon état",
    detail: "Édition française",
    shipping: "Dès CHF 2.– ou retrait à Orbe",
    stock: 3,
    description: "Livre en français, pages complètes et couverture propre. Exemple temporaire en attendant le vrai catalogue.",
  },
  {
    id: "armoire-vintage",
    name: "Armoire vintage en bois",
    category: "meubles",
    icon: "🗄️",
    price: 120,
    condition: "Bon état",
    detail: "Dimensions à confirmer",
    shipping: "Retrait à Orbe ou livraison locale",
    stock: 1,
    description: "Armoire en bois avec traces normales d’utilisation. Retrait à Orbe ou livraison à environ 30 minutes maximum.",
  },
  {
    id: "clavier-mecanique",
    name: "Clavier mécanique",
    category: "gaming",
    icon: "⌨️",
    price: 45,
    condition: "Comme neuf",
    detail: "Disposition suisse",
    shipping: "Envoi postal partout en Suisse",
    stock: 1,
    description: "Clavier peu utilisé, testé et fonctionnel. Modèle, connectique et accessoires à compléter.",
  },
  {
    id: "veste-sport",
    name: "Veste de sport",
    category: "vetements",
    icon: "🧥",
    price: 25,
    condition: "Très bon état",
    detail: "Taille M",
    shipping: "Dès CHF 5.– ou retrait à Orbe",
    stock: 1,
    description: "Veste portée quelques fois, propre et sans défaut important. Matière et mesures à compléter.",
  },
  {
    id: "boussole-decoration",
    name: "Boussole décorative",
    category: "curiosites",
    icon: "🧭",
    price: 18,
    condition: "Bon état",
    detail: "Objet décoratif",
    shipping: "Envoi postal partout en Suisse",
    stock: 1,
    description: "Petite boussole décorative. Dimensions, matière et marques d’usage seront précisées avec les photos.",
  },
];

const { categories = fallbackCategories, products = fallbackProducts } = window.BazarCatalogue || {};

const STORAGE_KEY = "bazar-des-mugis-demo-v1";
const defaultState = { cart: {}, favorites: [], orders: [] };
let state = loadState();
let activeCategory = "all";
let searchQuery = "";
let favoritesOnly = false;
let toastTimer;

const els = {
  categoryGrid: document.querySelector("#categoryGrid"),
  productGrid: document.querySelector("#productGrid"),
  emptyState: document.querySelector("#emptyState"),
  activeFilter: document.querySelector("#activeFilter"),
  sortProducts: document.querySelector("#sortProducts"),
  cartButton: document.querySelector("#cartButton"),
  closeCart: document.querySelector("#closeCart"),
  cartDrawer: document.querySelector("#cartDrawer"),
  drawerBackdrop: document.querySelector("#drawerBackdrop"),
  cartItems: document.querySelector("#cartItems"),
  cartTotal: document.querySelector("#cartTotal"),
  cartCount: document.querySelector("#cartCount"),
  favoriteCount: document.querySelector("#favoriteCount"),
  favoritesButton: document.querySelector("#favoritesButton"),
  checkoutButton: document.querySelector("#checkoutButton"),
  checkoutDialog: document.querySelector("#checkoutDialog"),
  checkoutForm: document.querySelector("#checkoutForm"),
  productDialog: document.querySelector("#productDialog"),
  productDialogContent: document.querySelector("#productDialogContent"),
  searchPanel: document.querySelector("#searchPanel"),
  searchButton: document.querySelector("#searchButton"),
  searchForm: document.querySelector("#searchForm"),
  siteSearch: document.querySelector("#siteSearch"),
  mobileMenuButton: document.querySelector("#mobileMenuButton"),
  mainNav: document.querySelector("#mainNav"),
  demoPanel: document.querySelector("#demoPanel"),
  demoOrderLabel: document.querySelector("#demoOrderLabel"),
  confirmOrder: document.querySelector("#confirmOrder"),
  simulatePayment: document.querySelector("#simulatePayment"),
  resetDemo: document.querySelector("#resetDemo"),
  toast: document.querySelector("#toast"),
};

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return saved && typeof saved === "object" ? { ...defaultState, ...saved } : structuredClone(defaultState);
  } catch {
    return structuredClone(defaultState);
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function money(value) {
  return `CHF ${Number(value).toFixed(2)}`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function committedQuantity(productId) {
  return state.orders
    .filter((order) => ["pending", "reserved", "paid"].includes(order.status))
    .reduce((sum, order) => sum + (order.items[productId] || 0), 0);
}

function availableQuantity(product) {
  return Math.max(0, product.stock - committedQuantity(product.id));
}

function productStatus(product) {
  const related = state.orders.filter((order) => order.items[product.id]);
  const available = availableQuantity(product);
  if (available > 0) return { label: `${available} disponible${available > 1 ? "s" : ""}`, className: "" };
  if (related.some((order) => order.status === "pending")) return { label: "Réservation en attente", className: "pending" };
  if (related.some((order) => order.status === "reserved")) return { label: "Réservé", className: "reserved" };
  return { label: product.stock === 1 ? "Vendu" : "Rupture de stock", className: "sold" };
}

function renderCategories() {
  els.categoryGrid.innerHTML = categories
    .map((category) => {
      const content = `
        <span class="category-illustration" aria-hidden="true">${category.icon}</span>
        <strong>${category.label}</strong>
        <span aria-hidden="true">→</span>`;
      return category.href
        ? `<a class="category-card" href="${category.href}" style="--accent:${category.accent}">${content}</a>`
        : `<button class="category-card" type="button" data-category="${category.id}" style="--accent:${category.accent}">${content}</button>`;
    })
    .join("");
}

function filteredProducts() {
  let result = favoritesOnly || searchQuery || activeCategory !== "all" ? [...products] : products.filter((product) => product.featured !== false);
  if (activeCategory !== "all") result = result.filter((product) => product.category === activeCategory);
  if (favoritesOnly) result = result.filter((product) => state.favorites.includes(product.id));
  if (searchQuery) {
    const query = searchQuery.toLocaleLowerCase("fr");
    result = result.filter((product) => `${product.name} ${product.category} ${product.condition} ${product.detail}`.toLocaleLowerCase("fr").includes(query));
  }
  if (els.sortProducts.value === "price-asc") result.sort((a, b) => a.price - b.price);
  if (els.sortProducts.value === "price-desc") result.sort((a, b) => b.price - a.price);
  return result;
}

function renderProducts() {
  const visibleProducts = filteredProducts();
  els.emptyState.hidden = visibleProducts.length !== 0;
  els.productGrid.innerHTML = visibleProducts
    .map((product) => {
      const status = productStatus(product);
      const isFavorite = state.favorites.includes(product.id);
      return `
        <article class="product-card">
          <button class="favorite-button ${isFavorite ? "is-favorite" : ""}" type="button" data-favorite="${product.id}" aria-label="${isFavorite ? "Retirer" : "Ajouter"} ${escapeHtml(product.name)} ${isFavorite ? "des" : "aux"} favoris">${isFavorite ? "♥" : "♡"}</button>
          <span class="status-badge ${status.className}">${status.label}</span>
          <a class="product-visual" href="product.html?id=${encodeURIComponent(product.id)}" aria-label="Voir ${escapeHtml(product.name)}">
            <span aria-hidden="true">${product.icon}</span>
          </a>
          <div class="product-body">
            <h3><a class="product-title-link" href="product.html?id=${encodeURIComponent(product.id)}">${escapeHtml(product.name)}</a></h3>
            <p class="product-meta">${escapeHtml(product.detail)} · ${escapeHtml(product.condition)}</p>
            <div class="product-price-row">
              <div class="product-price">
                ${product.marketPrice ? `<span class="market-price">${money(product.marketPrice)}</span>` : ""}
                <strong>${money(product.price)}</strong>
                <small class="shipping-price">+ CHF ${Number(product.shippingFee ?? 5).toFixed(2)} de livraison</small>
              </div>
              <button class="add-button" type="button" data-add="${product.id}" ${availableQuantity(product) === 0 ? "disabled" : ""} aria-label="Ajouter ${escapeHtml(product.name)} au panier">＋</button>
            </div>
            <p class="product-shipping">${escapeHtml(product.shipping)}</p>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderActiveFilter() {
  const category = categories.find((item) => item.id === activeCategory);
  const parts = [];
  if (category) parts.push(`Marché : ${category.label}`);
  if (searchQuery) parts.push(`Recherche : « ${searchQuery} »`);
  if (favoritesOnly) parts.push("Mes favoris");
  els.activeFilter.hidden = parts.length === 0;
  els.activeFilter.querySelector("span").textContent = parts.join(" · ");
}

function renderCart() {
  const lines = Object.entries(state.cart)
    .map(([id, quantity]) => ({ product: products.find((product) => product.id === id), quantity }))
    .filter((line) => line.product && line.quantity > 0);
  const count = lines.reduce((sum, line) => sum + line.quantity, 0);
  const subtotal = lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0);
  const total = subtotal + (lines.length ? 5 : 0);
  els.cartCount.textContent = count;
  els.cartCount.hidden = count === 0;
  els.cartTotal.textContent = money(total);
  els.checkoutButton.disabled = count === 0;
  els.cartItems.innerHTML = lines.length
    ? lines
        .map(
          ({ product, quantity }) => `
            <div class="cart-line">
              <span class="cart-line-icon" aria-hidden="true">${product.icon}</span>
              <span><strong>${escapeHtml(product.name)}</strong><small>${quantity} × ${money(product.price)}</small></span>
              <button class="remove-line" type="button" data-remove="${product.id}" aria-label="Retirer ${escapeHtml(product.name)}">×</button>
            </div>
          `,
        )
        .join("")
    : `<div class="cart-empty"><p><strong>Ton panier est vide.</strong><br />Pars à la recherche d’un trésor !</p></div>`;
}

function renderFavorites() {
  els.favoriteCount.textContent = state.favorites.length;
  els.favoriteCount.hidden = state.favorites.length === 0;
}

function latestOrder() {
  return state.orders.at(-1);
}

function renderDemoPanel() {
  const order = latestOrder();
  els.demoPanel.hidden = !order;
  if (!order) return;
  const label = order.status === "pending" ? "Demande reçue — en attente de confirmation" : order.status === "reserved" ? "Disponibilité confirmée — paiement en attente" : "Paiement confirmé — commande à préparer";
  els.demoOrderLabel.textContent = `${order.reference} · ${label}`;
  els.confirmOrder.disabled = order.status !== "pending";
  els.simulatePayment.disabled = order.status !== "reserved";
}

function renderAll() {
  renderActiveFilter();
  renderProducts();
  renderCart();
  renderFavorites();
  renderDemoPanel();
}

function showToast(message) {
  clearTimeout(toastTimer);
  els.toast.textContent = message;
  els.toast.hidden = false;
  requestAnimationFrame(() => els.toast.classList.add("show"));
  toastTimer = setTimeout(() => {
    els.toast.classList.remove("show");
    setTimeout(() => (els.toast.hidden = true), 180);
  }, 2800);
}

function openCart() {
  els.drawerBackdrop.hidden = false;
  els.cartDrawer.classList.add("is-open");
  els.cartDrawer.setAttribute("aria-hidden", "false");
  document.body.classList.add("drawer-open");
  els.closeCart.focus();
}

function closeCart() {
  els.cartDrawer.classList.remove("is-open");
  els.cartDrawer.setAttribute("aria-hidden", "true");
  els.drawerBackdrop.hidden = true;
  document.body.classList.remove("drawer-open");
}

function addToCart(id) {
  const product = products.find((item) => item.id === id);
  if (!product) return;
  const current = state.cart[id] || 0;
  if (current >= availableQuantity(product)) {
    showToast("Il n’y a plus assez d’exemplaires disponibles.");
    return;
  }
  state.cart[id] = current + 1;
  saveState();
  renderCart();
  showToast(`${product.name} ajouté au panier.`);
}

function toggleFavorite(id) {
  state.favorites = state.favorites.includes(id) ? state.favorites.filter((favorite) => favorite !== id) : [...state.favorites, id];
  saveState();
  renderAll();
}

function showProduct(id) {
  const product = products.find((item) => item.id === id);
  if (!product) return;
  const status = productStatus(product);
  els.productDialogContent.innerHTML = `
    <div class="product-dialog-layout">
      <div class="product-dialog-visual" aria-hidden="true">${product.icon}</div>
      <div class="product-dialog-copy">
        <p class="eyebrow">${categories.find((category) => category.id === product.category)?.label || "Trouvaille"}</p>
        <h2>${escapeHtml(product.name)}</h2>
        <p>${escapeHtml(product.description)}</p>
        <ul class="detail-list">
          <li><span>État</span><strong>${escapeHtml(product.condition)}</strong></li>
          <li><span>Détail</span><strong>${escapeHtml(product.detail)}</strong></li>
          <li><span>Réception</span><strong>${escapeHtml(product.shipping)}</strong></li>
          <li><span>Disponibilité</span><strong>${status.label}</strong></li>
        </ul>
        <p class="dialog-price">${money(product.price)}</p>
        <button class="button button-full" type="button" data-dialog-add="${product.id}" ${availableQuantity(product) === 0 ? "disabled" : ""}>Ajouter au panier</button>
      </div>
    </div>`;
  els.productDialog.showModal();
}

els.categoryGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  activeCategory = button.dataset.category;
  searchQuery = "";
  favoritesOnly = false;
  renderAll();
  document.querySelector("#trouvailles").scrollIntoView({ behavior: "smooth" });
});

els.productGrid.addEventListener("click", (event) => {
  const favorite = event.target.closest("[data-favorite]");
  const add = event.target.closest("[data-add]");
  const details = event.target.closest("[data-details]");
  if (favorite) toggleFavorite(favorite.dataset.favorite);
  if (add) addToCart(add.dataset.add);
  if (details) showProduct(details.dataset.details);
});

els.productGrid.addEventListener("keydown", (event) => {
  if ((event.key === "Enter" || event.key === " ") && event.target.matches("[data-details]")) {
    event.preventDefault();
    showProduct(event.target.dataset.details);
  }
});

els.productDialog.addEventListener("click", (event) => {
  const add = event.target.closest("[data-dialog-add]");
  if (add) {
    addToCart(add.dataset.dialogAdd);
    els.productDialog.close();
  }
});

document.querySelectorAll("[data-close-dialog]").forEach((button) => {
  button.addEventListener("click", () => button.closest("dialog").close());
});

els.cartItems.addEventListener("click", (event) => {
  const button = event.target.closest("[data-remove]");
  if (!button) return;
  delete state.cart[button.dataset.remove];
  saveState();
  renderCart();
});

els.cartButton.addEventListener("click", openCart);
els.closeCart.addEventListener("click", closeCart);
els.drawerBackdrop.addEventListener("click", closeCart);

els.checkoutButton.addEventListener("click", () => {
  closeCart();
  els.checkoutDialog.showModal();
});

els.checkoutForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const reference = `MUG-${new Date().getFullYear()}-${String(state.orders.length + 1).padStart(3, "0")}`;
  state.orders.push({
    reference,
    status: "pending",
    createdAt: new Date().toISOString(),
    customer: Object.fromEntries(formData.entries()),
    items: { ...state.cart },
  });
  state.cart = {};
  saveState();
  event.currentTarget.reset();
  els.checkoutDialog.close();
  renderAll();
  showToast(`Demande ${reference} enregistrée. E-mail simulé.`);
});

els.confirmOrder.addEventListener("click", () => {
  const order = latestOrder();
  if (!order || order.status !== "pending") return;
  order.status = "reserved";
  saveState();
  renderAll();
  showToast("Disponibilité confirmée. Lien de paiement simulé envoyé.");
});

els.simulatePayment.addEventListener("click", () => {
  const order = latestOrder();
  if (!order || order.status !== "reserved") return;
  order.status = "paid";
  saveState();
  renderAll();
  showToast("Paiement simulé confirmé. La commande peut être préparée.");
});

els.resetDemo.addEventListener("click", () => {
  if (!window.confirm("Réinitialiser le panier, les favoris et les commandes de démonstration ?")) return;
  state = structuredClone(defaultState);
  saveState();
  activeCategory = "all";
  searchQuery = "";
  favoritesOnly = false;
  renderAll();
  showToast("La démonstration a été réinitialisée.");
});

els.searchButton.addEventListener("click", () => {
  const willOpen = els.searchPanel.hidden;
  els.searchPanel.hidden = !willOpen;
  els.searchButton.setAttribute("aria-expanded", String(willOpen));
  if (willOpen) els.siteSearch.focus();
});

els.searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  searchQuery = els.siteSearch.value.trim();
  activeCategory = "all";
  favoritesOnly = false;
  renderAll();
  document.querySelector("#trouvailles").scrollIntoView({ behavior: "smooth" });
});

els.favoritesButton.addEventListener("click", () => {
  favoritesOnly = !favoritesOnly;
  activeCategory = "all";
  searchQuery = "";
  renderAll();
  document.querySelector("#trouvailles").scrollIntoView({ behavior: "smooth" });
});

els.activeFilter.querySelector("button").addEventListener("click", () => {
  activeCategory = "all";
  searchQuery = "";
  favoritesOnly = false;
  els.siteSearch.value = "";
  renderAll();
});

els.sortProducts.addEventListener("change", renderProducts);

els.mobileMenuButton.addEventListener("click", () => {
  const open = els.mainNav.classList.toggle("is-open");
  els.mobileMenuButton.setAttribute("aria-expanded", String(open));
});

els.mainNav.addEventListener("click", () => {
  els.mainNav.classList.remove("is-open");
  els.mobileMenuButton.setAttribute("aria-expanded", "false");
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && els.cartDrawer.classList.contains("is-open")) closeCart();
});

document.querySelector("#currentYear").textContent = new Date().getFullYear();
renderCategories();
renderAll();
