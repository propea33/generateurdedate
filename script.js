const boutonGenerer = document.getElementById('generer');
const resultat = document.getElementById('resultat');
const ideeElement = document.getElementById('idee');
const descriptionElement = document.getElementById('description');
const videoContainer = document.getElementById('video-container');
const shareContainer = document.getElementById('share-container');
const shareFacebook = document.getElementById('share-facebook');
const shareEmail = document.getElementById('share-email');
let dates = [];
let currentDate = null;

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
    currentDate = dates[randomIndex];
    
    // Mettre à jour l'idée et la description
    ideeElement.textContent = currentDate.idee;
    descriptionElement.textContent = currentDate.description;

    // Ajouter la vidéo TikTok
    videoContainer.innerHTML = currentDate.videoTikTok;
    
    // Afficher les boutons de partage
    shareContainer.style.display = 'block';

    // Recharger le script TikTok pour s'assurer que la nouvelle vidéo est correctement intégrée
    const script = document.createElement('script');
    script.src = "https://www.tiktok.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
}

// Fonction pour partager sur Facebook
function partagerFacebook() {
    if (currentDate) {
        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent(`Découvrez cette super idée de date : ${currentDate.idee}`);
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`, '_blank');
    }
}

// Fonction pour partager par email
function partagerEmail() {
    if (currentDate) {
        const subject = encodeURIComponent("Idée de date intéressante");
        const body = encodeURIComponent(`Découvrez cette super idée de date :

Titre : ${currentDate.idee}

Description : ${currentDate.description}

Vidéo TikTok : ${extractTikTokLink(currentDate.videoTikTok)}`);
        
        window.location.href = `mailto:?subject=${subject}&body=${body}`;
    }
}

// Fonction pour extraire le lien TikTok de l'embed code
function extractTikTokLink(embedCode) {
    const citeMatch = embedCode.match(/cite="([^"]+)"/);
    if (citeMatch && citeMatch[1]) {
        return citeMatch[1];
    }
    const hrefMatch = embedCode.match(/href="([^"]+)"/);
    if (hrefMatch && hrefMatch[1]) {
        return hrefMatch[1];
    }
    return "Lien non disponible";
}

// Charger les dates au chargement de la page
chargerDates();

// Ajouter les événements de clic aux boutons
boutonGenerer.addEventListener('click', genererDate);
shareFacebook.addEventListener('click', partagerFacebook);
shareEmail.addEventListener('click', partagerEmail);
