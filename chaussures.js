const { products } = window.BazarCatalogue;
const shoeProducts = products.filter((product) => product.category === "chaussures");
const STORAGE_KEY = "bazar-des-mugis-demo-v1";
const defaultState = { cart: {}, favorites: [], orders: [] };
let state = loadState();
let favoritesOnly = false;
let toastTimer;

const els = {
  shoeGrid: document.querySelector("#shoeGrid"),
  shoeEmpty: document.querySelector("#shoeEmpty"),
  resultCount: document.querySelector("#resultCount"),
  shoeSearch: document.querySelector("#shoeSearch"),
  sizeFilters: document.querySelector("#sizeFilters"),
  maxPrice: document.querySelector("#maxPrice"),
  maxPriceOutput: document.querySelector("#maxPriceOutput"),
  availableOnly: document.querySelector("#availableOnly"),
  resetFilters: document.querySelector("#resetFilters"),
  sortShoes: document.querySelector("#sortShoes"),
  shoeFilters: document.querySelector("#shoeFilters"),
  filterToggle: document.querySelector("#filterToggle"),
  focusSearch: document.querySelector("#focusSearch"),
  favoritesButton: document.querySelector("#favoritesButton"),
  favoriteCount: document.querySelector("#favoriteCount"),
  cartButton: document.querySelector("#cartButton"),
  cartCount: document.querySelector("#cartCount"),
  cartDrawer: document.querySelector("#cartDrawer"),
  drawerBackdrop: document.querySelector("#drawerBackdrop"),
  closeCart: document.querySelector("#closeCart"),
  cartItems: document.querySelector("#cartItems"),
  cartTotal: document.querySelector("#cartTotal"),
  checkoutButton: document.querySelector("#checkoutButton"),
  shoeDialog: document.querySelector("#shoeDialog"),
  shoeDialogContent: document.querySelector("#shoeDialogContent"),
  closeShoeDialog: document.querySelector("#closeShoeDialog"),
  checkoutDialog: document.querySelector("#checkoutDialog"),
  closeCheckoutDialog: document.querySelector("#closeCheckoutDialog"),
  checkoutForm: document.querySelector("#checkoutForm"),
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
  return String(value ?? "")
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

function selectedValues(name) {
  return [...els.shoeFilters.querySelectorAll(`input[name="${name}"]:checked`)].map((input) => input.value);
}

function renderSizeFilters() {
  els.sizeFilters.innerHTML = Array.from({ length: 13 }, (_, index) => String(35 + index))
    .map((size) => `<label><input type="checkbox" name="size" value="${size}" /> ${size}</label>`)
    .join("");
}

function filteredShoes() {
  const query = els.shoeSearch.value.trim().toLocaleLowerCase("fr");
  const sizes = selectedValues("size");
  const types = selectedValues("type");
  const conditions = selectedValues("condition");
  const maxPrice = Number(els.maxPrice.value);
  let result = shoeProducts.filter((product) => {
    const shoe = product.shoe || {};
    const haystack = `${product.name} ${shoe.brand || ""} ${shoe.model || ""} ${shoe.type || ""}`.toLocaleLowerCase("fr");
    if (query && !haystack.includes(query)) return false;
    if (sizes.length && !sizes.includes(String(shoe.size))) return false;
    if (types.length && !types.includes(shoe.type)) return false;
    if (conditions.length && !conditions.includes(product.condition)) return false;
    if (product.price > maxPrice) return false;
    if (els.availableOnly.checked && availableQuantity(product) === 0) return false;
    if (favoritesOnly && !state.favorites.includes(product.id)) return false;
    return true;
  });

  if (els.sortShoes.value === "price-asc") result.sort((a, b) => a.price - b.price);
  if (els.sortShoes.value === "price-desc") result.sort((a, b) => b.price - a.price);
  if (els.sortShoes.value === "size-asc") result.sort((a, b) => Number(a.shoe?.size || 999) - Number(b.shoe?.size || 999));
  return result;
}

function productVisual(product) {
  if (product.image) {
    return `<a class="product-visual has-photo" href="product.html?id=${encodeURIComponent(product.id)}" aria-label="Voir ${escapeHtml(product.name)}"><img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}" /></a>`;
  }
  return `<a class="product-visual" href="product.html?id=${encodeURIComponent(product.id)}" aria-label="Voir ${escapeHtml(product.name)}"><span class="photo-placeholder"><span aria-hidden="true">${product.icon || "👟"}</span><small>Photo à venir</small></span></a>`;
}

function renderShoes() {
  const visible = filteredShoes();
  els.resultCount.textContent = visible.length;
  els.shoeEmpty.hidden = visible.length !== 0;
  els.shoeGrid.innerHTML = visible
    .map((product) => {
      const shoe = product.shoe || {};
      const status = productStatus(product);
      const favorite = state.favorites.includes(product.id);
      return `
        <article class="product-card shoe-card">
          <button class="favorite-button ${favorite ? "is-favorite" : ""}" type="button" data-favorite="${product.id}" aria-label="${favorite ? "Retirer des" : "Ajouter aux"} favoris">${favorite ? "♥" : "♡"}</button>
          <span class="status-badge ${status.className}">${status.label}</span>
          ${productVisual(product)}
          <div class="product-body">
            ${product.demo ? '<span class="demo-badge">Données de démonstration</span>' : ""}
            <h3><a class="product-title-link" href="product.html?id=${encodeURIComponent(product.id)}">${escapeHtml(product.name)}</a></h3>
            <p class="product-meta">${escapeHtml(shoe.brand)} · ${escapeHtml(product.condition)}</p>
            <div class="shoe-quick-info"><span>Pointure <strong>${escapeHtml(shoe.size)}</strong></span><span>${escapeHtml(shoe.type)}</span></div>
            <div class="product-price-row">
              <div class="product-price">${product.marketPrice ? `<span class="market-price">${money(product.marketPrice)}</span>` : ""}<strong>${money(product.price)}</strong><small class="shipping-price">+ CHF ${Number(product.shippingFee ?? 5).toFixed(2)} de livraison</small></div>
              <button class="add-button" type="button" data-add="${product.id}" ${availableQuantity(product) === 0 ? "disabled" : ""} aria-label="Ajouter au panier">＋</button>
            </div>
            <p class="product-shipping">${escapeHtml(product.shipping)}</p>
          </div>
        </article>`;
    })
    .join("");
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
    ? lines.map(({ product, quantity }) => `<div class="cart-line"><span class="cart-line-icon" aria-hidden="true">${product.icon}</span><span><strong>${escapeHtml(product.name)}</strong><small>${quantity} × ${money(product.price)}</small></span><button class="remove-line" type="button" data-remove="${product.id}" aria-label="Retirer">×</button></div>`).join("")
    : '<div class="cart-empty"><p><strong>Ton panier est vide.</strong><br />Choisis une paire pour commencer.</p></div>';
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
  const status = order.status === "pending" ? "Demande reçue" : order.status === "reserved" ? "Paiement attendu" : "Paiement confirmé";
  els.demoOrderLabel.textContent = `${order.reference} · ${status}`;
  els.confirmOrder.disabled = order.status !== "pending";
  els.simulatePayment.disabled = order.status !== "reserved";
}

function renderAll() {
  renderShoes();
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
  state.favorites = state.favorites.includes(id) ? state.favorites.filter((item) => item !== id) : [...state.favorites, id];
  saveState();
  renderAll();
}

function openShoeDetails(id) {
  const product = shoeProducts.find((item) => item.id === id);
  if (!product) return;
  const shoe = product.shoe || {};
  const status = productStatus(product);
  const image = product.image
    ? `<img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}" />`
    : `<span class="photo-placeholder"><span aria-hidden="true">${product.icon || "👟"}</span><small>Photos à ajouter</small></span>`;
  const details = [
    ["Marque", shoe.brand], ["Modèle", shoe.model], ["Pointure", shoe.size], ["Type", shoe.type],
    ["Public", shoe.audience], ["Couleur", shoe.color], ["Surface", shoe.surface], ["Matière", shoe.material],
    ["Boîte incluse", shoe.boxIncluded], ["Défauts", shoe.defects],
  ];
  els.shoeDialogContent.innerHTML = `
    <div class="product-dialog-layout">
      <div class="product-dialog-visual">${image}</div>
      <div class="product-dialog-copy">
        ${product.demo ? '<span class="demo-badge">Fiche de démonstration</span>' : ""}
        <p class="eyebrow">Marché des chaussures</p>
        <h2>${escapeHtml(product.name)}</h2>
        <p>${escapeHtml(product.description)}</p>
        <div class="shoe-detail-table">${details.map(([label, value]) => `<p><span>${label}</span><strong>${escapeHtml(value || "À compléter")}</strong></p>`).join("")}</div>
        <ul class="detail-list"><li><span>État</span><strong>${escapeHtml(product.condition)}</strong></li><li><span>Réception</span><strong>${escapeHtml(product.shipping)}</strong></li><li><span>Disponibilité</span><strong>${status.label}</strong></li></ul>
        <p class="dialog-price">${money(product.price)}</p>
        <button class="button button-full" type="button" data-dialog-add="${product.id}" ${availableQuantity(product) === 0 ? "disabled" : ""}>Ajouter au panier</button>
      </div>
    </div>`;
  els.shoeDialog.showModal();
}

function resetFilters() {
  els.shoeSearch.value = "";
  els.shoeFilters.querySelectorAll('input[type="checkbox"]').forEach((input) => (input.checked = false));
  els.maxPrice.value = "150";
  els.maxPriceOutput.textContent = "CHF 150.–";
  els.sortShoes.value = "recent";
  favoritesOnly = false;
  renderShoes();
}

els.shoeFilters.addEventListener("input", (event) => {
  if (event.target === els.maxPrice) els.maxPriceOutput.textContent = `CHF ${els.maxPrice.value}.–`;
  renderShoes();
});
els.sortShoes.addEventListener("change", renderShoes);
els.resetFilters.addEventListener("click", resetFilters);

els.filterToggle.addEventListener("click", () => {
  const open = els.shoeFilters.classList.toggle("is-open");
  els.filterToggle.setAttribute("aria-expanded", String(open));
  els.filterToggle.textContent = open ? "Masquer les filtres" : "Afficher les filtres";
});

els.focusSearch.addEventListener("click", () => {
  els.shoeSearch.focus();
  document.querySelector("#catalogueChaussures").scrollIntoView({ behavior: "smooth" });
});

els.favoritesButton.addEventListener("click", () => {
  favoritesOnly = !favoritesOnly;
  renderShoes();
  showToast(favoritesOnly ? "Affichage des chaussures favorites." : "Affichage de toutes les chaussures.");
});

els.shoeGrid.addEventListener("click", (event) => {
  const favorite = event.target.closest("[data-favorite]");
  const add = event.target.closest("[data-add]");
  const details = event.target.closest("[data-details]");
  if (favorite) toggleFavorite(favorite.dataset.favorite);
  if (add) addToCart(add.dataset.add);
  if (details) openShoeDetails(details.dataset.details);
});

els.shoeGrid.addEventListener("keydown", (event) => {
  if ((event.key === "Enter" || event.key === " ") && event.target.matches("[data-details]")) {
    event.preventDefault();
    openShoeDetails(event.target.dataset.details);
  }
});

els.shoeDialogContent.addEventListener("click", (event) => {
  const add = event.target.closest("[data-dialog-add]");
  if (!add) return;
  addToCart(add.dataset.dialogAdd);
  els.shoeDialog.close();
});

els.closeShoeDialog.addEventListener("click", () => els.shoeDialog.close());
els.cartButton.addEventListener("click", openCart);
els.closeCart.addEventListener("click", closeCart);
els.drawerBackdrop.addEventListener("click", closeCart);

els.cartItems.addEventListener("click", (event) => {
  const remove = event.target.closest("[data-remove]");
  if (!remove) return;
  delete state.cart[remove.dataset.remove];
  saveState();
  renderCart();
});

els.checkoutButton.addEventListener("click", () => {
  closeCart();
  els.checkoutDialog.showModal();
});
els.closeCheckoutDialog.addEventListener("click", () => els.checkoutDialog.close());

els.checkoutForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const reference = `MUG-${new Date().getFullYear()}-${String(state.orders.length + 1).padStart(3, "0")}`;
  state.orders.push({ reference, status: "pending", createdAt: new Date().toISOString(), customer: Object.fromEntries(formData.entries()), items: { ...state.cart } });
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
  resetFilters();
  renderAll();
  showToast("La démonstration a été réinitialisée.");
});

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
renderSizeFilters();
renderAll();
