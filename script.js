const boutonGenerer = document.getElementById('generer');
const resultat = document.getElementById('resultat');
const videoContainer = document.getElementById('video-container');
let dates = [];

// Fonction pour charger le fichier JSON
async function chargerDates() {
    try {
        const response = await fetch('dates.json');
        const data = await response.json();
        dates = data.dates;
    } catch (error) {
        console.error('Erreur lors du chargement des dates:', error);
        resultat.textContent = 'Erreur lors du chargement des dates. Veuillez réessayer.';
    }
}

// Fonction pour générer une date aléatoire
function genererDate() {
    if (dates.length === 0) {
        resultat.textContent = 'Aucune date disponible. Veuillez réessayer.';
        return;
    }

    const randomIndex = Math.floor(Math.random() * dates.length);
    const date = dates[randomIndex];
    
    // Créer un élément pour la description
    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = date.description;
    descriptionElement.style.marginBottom = '20px';
    
    // Vider le contenu précédent
    resultat.innerHTML = '';
    videoContainer.innerHTML = '';
    
    // Ajouter l'idée et la description
    resultat.textContent = date.idee;
    resultat.appendChild(descriptionElement);

    // Ajouter la vidéo TikTok
    videoContainer.innerHTML = date.videoTikTok;
    
    // Recharger le script TikTok pour s'assurer que la nouvelle vidéo est correctement intégrée
    const script = document.createElement('script');
    script.src = "https://www.tiktok.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
}

// Charger les dates au chargement de la page
chargerDates();

// Ajouter l'événement de clic au bouton
boutonGenerer.addEventListener('click', genererDate);
