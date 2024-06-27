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


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// ÉTAPE 1.2 : RECUPERATION DES TRAVAUX DEPUIS LE BACK-END
// Récupération de la liste des categories depuis l'API
const reponse_cat = await fetch("http://localhost:5678/api/categories");
const categories = await reponse_cat.json();

// Création de la fonction de filtre par catégorie
function filtrerParCatégories(nom_de_la_categorie) {
    const projetsFiltrés = projets.filter(projets => projets.category.name === nom_de_la_categorie);
    genererProjets(projetsFiltrés);
}

// Création de la fonction de génération et d'affichage de la barre des filtres
function genererBoutonsFiltres(categories) {
    const categoriesList = document.createElement("ul");                        // Création de la balise ul qui contiendra les balises li (boutons Filtre)
    categoriesList.id = "filter-bar";

    const boutonElement = document.createElement("li");                         // Création de la balise li dédiée à un filtre
    boutonElement.innerText = "Tous";                                           // Configuration du bouton filtre "Tous"
    boutonElement.className = "button-filter";                                  // Configuration du nom du bouton filtre avec l’indice i de la liste categories
    boutonElement.id = "Tous"                                                   // Configuration de son id
    boutonElement.addEventListener("click", () => genererProjets(projets));     // Affichage de l'intégralité des projets lors du clic sur le bouton filtre "Tous"
    categoriesList.appendChild(boutonElement);                                  // Rattachement de la balise li à la balise de la liste des filtres (ul)

    for (let i = 0; i < categories.length; i++) {
        const boutonElement = document.createElement("li");                     // Création de la balise li dédiée à un filtre
        boutonElement.innerText = categories[i].name;                           // Configuration du nom du bouton filtre avec l’indice i de la liste categories
        boutonElement.className = "button-filter";                              // Configuration du nom de la classe du bouton filtre précédé de la mention "button-filter"
        boutonElement.id = categories[i].name;                                 // Configuration de son id
        boutonElement.addEventListener("click", () => filtrerParCatégories(categories[i].name));    // Affichage des projets filtrés lors du clic sur le bouton filtre correspondant
        categoriesList.appendChild(boutonElement);                              // Rattachement de la balise li à la balise de la liste des filtres (ul)
    }

    let portfolioSection = document.getElementById("portfolio");                // Rattachement de la balise ul à la balise des projets
    portfolioSection.insertBefore(categoriesList, portfolioSection.children[1]);// Placement des filtres avant la liste des projets                        
}
genererBoutonsFiltres(categories)

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// ÉTAPE 2.1 :  INTÉGRATION DU DESIGN DE LA PAGE DE FORMULAIRE
// Création de la fonction d'affichage de la page "Login"
function affichageLogin() {
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

    // Ajout de la fonction listener lors du clic sur le bouton "Login"
    ajoutListenerLogin()
}

// Mise en marche du lien cliquable "Login" de la barre de navigation
const loginMenu = document.getElementById("menu-login");
loginMenu.addEventListener("click", () => affichageLogin())

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// ÉTAPE 2.2 :  AUTHENTIFICATION DE L’UTILISATEUR
// Création de la fonction de connexion "ajoutListenerLogin"
function ajoutListenerLogin(sauvegardeMain) {
    const formulaireLogin = document.getElementById("form-login");          // Recherche du formulaire de connexion
    formulaireLogin.addEventListener("submit", function (event) {           // Définition de la fonction à appeler lors du clic sur le bouton "Se connecter"
        event.preventDefault();                                             // Empeche la page de se rafraichir lors du clic sur le bouton submit ("Se connecter")
        const IdPwLogin = {                                                 // Récupération des valeurs rentrés pour l'email et le mot de passe
            "email": document.getElementById("email-input").value,
            "password": document.getElementById("password-input").value
        }

        // Création de la charge utile au format JSON
        const chargeUtile = JSON.stringify(IdPwLogin);
        console.log(chargeUtile);

        try {
            fetch("http://localhost:5678/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: chargeUtile
            });
            localStorage.setItem("modificationsAppliquees", "true");
            window.location.href = "index.html";

            if (localStorage.getItem("modificationsAppliquees") === "true") {
                // Suppression de l'affichage du login
                document.getElementById("div-login").style.display = "none";

                // Retructuration du header existant
                const header = document.querySelector("header");
                header.id = "headerEdition";

                const EditionModeBar = document.createElement("div");   // Création de la balise <div> contenant le bandeau
                EditionModeBar.id = "EditionModeBar";
                header.insertBefore(EditionModeBar, header.firstChild); // Insertion de la première balise <div> dans le header

                const HeaderSecondDiv = document.createElement("div");  // Création de la balise <div> contenant le titre et la barre de navigation
                HeaderSecondDiv.id = "HeaderSecondDiv";
                const h1Element = document.querySelector("h1");
                const navElement = document.querySelector("nav");
                HeaderSecondDiv.appendChild(h1Element);                 // Insertion du titre dans la seconde balise
                HeaderSecondDiv.appendChild(navElement);                // Insertion de la barre de navigation dans la seconde balise
                header.appendChild(HeaderSecondDiv);                    // Insertion de la seconde balise dans le header

                // Création et intégration du bandeau 
                const EditionModeBarText = document.createElement("p"); // Ajout d'un paragraphe pour afficher le texte "Mode édition" 
                EditionModeBarText.id = "EditionModeBarText";
                EditionModeBarText.innerText = '<i class="fa-solid fa-pen-to-square"></i> Mode édition';
                EditionModeBar.appendChild(EditionModeBarText);         // Ajout du paragraphe dans la balise <div> du headers


                // Réinitialiser l'indicateur pour éviter la répétition
                localStorage.removeItem("modificationsAppliquees");
            }

        } catch (error) {
            let errorLoginMessage = document.getElementById("errorLoginMessage");
            if (!errorLoginMessage) {
                localStorage.setItem("modificationsAppliquees", "false");

                const errorLoginMessage = document.createElement("p");
                errorLoginMessage.id = "errorLoginMessage";
                errorLoginMessage.innerText = "Erreur dans l’identifiant ou le mot de passe";
                const formElement = document.getElementById("form-login");
                formElement.insertBefore(errorLoginMessage, formElement.lastChild);
            }
            console.log(error);
        }
    });
}
