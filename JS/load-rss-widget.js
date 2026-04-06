function loadRssWidget() {
    // HTML du widget

    /*C’est ma fonction principale qui initialise et affiche le widget RSS. */
    const widgetHTML = `
        <div id="rss-widget" class="rss-widget hidden" draggable="true">
            <img src="https://cdn-icons-png.flaticon.com/512/2504/2504935.png" 
alt="RSS Icon" id="rss-icon">
            <div id="rss-tooltip">
                <p>Suivez les dernières nouveautés</p>
                <ul>
                    <li><a href="https://techcrunch.com/category/gadgets/" target="_blank">Outils et technologies émergents</a></li>
                    <li><a href="https://sciencenews.org/" target="_blank">Innovations scientifiques</a></li>
                    <li><a href="https://krebsonsecurity.com/" target="_blank"> Veille en cybersécurité</a></li>
                    <li><a href=" https://www.techmeme.com/events" target="_blank">Événements et conférences</a></li>
                    
                </ul>
                <p>Mon Centre de formation</p>
                <ul>
                 <li><a href="https://lasalle-troyes.fr/formations/bts-services-informatiques-aux-organisations/" target="_blank">BTS SIO Saint-Joseph La Salle Troyes </a></li>  
                </ul>
                <p>Entreprise d'Accueil</p>
                <ul>
                
                    <li><a href="https://koesio.com/" target="_blank">Services numériques Koesio</a></li>
                    
                </ul>

                <p>Offres d'emploi et alternances</p>
                <ul>
                 
                    <li><a href="https://www.emploi-store.fr/rss/offres-emploi" target="_blank">Offres d’emploi et alternances</a></li>
                    <li><a href="https://openclassrooms.com/fr" target="_blank">Formations en informatique</a></li>
                   
                </ul>
            </div>
        </div>
    `;

    
    // CSS du widget

    /*pour Définir le style visuel et les animation de mon CSS*/
    const widgetCSS = `
       .rss-widget {
    position: fixed;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1000;
    text-align: left;
    cursor: grab;
    animation: fadeIn 1.5s ease-in-out;
    font-family: 'Arial', sans-serif;
}

/* Effet de grab */
.rss-widget:active {
    cursor: grabbing;
}

/* Icône RSS */
#rss-icon {
    width: 50px;
    height: 50px;
    border-radius: 15px;
    background: linear-gradient(135deg, #000055, #000055);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    margin-bottom: 10px;
    transition: transform 0.4s, filter 0.4s, box-shadow 0.4s;
}

/* Animation au survol */
#rss-icon:hover {
    transform: scale(1.2) rotate(15deg);
    filter: drop-shadow(0 0 15px #000055);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}

/* Titre RSS */
#rss-title {
    font-weight: bold;
    font-size: 18px;
    color: #007BFF;
    margin: 10px 0;
    text-align: left;
    text-transform: uppercase;
    letter-spacing: 1px;
    position: relative;
    display: inline-block;
}

/* Décoration du titre */
#rss-title::before {
    content: "";
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 40%;
    height: 3px;
    background: linear-gradient(135deg, #ff9800, #000055);
    transition: width 0.3s ease-in-out;
}

#rss-title:hover::before {
    width: 100%;
}

/* Tooltip RSS */
#rss-tooltip {
    display: none;
    position: absolute;
    left: 60px;
    top: 50%;
    transform: translateY(-50%);
    background: linear-gradient(135deg, #ffffff, #f9f9f9);
    border: 2px solid #ddd;
    border-radius: 12px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    padding: 20px;
    width: 350px;
    text-align: left;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.5s ease, transform 0.5s ease;
}

/* Texte du tooltip */
#rss-tooltip p {
    font-size: 16px;
    color: #5276ea;
    margin: 0 0 15px;
    font-weight: bold;
    text-align: left;
}

/* Liste des liens RSS */
#rss-tooltip ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
}

#rss-tooltip ul li {
    margin: 10px 0;
}

#rss-tooltip ul li a {
    text-decoration: none;
    color: #555;
    font-size: 14px;
    font-weight: 500;
    position: relative;
    transition: color 0.3s, text-shadow 0.3s, transform 0.3s ease;
}

/* Soulignement dynamique sur survol */
#rss-tooltip ul li a::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -2px;
    width: 0;
    height: 2px;
    background: #000055;
    transition: width 0.3s ease-in-out;
}

#rss-tooltip ul li a:hover::after {
    width: 100%;
}

#rss-tooltip ul li a:hover {
    color: #ff9800;
    text-shadow: 0 0 5px #ff9800;
    transform: translateX(5px);
}

/* Affichage du tooltip au survol */
#rss-icon:hover + #rss-tooltip,
#rss-tooltip:hover {
    display: block;
    opacity: 1;
    visibility: visible;
    transform: translateY(-50%) scale(1.02);
}

/* Animation du widget */
@keyframes fadeIn {
    0% {
        opacity: 0;
        transform: translateY(-50%) scale(0.8);
    }
    100% {
        opacity: 1;
        transform: translateY(-50%) scale(1);
    }
}

    `;

    // ceci permet d'Injecter le CSS dans chaque page
    const style = document.createElement("style");
    style.textContent = widgetCSS;
    document.head.appendChild(style);

    // pour Injecter le HTML du widget dans le body
    const container = document.createElement("div");
    container.innerHTML = widgetHTML;
    document.body.appendChild(container);

    // Afficher mon widget RSS après 3 secondes
    setTimeout(() => {
        const rssWidget = document.getElementById("rss-widget");
        if (rssWidget) {
            rssWidget.classList.remove("hidden");
            rssWidget.classList.add("visible");

            // ceci est la fonctionnalité qui permet le déplacement de l'icon
            enableDragAndDrop(rssWidget);
        }
    }, 3000);
}

// Fonction pour permettre le déplacement d'un élément

function enableDragAndDrop(element) {
    let isDragging = false;
    let offsetX, offsetY;
//La fonction enableDragAndDrop permet de déplacer le widget en le faisant glisser à l’aide de la souris.
    element.addEventListener("mousedown", (e) => {
        isDragging = true;
        offsetX = e.clientX - element.getBoundingClientRect().left;
        offsetY = e.clientY - element.getBoundingClientRect().top;
        element.style.cursor = "grabbing";
    });
 //Si l'utilisateur est en train de glisser, la position du widget est mise à jour en fonction des mouvements de la souris.
    document.addEventListener("mousemove", (e) => {
        if (isDragging) {
            const newX = e.clientX - offsetX;
            const newY = e.clientY - offsetY;

            // Mettre à jour la position de l'élément
            element.style.left = `${newX}px`;
            element.style.top = `${newY}px`;
        }
    });
// Quand la souris est relâchée je Désactive le mode "dragging
    document.addEventListener("mouseup", () => {
        isDragging = false;
        element.style.cursor = "grab";
    });
}

// Charger le widget après le chargement du document
document.addEventListener("DOMContentLoaded", loadRssWidget);
