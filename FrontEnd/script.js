// ÉTAPE 1.1 : RECUPERATION DES TRAVAUX DEPUIS LE BACK-END
// Récupération de la liste des projets depuis l'API
const reponse = await fetch("http://localhost:5678/api/works");
const projets = await reponse.json();

// Création et utilisation de la fonction de génération des cartes projets sur la base de l'API
function genererProjets(projets) {
    // Suppression de l'affichage du contenu initial de la section projet (class="gallery") 
    let portfolioSection = document.getElementById("portfolio");
    let divProjet = portfolioSection.querySelector(".gallery");
    divProjet.innerHTML = "";

    // Création et affichage du contenu de la section projet issue de l'API
    for (let i = 0; i < projets.length; i++) {

        const projetElement = document.createElement("figure");      // Création de la balise figure dédiée à un projet

        const imageElement = document.createElement("img");         // Création de l’élément img
        imageElement.src = projets[i].imageUrl;                     // Configuration de la source de l’image avec l’indice i de la liste projets
        projetElement.appendChild(imageElement);                    // Rattachement de l’image à pieceElement (la balise figure)

        const captionElement = document.createElement("figcaption");// Création de l’élément figcaption.
        captionElement.innerText = projets[i].title;                // Configuration de la légende de l’image avec l’indice i de la liste projets
        projetElement.appendChild(captionElement);                  // Rattachement de la légende à projetElement (la balise figure)

        let portfolioSection = document.getElementById("portfolio");
        let divProjet = portfolioSection.querySelector(".gallery");
        divProjet.appendChild(projetElement);                       // Rattachement de la balise figure à la balise des projets (<div class="gallery">)
    }
}
genererProjets(projets);

// ÉTAPE 1.2 : RECUPERATION DES TRAVAUX DEPUIS LE BACK-END
// Récupération de la liste des categories depuis l'API
const reponse_cat = await fetch("http://localhost:5678/api/categories");
const categories = await reponse_cat.json();
console.log(categories)

// Création de la fonction de filtre par catégorie
function filtrerParCatégories(nom_de_la_categorie) {
    const projetsFiltrés = projets.filter(projets => projets.category.name === nom_de_la_categorie);
    genererProjets(projetsFiltrés);
}

// Création de la fonction de génération et d'affichage de la barre des filtres
function genererBoutonsFiltres(categories) {
    const categoriesList = document.createElement("ul");                // Création de la balise ul qui contiendra les balises li (boutons Filtre)
    categoriesList.className = "filter-bar";

    const boutonElement = document.createElement("li");                 // Création de la balise li dédiée à un filtre
    boutonElement.innerText = "Tous";
    boutonElement.className = "button-filter";                                // Configuration du nom du bouton filtre avec l’indice i de la liste categories
    boutonElement.id = "Tous"
    categoriesList.appendChild(boutonElement);                          // Rattachement de la balise li à la balise de la liste des filtres (ul)

    for (let i = 0; i < categories.length; i++) {
        const boutonElement = document.createElement("li");             // Création de la balise li dédiée à un filtre
        boutonElement.innerText = categories[i].name;                   // Configuration du nom du bouton filtre avec l’indice i de la liste categories
        boutonElement.className = "button-filter";                      // Configuration du nom de la classe du bouton filtre précédé de la mention "button-filter"
        boutonElement.id =  categories[i].name;
        boutonElement.addEventListener("click", () => filtrerParCatégories(categories[i].name));
        categoriesList.appendChild(boutonElement);                      // Rattachement de la balise li à la balise de la liste des filtres (ul)
    }

    let portfolioSection = document.getElementById("portfolio");                    // Rattachement de la balise ul à la balise des projets
    portfolioSection.insertBefore(categoriesList, portfolioSection.children[1]);    // Placement des filtres avant la liste des projets                        
}
genererBoutonsFiltres(categories)