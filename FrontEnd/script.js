///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ÉTAPE 1 - CRÉER LA PAGE DE PRÉSENTATION DES TRAVAUX À PARTIR DU HTML EXISTANT
// ÉTAPE 1.1 - 𝘙𝘦́𝘤𝘶𝘱𝘦́𝘳𝘢𝘵𝘪𝘰𝘯 𝘥𝘺𝘯𝘢𝘮𝘪𝘲𝘶𝘦 𝘥𝘦 𝘭𝘢 𝘭𝘪𝘴𝘵𝘦 𝘥𝘦𝘴 𝘱𝘳𝘰𝘫𝘦𝘵𝘴 𝘥𝘦𝘱𝘶𝘪𝘴 𝘭'𝘈𝘗𝘐

// Chargement de la liste des projets depuis l'API
const reponse_proj = await fetch("http://localhost:5678/api/works");
let projets = await reponse_proj.json();

// Définition de la fonction d'affichage dynamique des projets sur la page principale
function AffichageDynamiqueDesProjets(projets) {
    // Suppression de l'affichage du contenu précédent de la galerie des projets
    let portfolioSection = document.getElementById("portfolio");
    let divProjet = portfolioSection.querySelector(".gallery");
    divProjet.innerHTML = "";

    // Réaffichage de la section projet = remplacement des images fixes par les images dynamiques issues de l'API
    for (let i = 0; i < projets.length; i++) {
        const projetElement = document.createElement("figure");     // Création de la balise figure dédiée à un projet
        projetElement.id = "projet_" + `${projets[i].id}`;

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
AffichageDynamiqueDesProjets(projets);


// ÉTAPE 1.2 - 𝘙𝘦́𝘢𝘭𝘪𝘴𝘢𝘵𝘪𝘰𝘯 𝘥𝘶 𝘧𝘪𝘭𝘵𝘳𝘦 𝘥𝘦𝘴 𝘵𝘳𝘢𝘷𝘢𝘶𝘹 : 𝘈𝘫𝘰𝘶𝘵 𝘥𝘦𝘴 𝘧𝘪𝘭𝘵𝘳𝘦𝘴 𝘱𝘰𝘶𝘳 𝘢𝘧𝘧𝘪𝘤𝘩𝘦𝘳 𝘭𝘦𝘴 𝘵𝘳𝘢𝘷𝘢𝘶𝘹 𝘱𝘢𝘳 𝘤𝘢𝘵𝘦́𝘨𝘰𝘳𝘪𝘦

// Chargement de la liste des catégories depuis l'API
const reponse_cat = await fetch("http://localhost:5678/api/categories");
const categories = await reponse_cat.json();

// Définition de la fonction de filtrage par catégories des projets de la page principale
function FiltrerProjetsParCatégories(nom_de_la_categorie) {
    const projetsFiltrés = projets.filter(projets => projets.category.name === nom_de_la_categorie); // Filtrage de la liste des projets en fonction du nom de leurs catégories
    AffichageDynamiqueDesProjets(projetsFiltrés);                                                                  // Réaffichage des projets après filtrage
}

// Définition de la fonction d'affichage de la barre des filtres (contient la fonction "FiltrerProjetsParCatégories")
function AffichageDesBoutonsFiltres(categories) {
    const categoriesList = document.createElement("ul");                                            // Création de la balise ul qui contiendra les balises li (boutons Filtre)
    categoriesList.id = "filter-bar";

    const boutonElement = document.createElement("li");                                             // Création de la balise li dédiée à un filtre
    boutonElement.innerText = "Tous";                                                               // Configuration du bouton filtre "Tous"
    boutonElement.className = "button-filter";                                                      // Configuration du nom du bouton filtre avec l’indice i de la liste categories
    boutonElement.id = "Tous"                                                                       // Configuration de son id
    boutonElement.addEventListener("click", () => AffichageDynamiqueDesProjets(projets));                         // Affichage de l'intégralité des projets lors du clic sur le bouton filtre "Tous"
    categoriesList.appendChild(boutonElement);                                                      // Rattachement de la balise li à la balise de la liste des filtres (ul)

    for (let i = 0; i < categories.length; i++) {
        const boutonElement = document.createElement("li");                                         // Création de la balise li dédiée à un filtre
        boutonElement.innerText = categories[i].name;                                               // Configuration du nom du bouton filtre avec l’indice i de la liste categories
        boutonElement.className = "button-filter";                                                  // Configuration du nom de la classe du bouton filtre précédé de la mention "button-filter"
        boutonElement.id = categories[i].name;                                                      // Configuration de son id
        boutonElement.addEventListener("click", () => FiltrerProjetsParCatégories(categories[i].name));    // Affichage des projets filtrés lors du clic sur le bouton filtre correspondant
        categoriesList.appendChild(boutonElement);                                                  // Rattachement de la balise li à la balise de la liste des filtres (ul)
    }

    let portfolioSection = document.getElementById("portfolio");                                    // Rattachement de la balise ul à la balise des projets
    portfolioSection.insertBefore(categoriesList, portfolioSection.children[1]);                    // Placement de la barre des filtres avant les cartes des projets                        
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ÉTAPE 2 :  CODAGE DE LA PAGE DE CONNEXION
// ÉTAPE 2.1 - 𝘐𝘯𝘵𝘦́𝘨𝘳𝘢𝘵𝘪𝘰𝘯 𝘥𝘶 𝘥𝘦𝘴𝘪𝘨𝘯 𝘥𝘦 𝘭𝘢 𝘱𝘢𝘨𝘦 𝘥𝘦 𝘧𝘰𝘳𝘮𝘶𝘭𝘢𝘪𝘳𝘦

// Mise en marche du lien "Login" de la barre de navigation (contient la fonction AffichagePageLogin)
const loginMenu = document.getElementById("menu-login");
loginMenu.addEventListener("click", () => AffichagePageLogin())

// Définition de la fonction "AffichagePageLogin" = 
// * création de l'affichage de la page "Login"
// * appel de la fonction "Se connecter" (voir description ci-dessous)
function AffichagePageLogin() {
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
    passwordInput.type = "password";
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

    SeConnecter();
}

// ÉTAPE 2.2 - 𝘈𝘶𝘵𝘩𝘦𝘯𝘵𝘪𝘧𝘪𝘤𝘢𝘵𝘪𝘰𝘯 𝘥𝘦 𝘭’𝘶𝘵𝘪𝘭𝘪𝘴𝘢𝘵𝘦𝘶𝘳

// Définition de la fonction de connexion "SeConnecter" = 
// * écouteur  sur le bouton "Se connecter" de la page "login"
// * récupération des valeurs saisies (email et mdp)
// * test de connexion avec ces valeurs : 
//      * succès = sauvegarde du token et accès à la page principale en mode "Edition"
//      * échec  = affichage d'un message d'erreur et retour à la page principale initiale
// * sauvegarde du résultat du test de connextion dans le localstorage
function SeConnecter() {
    const formulaireLogin = document.getElementById("form-login");          // Recherche du formulaire de connexion
    formulaireLogin.addEventListener("submit", async function (event) {     // Définition de la fonction à appeler lors du clic sur le bouton "Se connecter"
        event.preventDefault();                                             // Empeche la page de se rafraichir lors du clic sur le bouton submit ("Se connecter")
        const IdPwLogin = {                                                 // Récupération des valeurs rentrés pour l'email et le mot de passe
            "email": document.getElementById("email-input").value,
            "password": document.getElementById("password-input").value
        }
        const chargeUtile = JSON.stringify(IdPwLogin);                      // Mise en forme des informations de connexion au format JSON

        // Lancement d'un try pour tenter de se connecter à l'API avec les données de connexion saisie
        try {
            const reponse_log = await fetch("http://localhost:5678/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: chargeUtile
            });

            const data = await reponse_log.json(); // Extraction des données JSON
            localStorage.clear();                                                                   // Réinitialisation du localStorage au début du code

            // Si la connexion réussie :
            if (reponse_log.ok) {
                localStorage.setItem("authToken", data.token);                                      // Stockage du token de connexion
                window.location.href = "index.html";                                                // Rechargement instantanée de la page principale en mode "Édition"
            }

            // Si la connexion échoue :
            else {
                localStorage.setItem("authToken", "");                                              // Stockage d'un token vide
                let errorLoginMessage = document.getElementById("errorLoginMessage");
                if (!errorLoginMessage) {                                                           // Cette fonction si permet l'affichage du message d'erreur 
                    const errorLoginMessage = document.createElement("p");                          // Elle évite aussi le suraffichage du message d'erreur en cas de spam du bouton "Se connecter"
                    errorLoginMessage.id = "errorLoginMessage";
                    if (reponse_log.status === 401) {
                        errorLoginMessage.innerText = "Erreur dans l’identifiant ou le mot de passe";
                    }
                    if (reponse_log.status === 404) {
                        errorLoginMessage.innerText = "Erreur 404 : Page non trouvée";
                    }
                    const formElement = document.getElementById("form-login");
                    formElement.insertBefore(errorLoginMessage, formElement.lastChild);
                }

                setTimeout(() => {
                    window.location.href = "index.html";                                            // Rechargement de la page après un léger délai pour que l'utilisateur lise le message d'erreur
                }, "1200");
            }
        }

        // Si le try échoue pour d'autres raisons : 
        catch (error) {
            console.log(error);                                                                     // Récupération et affichage de l'erreur
        }
    });
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ÉTAPE 3 :  AJOUTER LA MODALE
// Chargement de la page HTML en fonction du statut de connexion (voir fonction SeConnecter)
if (localStorage.authToken) {
    // Succès de la connexion =

    // ÉTAPE 3.1 : 𝘊𝘳𝘦́𝘢𝘵𝘪𝘰𝘯 𝘥𝘦 𝘭𝘢 𝘧𝘦𝘯𝘦̂𝘵𝘳𝘦 𝘮𝘰𝘥𝘢𝘭𝘦 𝘦𝘵 𝘨𝘦𝘴𝘵𝘪𝘰𝘯 𝘥𝘦 𝘴𝘰𝘯 𝘢𝘱𝘱𝘢𝘳𝘪𝘵𝘪𝘰𝘯 𝘦𝘵 𝘥𝘪𝘴𝘱𝘢𝘳𝘪𝘵𝘪𝘰𝘯.
    // * Affichage de la page après réussite de la connexion
    function AffichagePageConnexionReussie() {
        // * Fermeture de la page de connexion "Login"
        if (document.getElementById("div-login")) {
            document.getElementById("div-login").style.display = "none";
        }

        // * Affichage : création du bandeau "Mode édition" dans le header
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

        // * Affichage : remplacement du bouton "Login" par un bouton "Logout"
        let Logout = document.getElementById("menu-login");             // Sélection du bouton "login" de la barre de recherche
        Logout.id = "menu-logout";                                      // Attribution de l'id "logout"
        Logout.innerText = "logout";                                    // Changement du contenu en "logout"

        // * Affichage : création du bouton "Modifier" pour la gestion des projets
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
    }
    AffichagePageConnexionReussie();

    // * Mise en marche du lien cliquable "Logout" de la barre de navigation (fonction SeDeconnecter)
    const logoutMenu = document.getElementById("menu-logout");
    logoutMenu.addEventListener("click", () => SeDeconnecter())

    function SeDeconnecter() {
        localStorage.removeItem("authToken");
        window.location.href = "index.html";
    }

    // * Mise en marche du lien cliquable "Modifier" pour la gestion des projets (fonction AffichagePremiereModale / contient l' ÉTAPE 3.2 et 3.4)
    ModifierProjets.addEventListener("click", () => AffichagePremiereModale())

    async function AffichagePremiereModale() { // (contient l' ÉTAPE 3.2 et une partie de l'ÉTAPE 3.4) 
        // Affichage de l'overlay et de la modale
        const overlay = document.getElementById("overlay");
        overlay.style.display = "flex";
        const modale = document.getElementById("modale");
        modale.style.display = "flex";

        // Suppression du formulaire de la seconde modale
        if (document.getElementById('form_modale')) {
            let form_modale = document.getElementById('form_modale');
            form_modale.remove();
        }

        // Suppression du bouton retour
        if (document.querySelector(".fa-arrow-left")) {
            document.querySelector(".fa-arrow-left").style.display = "none";
            modale_header.style.justifyContent = "flex-end";
        }

        // Changement du titre : Ajout photo => Galerie photo
        document.getElementById("modale_title_h3").innerText = "Galerie photo";

        // Bouton Valider redevient bouton Ajouter une photo
        if (document.getElementById("valider_button")) {
            const modale_button = document.getElementById("valider_button");
            modale_button.innerText = "Ajouter une photo";
            modale_button.removeEventListener("click", ValidationNouveauProjet);
            modale_button.addEventListener("click", AffichageSecondeModale);
            modale_button.classList = "";
            modale_button.id = "modale_button";
        }

        // ÉTAPE 3.2 : 𝘚𝘶𝘱𝘱𝘳𝘦𝘴𝘴𝘪𝘰𝘯 𝘥𝘦 𝘵𝘳𝘢𝘷𝘢𝘶𝘹 𝘦𝘹𝘪𝘴𝘵𝘢𝘯𝘵𝘴 (contient une partie de l'ÉTAPE 3.4)
        // Ajout de la fonctionnalité de suppression (fonction SuppressionDeProjets)
        function SuppressionDeProjets(projets) {
            // Suppression de l'affichage du contenu initial de la section projet de la modale
            let modale_main = document.getElementById("modale_main");
            modale_main.innerHTML = "";

            // Réaffichage de la section projet = ajout dynamiques des projets de la modale
            for (let i = 0; i < projets.length; i++) {

                const figureElement = document.createElement("figure");     // Création de la balise figure dédiée à un projet
                figureElement.id = "figure_" + `${projets[i].id}`;
                modale_main.appendChild(figureElement);

                const imageElement = document.createElement("img");         // Création de l’élément img
                imageElement.src = projets[i].imageUrl;                     // Configuration de la source de l’image avec l’indice i de la liste projets
                imageElement.id = "image_" + `${projets[i].id}`;
                figureElement.appendChild(imageElement);                    // Rattachement de l’image à figureElement (la balise figure)

                const trashDiv = document.createElement("div");             // Création de l’élément img
                trashDiv.className = "trash-div";
                trashDiv.id = "div_" + `${projets[i].id}`;
                trashDiv.innerHTML = '<i class="fa-solid fa-trash-can"></i>';   // Configuration de la source de l’image avec l’indice i de la liste projets
                figureElement.appendChild(trashDiv);

                modale_main.appendChild(figureElement);                         // Rattachement de la balise figure à la balise des projets (<div class="gallery">)

                // Ajout d'un écouteur d'évènement sur chaque icone de suppression des projets
                trashDiv.addEventListener("click", async () => {
                    try {
                        await fetch("http://localhost:5678/api/works/" + `${projets[i].id}`, {
                            method: "DELETE",
                            headers: {
                                "accept": "*/*",
                                "Authorization": `Bearer ${localStorage.getItem("authToken")}`
                            }
                        });
                        let figure_modale_suppr = document.getElementById("figure_" + `${projets[i].id}`);      // Sélection de la figure du projet supprimé
                        figure_modale_suppr.style.display = "none";                                             // Désaffichage de la figure du projet supprimé pour qu'il n'apparaisse plus dans la modale
                        projets.splice(i, 1);                                                                   // Suppression du projet sélectionné de la liste des projets en vue de sa mise à jour lors de la fermeture de la modale
                    }
                    catch (error) {
                        console.log(error);
                    }
                });
            }
        }
        SuppressionDeProjets(projets)
    }

    // * Mise en marche de la fermeture de la modale (fonction FermetureDesModales)
    const overlay = document.getElementById("overlay");
    overlay.addEventListener("click", () => FermetureDesModales());

    const modale_cross = document.querySelector(".fa-xmark");
    modale_cross.addEventListener("click", () => FermetureDesModales());

    function FermetureDesModales() {
        AffichagePremiereModale();                                  // Retour à la première modale en cas d'une éventuelle réouverture
        AffichageDynamiqueDesProjets(projets);                      // Garantir la mise à jour de la gallerie en cas d'ajout(s) ou de suppression(s) de projet(s)
        document.getElementById("overlay").style.display = "none";  // Désaffichage de 
        document.getElementById("modale").style.display = "none";
    }

    // * Mise en marche du lien cliquable "Ajouter une photo" pour l'ajout d'un projet (fonction AffichageSecondeModale et ValidationNouveauProjet / contient l'ÉTAPE 3.3 et 3.4)
    const modale_button = document.getElementById("modale_button");
    modale_button.addEventListener("click", AffichageSecondeModale)

    // ÉTAPE 3.3 : 𝘌𝘯𝘷𝘰𝘪 𝘥’𝘶𝘯 𝘯𝘰𝘶𝘷𝘦𝘢𝘶 𝘱𝘳𝘰𝘫𝘦𝘵 𝘢𝘶 𝘣𝘢𝘤𝘬-𝘦𝘯𝘥 𝘷𝘪𝘢 𝘭𝘦 𝘧𝘰𝘳𝘮𝘶𝘭𝘢𝘪𝘳𝘦 𝘥𝘦 𝘭𝘢 𝘮𝘰𝘥𝘢𝘭𝘦 (contient une partie de l'ÉTAPE 3.4)
    async function ValidationNouveauProjet() {
        let imgInput = null;
        if (window.photo) {
            imgInput = window.photo;
        }
        const titreInput = document.getElementById('titre');
        const categorieInput = document.getElementById('categorie');

        if (imgInput !== '' && titreInput.value !== '' && categorieInput.value !== '') {
            // Création du formulaire complet du nouveau projet pour envoyer notre requête API
            let form_data = new FormData();
            form_data.append("image", imgInput);
            form_data.append("title", titreInput.value);
            form_data.append("category", categorieInput.value);

            try {
                // Envoi de la requête de nouveau projet
                let response = await fetch("http://localhost:5678/api/works/", {
                    method: "POST",
                    headers: {
                        "accept": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
                    },
                    body: form_data
                });

                // Message de la console en cas de succès de l'ajout d'un projet
                const image_recue = await response.json();
                console.log("L'image a bien été téléchargé :", image_recue);

                // ÉTAPE 3.4 : 𝘛𝘳𝘢𝘪𝘵𝘦𝘮𝘦𝘯𝘵 𝘥𝘦 𝘭𝘢 𝘳𝘦́𝘱𝘰𝘯𝘴𝘦 𝘥𝘦 𝘭’𝘈𝘗𝘐 𝘱𝘰𝘶𝘳 𝘢𝘧𝘧𝘪𝘤𝘩𝘦𝘳 𝘥𝘺𝘯𝘢𝘮𝘪𝘲𝘶𝘦𝘮𝘦𝘯𝘵 𝘭𝘢 𝘯𝘰𝘶𝘷𝘦𝘭𝘭𝘦 𝘪𝘮𝘢𝘨𝘦 𝘥𝘦 𝘭𝘢 𝘮𝘰𝘥𝘢𝘭𝘦
                projets[projets.length] = image_recue;  // Ajout du nouveau projet à la suite de la liste des projets
                AffichagePremiereModale();              // MAJ de la gallerie des projets de la modale par réaffichage de la première modale
            }
            catch (error) {
                // Message de la console en cas d'échec de l'ajout d'un projet
                console.log(error);
            }
        }
    }

    async function AffichageSecondeModale() {
        // Suppression du contenu du modale_main
        let modale_main = document.getElementById("modale_main");
        modale_main.innerHTML = "";

        // Ajout de l'icone "Précédent"
        let modale_header = document.getElementById("modale_header");
        let previous_icon = document.createElement("i");
        previous_icon.id = "previous_icon";
        previous_icon.className = "fa-solid fa-arrow-left";
        modale_header.insertBefore(previous_icon, modale_header.firstChild)

        modale_header.style.justifyContent = "space-between";

        // Mise en marche du lien cliquable "Retour" pour revenir à la première modale (fonction RetourModalePrecedente)
        previous_icon.addEventListener("click", AffichagePremiereModale);

        // Changement du titre de la modale
        let titre = document.getElementById("modale_title_h3");
        titre.innerText = "Ajout photo";

        // Affichage du contenu du "modale_main" :
        // * 1ere partie : Chargement de la photo (encadré bleu)

        let form_modale = document.createElement("form");
        form_modale.id = "form_modale";

        let chargement_photo_div = document.createElement("div");
        chargement_photo_div.id = "chargement_photo_div";
        form_modale.appendChild(chargement_photo_div);

        let IconeImage = document.createElement("i");
        IconeImage.id = "IconeImage";
        IconeImage.className = "fa-regular fa-image";
        chargement_photo_div.appendChild(IconeImage);

        let AjouterPhotoDiv = document.createElement("div");
        AjouterPhotoDiv.id = "AjouterPhotoDiv";
        chargement_photo_div.appendChild(AjouterPhotoDiv);

        let AjouterPhotoBouton = document.createElement("p");
        AjouterPhotoBouton.id = "AjouterPhotoBouton";
        AjouterPhotoBouton.innerText = "+ Ajouter une photo";
        AjouterPhotoDiv.appendChild(AjouterPhotoBouton);

        let AjouterPhotoInput = document.createElement("input");
        AjouterPhotoInput.id = "AjouterPhotoInput";
        AjouterPhotoInput.type = "file";
        AjouterPhotoInput.accept = "image/png, image/jpeg, image/jpg";
        AjouterPhotoInput.required = true;
        AjouterPhotoDiv.appendChild(AjouterPhotoInput);

        let InfoTailleImage = document.createElement("p");
        InfoTailleImage.id = "InfoTailleImage";
        InfoTailleImage.innerText = "jpg,png : 4mo max";
        chargement_photo_div.appendChild(InfoTailleImage);

        // * 2ème partie : Titre de la photo
        let titre_label = document.createElement("label");
        titre_label.setAttribute('for', "titre");
        titre_label.innerText = "Titre";
        form_modale.appendChild(titre_label);

        let titre_input = document.createElement("input");
        titre_input.setAttribute('type', "text");
        titre_input.setAttribute('id', "titre");
        titre_input.setAttribute('name', "titre");
        titre_input.required = true;
        titre_input.className = "form_input";
        form_modale.appendChild(titre_input);

        // * 3ème partie : Menu déroulant de la catégorie de la photo
        let categorie_label = document.createElement("label");
        categorie_label.innerText = "Catégorie";
        form_modale.appendChild(categorie_label);

        let categorie_select = document.createElement("select");
        categorie_select.setAttribute('name', "categorie");
        categorie_select.setAttribute('id', "categorie");
        categorie_select.className = "form_input";
        categorie_select.required = true;
        form_modale.appendChild(categorie_select);

        let categorie_option_base = document.createElement("option");
        categorie_option_base.setAttribute('value', "");
        categorie_select.appendChild(categorie_option_base);

        for (let i = 0; i < categories.length; i++) {
            let categories_option = document.createElement("option");
            categories_option.setAttribute('value', categories[i].id);
            categories_option.innerText = categories[i].name;
            categorie_select.appendChild(categories_option);
        }

        modale_main.appendChild(form_modale);

        // Mise en marche du bouton "+ Ajouter une Photo" (aperçu de l'image ou message d'erreur)
        AjouterPhotoInput.addEventListener("change", () => {
            if (window.photo) {
                delete window.photo;
            }
            const photo = AjouterPhotoInput.files[0];
            if (photo.size <= 4000000) { //En réalité 4 * 1024 * 1024

                // Désaffichage des icônes
                IconeImage.style.display = "none";
                AjouterPhotoDiv.style.display = "none";
                AjouterPhotoBouton.style.display = "none";
                InfoTailleImage.style.display = "none";

                // Ajout de l'aperçu de l'image
                let reader = new FileReader();
                reader.readAsDataURL(photo)
                reader.addEventListener("load", () => {
                    chargement_photo_div.innerHTML = `<img id="ApercuImage" src=${reader.result} alt=""/>`;
                });
                window.photo = photo;                       // Sauvegarde de la variable "photo" en tant que variable globale
            }
            else {
                // Message d'erreur si le fichier est trop volumineux
                InfoTailleImage.innerText = "Merci de sélectionner un fichier de 4mo maximum.";
            }
        });

        // Changement du bouton principal : "Ajout photo" devient "Valider" 
        let valider_button = document.getElementById("modale_button");
        valider_button.removeEventListener("click", AffichageSecondeModale);
        valider_button.innerText = "Valider";
        valider_button.classList.add('gris');
        valider_button.id = "valider_button";

        //  Changement de couleur et mise en marche du bouton "Valider" (fonction MAJCouleurBoutonValider)
        const imgInput = document.getElementById('AjouterPhotoInput')
        const titreInput = document.getElementById('titre');
        const categoriesInput = document.getElementById('categorie');

        function MAJCouleurBoutonValider() {
            if (window.photo && titreInput.value !== '' && categoriesInput.value !== '') {
                valider_button.classList.remove('gris');
                valider_button.classList.add('vert');
                valider_button.addEventListener("click", ValidationNouveauProjet);
            } else {
                valider_button.classList.remove('vert');
                valider_button.classList.add('gris');
                valider_button.removeEventListener("click", ValidationNouveauProjet);
            }
        }

        imgInput.addEventListener('change', MAJCouleurBoutonValider);
        titreInput.addEventListener('input', MAJCouleurBoutonValider);
        categoriesInput.addEventListener('input', MAJCouleurBoutonValider);
    }
}
else {
    // Échec de la connexion =
    // * Affichage des boutons "Filtres"
    AffichageDesBoutonsFiltres(categories)

    // * MAJ éventuelle des projets
    AffichageDynamiqueDesProjets(projets)
}