/* Catalogue photographié le 1er octobre 2026.
 * Informations maillots mises à jour depuis catalogue_maillots_prix_codex.docx.
 */
(function () {
  const catalogue = window.BazarCatalogue;
  if (!catalogue) return;

  /* Les originaux RAW restent hors du dépôt public. */
  const real = () => "";
  const gallery = () => [];
  const optimizedName = name => name.replace(/\.png$/i, ".jpg");
  const hero = name => `hero/${optimizedName(name)}`;
  const flat = name => `a-plat/${optimizedName(name)}`;
  const pending = "À confirmer";
  const delivery = "CHF 5.– par la Poste ou retrait à Orbe";

  const shirt = (id, name, image, start, end, price, marketPrice, specs, description) => ({
    id, name, category: "football", icon: "👕", image: hero(image), images: gallery("foot--sport", start, end),
    price, marketPrice, condition: specs.État || "Très bon", detail: specs.Flocage || specs.Taille || "Taille à confirmer", shippingFee: 5,
    shipping: delivery, stock: 1, provisional: true, specs, description
  });

  const products = [
    shirt("argentine-champions-bleu", "Maillot Argentine extérieur — Champions du monde", "maillot-argentine-champions.png", 38, 41, 35, 55, { Équipe:"Argentine", Marque:"Adidas", Saison:"2024", Taille:"M", État:"Très bon", Détails:"Badge champions du monde" }, "Maillot extérieur bleu de l’Argentine 2024 avec badge de champions du monde."),
    shirt("suisse-vargas-11", "Maillot Suisse extérieur EURO — Vargas 11", "maillot-suisse-vargas.png", 42, 44, 20, 35, { Équipe:"Suisse", Marque:"Puma", Saison:"2021", Taille:"S", État:"Très bon", Flocage:"Vargas 11 non officiel" }, "Maillot extérieur blanc de la Suisse avec flocage Vargas 11 non officiel."),
    shirt("barcelone-suarez-9", "Maillot FC Barcelone extérieur — Suárez 9", "maillot-barcelone-suarez.png", 45, 47, 50, 75, { Équipe:"FC Barcelone", Marque:"Nike", Saison:"2017-2018", Taille:"S", État:"Très bon", Sponsor:"Rakuten", Flocage:"Suárez 9 officiel", Badge:"LaLiga" }, "Maillot extérieur du FC Barcelone avec flocage officiel Suárez 9 et badge LaLiga."),
    shirt("servette-noir-puma", "Maillot Servette FC noir", "maillot-servette-noir.png", 48, 50, 30, 45, { Équipe:"Servette FC", Marque:"Puma", Saison:"2020-2021", Taille:"S", État:"Très bon", Couleur:"Noir" }, "Maillot noir du Servette FC, saison 2020-2021."),
    shirt("bordeaux-kia-puma", "Maillot Girondins de Bordeaux extérieur", "maillot-bordeaux-kia.png", 51, 53, 30, 45, { Équipe:"Girondins de Bordeaux", Marque:"Puma", Saison:"2015-2016", Taille:"S", État:"Très bon", Sponsor:"KIA" }, "Maillot extérieur noir et rose des Girondins de Bordeaux, saison 2015-2016."),
    shirt("adidas-messi-numero-10-bleu", "Maillot adidas Messi bleu — numéro 10", "maillot-adidas-messi-10.png", 54, 56, 10, 20, { Collection:"Ligne Messi adidas", Saison:"Année inconnue", Taille:"XL enfant", État:"Très bon", Flocage:"Messi 10", Modèle:"Exact à confirmer" }, "Haut bleu de la ligne Messi adidas avec numéro 10. Ce n’est pas un maillot de l’Argentine."),
    shirt("espagne-rouge-classique", "Maillot Espagne rétro — imitation", "maillot-espagne-classique.png", 57, 60, 5, 10, { Équipe:"Espagne", Saison:"Environ 1998", Taille:"M", État:"Très bon", Authenticité:"Imitation / non officiel" }, "Maillot rétro de l’Espagne. Article d’imitation clairement vendu comme non officiel."),
    shirt("angleterre-blanc-umbro", "Maillot Angleterre domicile blanc — Umbro", "maillot-angleterre-umbro.png", 61, 63, 45, 65, { Équipe:"Angleterre", Marque:"Umbro", Saison:"2005-2007", Taille:"S", État:"Très bon" }, "Maillot domicile blanc de l’Angleterre, saison 2005-2007."),
    shirt("porto-casillas-12", "Maillot gardien FC Porto — Casillas", "maillot-porto-casillas.png", 64, 66, 50, 75, { Équipe:"FC Porto", Marque:"New Balance", Saison:"2015-2016", Taille:"XS", État:"Très bon", Flocage:"Iker Casillas officiel" }, "Maillot gardien noir du FC Porto avec flocage officiel Iker Casillas."),
    shirt("milan-andre-silva-9", "Maillot AC Milan — André Silva 9", "maillot-milan-andre-silva.png", 67, 70, 25, 45, { Équipe:"AC Milan", Marque:"Adidas", Saison:"2017-2018", Taille:"S", État:"Bon / très bon hors flocage", Sponsor:"Fly Emirates", Flocage:"André Silva 9" }, "Le S du flocage « André Silva » est partiellement décollé."),
    shirt("espagne-isco-22", "Maillot Espagne — Isco 22", "maillot-espagne-isco.png", 71, 73, 30, 50, { Équipe:"Espagne", Marque:"Adidas", Saison:"2022-2023 à vérifier", Taille:"S", État:"Très bon", Flocage:"Isco 22 officiel" }, "Maillot rouge de l’Espagne avec flocage officiel Isco 22."),
    {
      id:"arsenal-puma-fly-emirates", name:"Maillot Arsenal rouge et blanc — Puma", category:"football", icon:"👕",
      image:hero("maillot-arsenal-puma-blanc-v2.png"), images:gallery("foot--sport",74,76), price:35, marketPrice:50,
      condition:"Très bon", detail:"Taille S", shippingFee:5, shipping:delivery, stock:1, provisional:true,
      specs:{Équipe:"Arsenal",Marque:"Puma",Sponsor:"Fly Emirates",Saison:"2018-2019",Taille:"S",État:"Très bon"},
      description:"Maillot Arsenal Puma rouge et blanc, saison 2018-2019."
    },
    shirt("sion-rouge-errea", "Maillot FC Sion manches longues", "maillot-sion.png", 77, 79, 45, 70, { Équipe:"FC Sion", Marque:"Erreà", Saison:"2002-2004", Taille:"XS", État:"Très bon", Sponsor:"Le Nouvelliste", Anecdote:"Touché par Nuzzolo lors de l’entrée des joueurs" }, "Maillot rouge à manches longues du FC Sion. Selon le propriétaire, il a été touché par Nuzzolo lors de l’entrée des joueurs."),
    {
      id:"arsenal-haut-entrainement", name:"Haut d’entraînement Arsenal rouge", category:"football", icon:"🧥",
      image:hero("haut-arsenal-entrainement.png"), images:gallery("foot--sport",80,84), price:20, marketPrice:35,
      condition:"Très bon", detail:"Taille S", shippingFee:5, shipping:delivery, stock:1, provisional:true,
      specs:{Équipe:"Arsenal",Marque:"Adidas",Type:"Haut d’entraînement manches longues",Saison:"2019-2020",Taille:"S",État:"Très bon"}, description:"Haut d’entraînement Arsenal à manches longues, saison 2019-2020."
    },
    {
      id:"majorque-haut-jaune", name:"Haut d’entraînement Majorque jaune", category:"football", icon:"🧥",
      image:hero("haut-majorque-jaune.png"), images:gallery("foot--sport",85,88), price:20, marketPrice:30,
      condition:"Très bon", detail:"Taille S", shippingFee:5, shipping:delivery, stock:1, provisional:true,
      specs:{Équipe:"RCD Majorque",Marque:"Nike",Type:"Haut d’entraînement demi-zip",Saison:"2024-2025",Taille:"S",État:"Très bon"}, description:"Haut d’entraînement jaune du RCD Majorque, saison 2024-2025."
    },
    { id:"short-suisse-blanc", name:"Short Suisse extérieur EURO blanc", category:"football", icon:"🩳", image:hero("short-suisse-blanc.png"), images:[real("foot--sport",89)], price:12, marketPrice:20, condition:"Très bon", detail:"Taille S", shippingFee:4, shipping:delivery, stock:1, provisional:true, specs:{Équipe:"Suisse",Marque:"Puma",Saison:"2021",Couleur:"Blanc",Taille:"S",État:"Très bon"}, description:"Short extérieur blanc de la Suisse pour l’EURO 2021." },
    { id:"short-majorque-noir", name:"Short RCD Majorque domicile", category:"football", icon:"🩳", image:hero("short-majorque-noir.png"), images:[real("foot--sport",90)], price:12, marketPrice:20, condition:"Très bon", detail:"Taille à confirmer", shippingFee:4, shipping:delivery, stock:1, provisional:true, specs:{Équipe:"RCD Majorque",Marque:"Nike",Saison:"2024-2025",Couleur:"Noir",Taille:pending,État:"Très bon"}, description:"Short domicile noir du RCD Majorque, saison 2024-2025." },
    { id:"pantalon-training-bleu", name:"Pantalon d’entraînement bleu foncé", category:"football", icon:"👖", image:hero("pantalon-sport-bleu.png"), images:gallery("foot--sport",91,92), price:10, marketPrice:15, condition:pending, detail:"Taille M", shippingFee:5, shipping:delivery, stock:1, provisional:true, specs:{Type:"Pantalon d’entraînement",Couleur:"Bleu foncé",Saison:"Année inconnue",Marque:pending,Taille:"M",État:pending}, description:"Pantalon d’entraînement bleu foncé. Le club et la marque restent à confirmer." },
    { id:"pantalon-training-porto", name:"Pantalon d’entraînement FC Porto", category:"football", icon:"👖", image:hero("pantalon-training-porto.png"), images:gallery("foot--sport",93,94), price:20, marketPrice:30, condition:"Bon", detail:"Taille M", shippingFee:5, shipping:delivery, stock:1, provisional:true, specs:{Équipe:"FC Porto",Type:"Pantalon d’entraînement",Saison:"2022",Couleur:"Bleu marine",Taille:"M",État:"Bon"}, description:"Pantalon d’entraînement bleu marine du FC Porto, saison 2022." },
    { id:"pantalon-dortmund-noir", name:"Pantalon d’entraînement Borussia Dortmund", category:"football", icon:"👖", image:hero("pantalon-dortmund-noir.png"), images:[real("foot--sport",95)], price:20, marketPrice:30, condition:pending, detail:"Taille à confirmer", shippingFee:5, shipping:delivery, stock:1, provisional:true, specs:{Équipe:"Borussia Dortmund",Type:"Pantalon d’entraînement",Saison:"2018-2019",Couleur:"Noir",Taille:pending,État:pending}, description:"Pantalon d’entraînement noir du Borussia Dortmund avec détails jaunes." },
    { id:"pantalon-nike-bleu-ciel", name:"Pantalon d’entraînement Nike bleu ciel", category:"football", icon:"👖", image:hero("pantalon-nike-bleu-ciel.png"), images:[real("foot--sport",96)], price:10, marketPrice:15, condition:pending, detail:"Taille XS", shippingFee:5, shipping:delivery, stock:1, provisional:true, specs:{Marque:"Nike",Type:"Pantalon d’entraînement",Couleur:"Bleu ciel",Saison:"Année inconnue",Équipe:pending,Taille:"XS",État:pending}, description:"Pantalon d’entraînement Nike bleu ciel. Équipe et modèle à confirmer." },
    { id:"veste-arsenal-marine", name:"Veste Arsenal bleu marine — Puma", category:"football", icon:"🧥", image:hero("veste-arsenal-marine.png"), images:gallery("foot--sport",97,98), price:30, marketPrice:45, condition:"Très bon", detail:"Taille S", shippingFee:6, shipping:delivery, stock:1, provisional:true, specs:{Équipe:"Arsenal",Marque:"Puma",Sponsor:"Fly Emirates",Saison:"2018-2019",Taille:"S",État:"Très bon"}, description:"Veste Arsenal Puma bleu marine et rouge, saison 2018-2019." },
    { id:"team-vaud-adidas-2014", name:"Maillot Team Vaud adidas", category:"football", icon:"👕", image:hero("maillot-team-vaud-adidas.png"), images:gallery("foot--sport",99,100), price:15, marketPrice:25, condition:"Très bon", detail:"Taille S", shippingFee:5, shipping:delivery, stock:1, provisional:true, specs:{Équipe:"Team Vaud",Marque:"Adidas",Saison:"2014",Couleur:"Bleu",Taille:"S",État:"Très bon"}, description:"Maillot bleu Team Vaud adidas, saison 2014." },
    { id:"majorque-rouge-noir", name:"Maillot RCD Majorque domicile", category:"football", icon:"👕", image:hero("maillot-majorque-rouge-noir.png"), images:gallery("foot--sport",101,103), price:25, marketPrice:40, condition:"Très bon", detail:"Taille S", shippingFee:5, shipping:delivery, stock:1, provisional:true, specs:{Équipe:"RCD Majorque",Marque:"Umbro",Sponsor:"betpoint",Saison:"2018-2019",Taille:"S",État:"Très bon"}, description:"Maillot domicile rouge et noir du RCD Majorque, saison 2018-2019." },
    {
      id:"maillot-chien-espagne-10", name:"Maillot pour chien Espagne 10", category:"football", icon:"🐕",
      image:hero("maillot-chien-espagne.png"), images:[real("foot--sport",104)], price:10, marketPrice:15,
      condition:pending, detail:"Taille pour chien à confirmer", shippingFee:3, shipping:"CHF 3.– par la Poste ou retrait à Orbe", stock:1, provisional:true,
      specs:{Animal:"Chien",Motif:"Espagne 10",Taille:pending,Mesures:pending}, description:"Petit maillot rouge et jaune pour chien, présenté sur un chien généré. Vérifier les mesures avant achat."
    },
    {
      id:"maillot-chien-football", name:"Maillot pour chien rouge et jaune — Football", category:"football", icon:"🐕",
      image:hero("maillot-chien-football.png"), images:[real("foot--sport",105)], price:10, marketPrice:15,
      condition:pending, detail:"Taille pour chien à confirmer", shippingFee:3, shipping:"CHF 3.– par la Poste ou retrait à Orbe", stock:1, provisional:true,
      specs:{Animal:"Chien",Motif:"Ballon de football",Taille:pending,Mesures:pending}, description:"Maillot rouge et jaune pour chien avec ballon. Vérifier les mesures avant achat."
    },
    {
      id:"clavier-mecanique-compact", name:"Clavier mécanique compact avec molette", category:"gaming", icon:"⌨️",
      image:hero("clavier-mecanique-blanc-v2.png"), images:gallery("gaming",106,108), price:35, marketPrice:50,
      condition:pending, detail:"Modèle et disposition à confirmer", shippingFee:7, shipping:"CHF 7.– par la Poste ou retrait à Orbe", stock:1, provisional:true,
      specs:{Type:"Clavier mécanique compact",Disposition:pending,Connexion:pending,Switches:pending,Test:pending}, description:"Clavier mécanique compact avec molette et touches illustrées. Modèle, switches, connectique et fonctionnement à confirmer."
    },
    {
      id:"noragami-27-collector", name:"Noragami tome 27 — Édition collector", category:"mangas", icon:"📘",
      image:hero("noragami-27-collector.png"), images:gallery("manga",109,112), price:18, marketPrice:24.3,
      condition:pending, detail:"Édition française Pika", shippingFee:5, shipping:delivery, stock:1, provisional:true,
      specs:{Série:"Noragami",Tome:"27",Édition:"Collector",Langue:"Français",Éditeur:"Pika"}, description:"Édition collector française du dernier tome de Noragami. État du fourreau et contenu exact à confirmer."
    },
    {
      id:"stickers-razer", name:"Planche de stickers Razer", category:"curiosites", icon:"🟢",
      image:hero("stickers-razer-blanc-v2.png"), images:[real("autre",113)], price:3, marketPrice:5,
      condition:pending, detail:"Deux logos et lettrage", shippingFee:2, shipping:"CHF 2.– par courrier ou retrait à Orbe", stock:1, provisional:true,
      specs:{Marque:"Razer",Contenu:"Planche de stickers",Dimensions:pending}, description:"Planche de stickers Razer avec deux emblèmes verts et lettrage."
    },
    {
      id:"lot-cartes-pokemon-2010", name:"Lot de cartes Pokémon — autour de 2010", category:"cartes", icon:"🃏",
      image:hero("lot-cartes-pokemon.png"), images:gallery("carte",114,133), price:8, marketPrice:12,
      condition:pending, detail:"Quantité exacte à confirmer", shippingFee:3, shipping:"CHF 3.– par courrier protégé ou retrait à Orbe", stock:1, provisional:true,
      specs:{Collection:"Pokémon",Période_visible:"Autour de 2010",Langues:pending,Quantité:pending,Protection:pending}, description:"Lot comprenant notamment Heatmor, Kricketune, Mushana, Nidoking, Carnivine et Embrylex. Valeur à contrôler carte par carte selon l’état."
    }
  ];

  const flatImages = {
    "argentine-champions-bleu":"argentine-2024-a-plat.png",
    "suisse-vargas-11":"suisse-vargas-a-plat.png",
    "barcelone-suarez-9":"barcelone-suarez-a-plat.png",
    "servette-noir-puma":"servette-noir-a-plat.png",
    "bordeaux-kia-puma":"bordeaux-kia-a-plat.png",
    "adidas-messi-numero-10-bleu":"adidas-messi-10-a-plat.png",
    "espagne-rouge-classique":"espagne-retro-a-plat.png",
    "angleterre-blanc-umbro":"angleterre-umbro-a-plat.png",
    "porto-casillas-12":"porto-casillas-a-plat.png",
    "milan-andre-silva-9":"milan-andre-silva-a-plat.png",
    "espagne-isco-22":"espagne-isco-a-plat.png",
    "arsenal-puma-fly-emirates":"arsenal-maillot-a-plat.png",
    "sion-rouge-errea":"sion-longues-a-plat.png",
    "arsenal-haut-entrainement":"arsenal-training-a-plat.png",
    "majorque-haut-jaune":"majorque-training-jaune-a-plat.png",
    "veste-arsenal-marine":"arsenal-veste-a-plat.png",
    "team-vaud-adidas-2014":"team-vaud-a-plat.png",
    "majorque-rouge-noir":"majorque-domicile-a-plat.png"
  };
  products.forEach(product => {
    if (flatImages[product.id]) product.cleanImages = [flat(flatImages[product.id])];
  });

  catalogue.products = catalogue.products.filter(product => !product.demo);
  products.slice().reverse().forEach(product => {
    if (!catalogue.products.some(existing => existing.id === product.id)) catalogue.products.unshift(product);
  });
})();
