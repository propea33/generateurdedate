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
    resultat.textContent = date.idee;

    // Ajouter la vidéo TikTok si disponible
    if (date.videoTikTok) {
        const videoId = date.videoTikTok.split('/video/')[1];
        videoContainer.innerHTML = `
            <blockquote class="tiktok-embed" cite="${date.videoTikTok}" data-video-id="${videoId}">
                <section> <a target="_blank" href="${date.videoTikTok}">Loading...</a> </section>
            </blockquote>
            <script async src="https://www.tiktok.com/embed.js"><\/script>
        `;
    } else {
        videoContainer.innerHTML = '';
    }
}

// Charger les dates au chargement de la page
chargerDates();

// Ajouter l'événement de clic au bouton
boutonGenerer.addEventListener('click', genererDate);
