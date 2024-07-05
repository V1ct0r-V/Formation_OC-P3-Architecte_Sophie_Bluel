// ÉTAPE 1.1 : Créer la page de présentation des travaux à partir du HTML existant (Récupération dynamique de la liste des projets depuis l'API)

// Chargement de la liste des projets depuis l'API
const reponse_proj = await fetch("http://localhost:5678/api/works");
const projets = await reponse_proj.json();

// Définition de la fonction de génération des cartes projets sur la base des données de l'API
function genererProjets(projets) {
    // Suppression de l'affichage du contenu initial de la section projet (class="gallery") 
    let portfolioSection = document.getElementById("portfolio");
    let divProjet = portfolioSection.querySelector(".gallery");
    divProjet.innerHTML = "";

    // Réaffichage de la section projet = remplacement des images fixes par les images dynamiques issues de l'API
    for (let i = 0; i < projets.length; i++) {

        const projetElement = document.createElement("figure");     // Création de la balise figure dédiée à un projet

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

// Utilisation de la fonction "genererProjets" = génération dynamique des cartes projets
genererProjets(projets);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// ÉTAPE 1.2 : Créer la page de présentation des travaux à partir du HTML existant (Réalisation du filtre des travaux = Ajout des filtres pour afficher les travaux par catégorie)

// Chargement de la liste des catégories depuis l'API
const reponse_cat = await fetch("http://localhost:5678/api/categories");
const categories = await reponse_cat.json();

// Définition de la fonction de filtrage par catégorie
function filtrerParCatégories(nom_de_la_categorie) {
    const projetsFiltrés = projets.filter(projets => projets.category.name === nom_de_la_categorie); // Filtrage de la liste des projets en fonction du nom de leurs catégories
    genererProjets(projetsFiltrés);                                                                  // Réaffichage des projets après filtrage
}

// Définition de la fonction de génération et d'affichage de la barre des filtres (contient la fonction "filtrerParCatégories")
function genererBoutonsFiltres(categories) {
    const categoriesList = document.createElement("ul");                                            // Création de la balise ul qui contiendra les balises li (boutons Filtre)
    categoriesList.id = "filter-bar";

    const boutonElement = document.createElement("li");                                             // Création de la balise li dédiée à un filtre
    boutonElement.innerText = "Tous";                                                               // Configuration du bouton filtre "Tous"
    boutonElement.className = "button-filter";                                                      // Configuration du nom du bouton filtre avec l’indice i de la liste categories
    boutonElement.id = "Tous"                                                                       // Configuration de son id
    boutonElement.addEventListener("click", () => genererProjets(projets));                         // Affichage de l'intégralité des projets lors du clic sur le bouton filtre "Tous"
    categoriesList.appendChild(boutonElement);                                                      // Rattachement de la balise li à la balise de la liste des filtres (ul)

    for (let i = 0; i < categories.length; i++) {
        const boutonElement = document.createElement("li");                                         // Création de la balise li dédiée à un filtre
        boutonElement.innerText = categories[i].name;                                               // Configuration du nom du bouton filtre avec l’indice i de la liste categories
        boutonElement.className = "button-filter";                                                  // Configuration du nom de la classe du bouton filtre précédé de la mention "button-filter"
        boutonElement.id = categories[i].name;                                                      // Configuration de son id
        boutonElement.addEventListener("click", () => filtrerParCatégories(categories[i].name));    // Affichage des projets filtrés lors du clic sur le bouton filtre correspondant
        categoriesList.appendChild(boutonElement);                                                  // Rattachement de la balise li à la balise de la liste des filtres (ul)
    }

    let portfolioSection = document.getElementById("portfolio");                                    // Rattachement de la balise ul à la balise des projets
    portfolioSection.insertBefore(categoriesList, portfolioSection.children[1]);                    // Placement de la barre des filtres avant les cartes des projets                        
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ÉTAPE 2 :  INTÉGRATION DU DESIGN DE LA PAGE DE FORMULAIRE ET AUTHENTIFICATION DE L'UTILISATEUR
// Mise en marche du lien cliquable "Login" de la barre de navigation
const loginMenu = document.getElementById("menu-login");
loginMenu.addEventListener("click", () => AffichageLogin())

// Définition de la fonction "AffichageLogin" = 
// * création de l'affichage de la page login (dont le bouton "Se connecter")
// * exécution de la fonction "SeConnecterLogin" (voir fonction suivante)
function AffichageLogin() {
    // Suppression de l'affichage du contenu <main>
    const mainElement = document.querySelector("main");
    mainElement.innerHTML = "";

    // Création des éléments de la page "Login"
    const divElement = document.createElement("div");
    divElement.id = "div-login";
    mainElement.appendChild(divElement);

    const loginTitle = document.createElement("h2");
    loginTitle.id = "loginTitle";
    loginTitle.innerText = "Log In";
    divElement.appendChild(loginTitle);

    const formElement = document.createElement("form");
    formElement.id = "form-login";
    divElement.appendChild(formElement);

    const emailLabel = document.createElement("label")
    emailLabel.className = "login-label";
    emailLabel.setAttribute("for", "email");
    emailLabel.innerText = "E-mail";
    formElement.appendChild(emailLabel);

    const emailInput = document.createElement("input");
    emailInput.className = "login-input";
    emailInput.type = "text";
    emailInput.name = "email";
    emailInput.id = "email-input";
    formElement.appendChild(emailInput);

    const passwordLabel = document.createElement("label")
    passwordLabel.className = "login-label";
    passwordLabel.setAttribute("for", "password");
    passwordLabel.innerText = "Mot de passe";
    formElement.appendChild(passwordLabel);

    const passwordInput = document.createElement("input");
    passwordInput.className = "login-input";
    passwordInput.type = "text";
    passwordInput.name = "password";
    passwordInput.id = "password-input";
    formElement.appendChild(passwordInput);

    const loginButton = document.createElement("input");
    loginButton.id = "loginButton";
    loginButton.type = "submit"
    loginButton.value = "Se connecter";
    formElement.appendChild(loginButton);

    const forgotten_password = document.createElement("p");
    forgotten_password.id = "forgotten_password";
    forgotten_password.innerText = "Mot de passe oublié"
    divElement.appendChild(forgotten_password);

    // Ajout de la fonction de connexion à la partie "Edition" du site lors du clic sur le bouton "Login"
    SeConnecterLogin()
}

// Définition de la fonction de connexion "SeConnecterLogin" = 
// * listener sur le bouton "Se connecter" de la page "login"
// * récupération des valeurs saisies (email et mdp)
// * test de connexion avec ces valeurs : succès = sauvegarde du token et retour à la page principale, échec = affichage d'un message d'erreur
// * sauvegarde du résultat du test de connextion dans le localstorage
function SeConnecterLogin() {
    const formulaireLogin = document.getElementById("form-login");          // Recherche du formulaire de connexion
    formulaireLogin.addEventListener("submit", async function (event) {     // Définition de la fonction à appeler lors du clic sur le bouton "Se connecter"
        event.preventDefault();                                             // Empeche la page de se rafraichir lors du clic sur le bouton submit ("Se connecter")
        const IdPwLogin = {                                                 // Récupération des valeurs rentrés pour l'email et le mot de passe
            "email": document.getElementById("email-input").value,
            "password": document.getElementById("password-input").value
        }
        const chargeUtile = JSON.stringify(IdPwLogin);                      // Mise en forme des informations de connexion au format JSON

        // Lancement d'un try pour se connecter à l'API avec les données de connexion saisie

        // Si le try réussi, 2 cas de  figures en fonction du statut de la connexion :
        // si la connexion réussie, récupération du token de connexion et rechargement immédiat de la page principale. 
        // si la connexion échoue, affichage d'un message d'erreur et rechargement de la page principale après un léger délai.
        try {
            const reponse_log = await fetch("http://localhost:5678/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: chargeUtile
            });

            const data = await reponse_log.json(); // Extraction des données JSON

            // Si la connexion réussie :
            if (reponse_log.ok) {
                localStorage.setItem("ConnexionReussie", "true");                                    // Stockage du statut "réussite" de la connexion
                localStorage.setItem("authToken", data.token);                                      // Stockage du token de connexion
                window.location.href = "index.html";                                                // Rechargement instantanée de la page principale
            }
            // Si la connexion échoue :
            else {
                localStorage.setItem("ConnexionReussie", "false");                                   // Stockage du statut "échec" de la connexion
                let errorLoginMessage = document.getElementById("errorLoginMessage");
                if (!errorLoginMessage) {                                                           // Cette fonction si permet l'affichage du message d'erreur 
                    const errorLoginMessage = document.createElement("p");                          // Elle évite aussi le suraffichage du message d'erreur en cas de spam du bouton "Se connecter"
                    errorLoginMessage.id = "errorLoginMessage";
                    errorLoginMessage.innerText = "Erreur dans l’identifiant ou le mot de passe";
                    const formElement = document.getElementById("form-login");
                    formElement.insertBefore(errorLoginMessage, formElement.lastChild);
                }
                setTimeout(() => {
                    window.location.href = "index.html";                                            // Rechargement de la page après un léger délai pour que l'utilisateur puisse lire le message d'erreur
                }, "1200");
            }
        }

        // Si le try échoue, récupération de l'erreur et affichage du message d'erreur
        catch (error) {
            console.log(error);
        }
    });
}

// Chargement de la page HTML en fonction du statut de connexion (voir fonction SeConnecterLogin)
if (localStorage.ConnexionReussie === "true") {
    // Succès de la connexion =
    // * Fermeture de la page de connexion
    if (document.getElementById("div-login")) {
        document.getElementById("div-login").style.display = "none";
    }

    // * Affichage du bandeau "Mode édition" dans le header (= restructuration du header existant pour y intégrer le bandeau)
    const header = document.querySelector("header");                // Sélection du header existant
    header.id = "HeaderEdition";                                    // Attribution d'un id pour lui attribuer un style différent du header initial

    const EditionModeBar = document.createElement("div");           // Création du premier conteneur qui contiendra le bandeau
    EditionModeBar.id = "EditionModeBar";                           // Attribution de son identifiant "EditionModeBar"
    header.insertBefore(EditionModeBar, header.firstChild);         // Insertion du premier conteneur dans le header

    const HeaderSecondDiv = document.createElement("div");          // Création du second conteneur qui contiendra le titre et la barre de navigation
    HeaderSecondDiv.id = "HeaderSecondDiv";                         // Attribution de son identifiant "HeaderSecondDiv"
    const h1Element = document.querySelector("h1");                 // Sélection du titre à mettre dans le conteneur
    const navElement = document.querySelector("nav");               // Sélection de la barre de navigation à mettre dans le conteneur
    HeaderSecondDiv.appendChild(h1Element);                         // Insertion du titre dans le second conteneur
    HeaderSecondDiv.appendChild(navElement);                        // Insertion de la barre de navigation dans le second conteneur
    header.appendChild(HeaderSecondDiv);                            // Insertion du second conteneur dans le header

    const EditionModeBarText = document.createElement("p");         // Ajout d'un paragraphe pour afficher le texte "Mode édition" dans le bandeau
    EditionModeBarText.id = "EditionModeBarText";
    EditionModeBarText.innerHTML = '<i class="fa-solid fa-pen-to-square"></i> Mode édition';    // Ajout de l'icône et du texte dans le bandeau
    EditionModeBar.appendChild(EditionModeBarText);                 // Ajout du paragraphe dans la balise <div> du headers

    // * Affichage du bouton "Modifier" pour gérer les projets
    const MesProjetsModifierDiv = document.createElement("div");
    MesProjetsModifierDiv.id = "MesProjetsModifierDiv";

    const portfolioSection = document.getElementById("portfolio");
    const MesProjets = portfolioSection.querySelector("h2");
    MesProjetsModifierDiv.appendChild(MesProjets);

    const ModifierProjets = document.createElement("p");
    ModifierProjets.id = "ModifierProjets";
    ModifierProjets.innerHTML = '<i class="fa-regular fa-pen-to-square"></i> modifier';
    MesProjetsModifierDiv.appendChild(ModifierProjets);

    portfolioSection.insertBefore(MesProjetsModifierDiv, portfolioSection.firstChild);

    // * Mise en marche du lien cliquable "Modifier" pour la gestion des projets
    ModifierProjets.addEventListener("click", () => AffichageModale())

    async function AffichageModale() {
        // Affichage de l'overlay et de la modale
        const overlay = document.getElementById("overlay");
        overlay.style.display = "flex";
        const modale = document.getElementById("modale");
        modale.style.display = "flex";

        // Chargement de la liste des projets depuis l'API
        const reponse_proj = await fetch("http://localhost:5678/api/works");
        const projets = await reponse_proj.json();

        // Définition de la fonction de mise à jour de l'affichage des cartes projets sur la base des données de l'API
        function UpdateProjetsModale(projets) {
            // Suppression de l'affichage du contenu initial de la section projet de la modale
            let modale_main = document.getElementById("modale_main");
            modale_main.innerHTML = "";

            // Réaffichage de la section projet = ajout des images dynamiques issues de l'API
            for (let i = 0; i < projets.length; i++) {

                const figureElement = document.createElement("figure");     // Création de la balise figure dédiée à un projet
                figureElement.id = "figure_" + `${projets[i].id}`;
                modale_main.appendChild(figureElement);

                const imageElement = document.createElement("img");         // Création de l’élément img
                imageElement.src = projets[i].imageUrl;                     // Configuration de la source de l’image avec l’indice i de la liste projets
                imageElement.id = "image_" + `${projets[i].id}`;
                figureElement.appendChild(imageElement);                    // Rattachement de l’image à figureElement (la balise figure)

                const trashDiv = document.createElement("div");         // Création de l’élément img
                trashDiv.className = "trash-div";
                trashDiv.id = "div_" + `${projets[i].id}`;
                trashDiv.innerHTML = '<i class="fa-solid fa-trash-can"></i>';                     // Configuration de la source de l’image avec l’indice i de la liste projets
                figureElement.appendChild(trashDiv);                    // Rattachement de l’image à figureElement (la balise figure)

                modale_main.appendChild(figureElement);                       // Rattachement de la balise figure à la balise des projets (<div class="gallery">)
            }
        }
        UpdateProjetsModale(projets)
    }

    // * Mise en marche de la fermeture de la modale par un clic sur la croix de fermeture ou sur l'overlay :
    const overlay = document.getElementById("overlay");
    overlay.addEventListener("click", () => FermetureModale());

    const modale_cross = document.querySelector(".fa-xmark");
    modale_cross.addEventListener("click", () => FermetureModale());

    function FermetureModale() {
        document.getElementById("overlay").style.display = "none";
        document.getElementById("modale").style.display = "none";
    }

    // * Affichage : remplacement du bouton "Login par un bouton "Logout"
    let Logout = document.getElementById("menu-login");             // Sélection du bouton "login" de la barre de recherche
    Logout.id = "menu-logout";                                      // Attribution de l'id "logout"
    Logout.innerText = "logout";                                    // Changement du contenu en "logout"

    // Mise en marche du lien cliquable "Login" de la barre de navigation
    const logoutMenu = document.getElementById("menu-logout");
    logoutMenu.addEventListener("click", () => AffichageLogout())

    function AffichageLogout() {
        window.location.href = "index.html";
    }

    // * Mise en marche du lien cliquable "Ajouter une photo" pour la gestion des projets
    const modale_button = document.getElementById("modale_button");
    modale_button.addEventListener("click", () => AffichageAjoutPhoto())

    async function AffichageAjoutPhoto() {
        // Suppression du contenu du modale_main
        let modale_main = document.getElementById("modale_main");
        modale_main.innerHTML = "";

        // Ajout de l'icone "Précédent"
        let modale_header = document.getElementById("modale_header");
        let previous_icon = document.createElement("i");
        previous_icon.className = "fa-solid fa-arrow-left";
        modale_header.insertBefore(previous_icon, modale_header.firstChild)

        modale_header.style.justifyContent = "space-between";

        // Changement du titre de la modale
        let titre = document.getElementById("modale_title_h3");
        titre.innerText = "Ajout photo";

        // Chargement du contenu du "modale_main"
        let form_modale = document.createElement("form");
        form_modale.id = "form_modale";
        let chargement_photo_div = document.createElement("div");
        chargement_photo_div.id = "chargement_photo_div";
        form_modale.appendChild(chargement_photo_div);

        let IconeImage = document.createElement("i");
        IconeImage.id = "IconeImage";
        IconeImage.className = "fa-regular fa-image";
        chargement_photo_div.appendChild(IconeImage);

        let AjouterPhotoBouton = document.createElement("p");
        AjouterPhotoBouton.id = "AjouterPhotoBouton";
        AjouterPhotoBouton.innerText = "+ Ajouter photo";
        chargement_photo_div.appendChild(AjouterPhotoBouton);

        let InfoTailleImage = document.createElement("p");
        InfoTailleImage.id = "InfoTailleImage";
        InfoTailleImage.innerText = "jpg,png : 4mo max";
        chargement_photo_div.appendChild(InfoTailleImage);

        let titre_label = document.createElement("label");
        titre_label.setAttribute('for', "titre");
        titre_label.innerText = "Titre";
        form_modale.appendChild(titre_label);

        let titre_input = document.createElement("input");
        titre_input.setAttribute('type', "text");
        titre_input.setAttribute('id', "titre");
        titre_input.setAttribute('name', "titre");
        titre_input.className = "form_input";
        form_modale.appendChild(titre_input);

        let categorie_label = document.createElement("label");
        categorie_label.innerText = "Catégorie";
        form_modale.appendChild(categorie_label);

        let categorie_select = document.createElement("select");
        categorie_select.setAttribute('name', "categorie");
        categorie_select.setAttribute('id', "categorie");
        categorie_select.className = "form_input";
        form_modale.appendChild(categorie_select);

        const reponse_cat = await fetch("http://localhost:5678/api/categories");
        const categories = await reponse_cat.json();

        let categorie_option_base = document.createElement("option");
        categorie_option_base.setAttribute('value', "");
        categorie_select.appendChild(categorie_option_base);

        for (let i = 0; i < categories.length; i++){
            let categories_option = document.createElement("option");
            categories_option.setAttribute('value', categories[i].name);
            categories_option.innerText = categories[i].name;
            categorie_select.appendChild(categories_option);
        }

        modale_main.appendChild(form_modale);

        // Changement du bouton
        let valider_bouton = document.getElementById("modale_button");
        valider_bouton.id = "valider_bouton";
        valider_bouton.innerText = "Valider";
    }

    // * Suppression du résultat du test de connexion
    localStorage.removeItem("ConnexionReussie");
}
else {
    // Échec de la connexion =

    // Génération des boutons filtres
    genererBoutonsFiltres(categories)

    // Suppression du résultat du test de connexion
    localStorage.removeItem("ConnexionReussie");
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ÉTAPE 3 :  
