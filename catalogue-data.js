/* Catalogue partagé par toutes les pages du site. */
window.BazarCatalogue = {
  categories: [
    { id: "chaussures", label: "Chaussures", icon: "👟", accent: "#9f2f2b", href: "chaussures.html" },
    { id: "football", label: "Maillots & foot", icon: "⚽", accent: "#3d7659", href: "marche.html?categorie=football" },
    { id: "gaming", label: "Gaming", icon: "🎮", accent: "#5967a8", href: "marche.html?categorie=gaming" },
    { id: "mangas", label: "Mangas & livres", icon: "📚", accent: "#a2483d", href: "marche.html?categorie=mangas" },
    { id: "cartes", label: "Cartes", icon: "🃏", accent: "#8b6e26", href: "marche.html?categorie=cartes" },
    { id: "meubles", label: "Meubles", icon: "🪑", accent: "#7a4e2f", href: "marche.html?categorie=meubles" },
    { id: "vetements", label: "Vêtements", icon: "🧥", accent: "#345c74", href: "marche.html?categorie=vetements" },
    { id: "curiosites", label: "Curiosités", icon: "🧭", accent: "#7b5b32", href: "marche.html?categorie=curiosites" },
  ],
  products: [],
};

/* Les articles créés dans l'espace vendeur restent propres à cet appareil. */
try {
  const adminData = JSON.parse(localStorage.getItem("bazar-des-mugis-admin-products-v1") || "{}");
  const removed = new Set(adminData.removed || []);
  const edited = (adminData.products || []).filter(product => product.image && !removed.has(product.id));
  window.BazarCatalogue.products.push(...edited);
} catch (error) {
  console.warn("Les modifications vendeur n’ont pas pu être chargées.", error);
}
