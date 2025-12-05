/**
 * NIRD - Quiz Application
 * Numérique Inclusif Responsable Durable
 */

let currentQuestion = 1;
const totalQuestions = 2;
let answers = { niveau: null, objectif: null };

const conseilsData = {
    debutant: {
        icon: '🌱',
        text: 'Débutant(e)',
        conseils: [
            { title: 'Découvre ton impact', text: 'Savais-tu qu\'un email avec pièce jointe = 19g de CO2 ? Commence par prendre conscience de ton empreinte numérique.' },
            { title: 'Prolonge tes appareils', text: 'Un smartphone utilisé 4 ans au lieu de 2 divise son impact environnemental par deux.' },
            { title: 'Nettoie tes emails', text: 'Supprime régulièrement tes emails inutiles et désabonne-toi des newsletters non lues.' },
            { title: 'Éteins tes appareils', text: 'Éteindre plutôt que mettre en veille permet d\'économiser jusqu\'à 10% d\'énergie.' }
        ]
    },
    intermediaire: {
        icon: '🌿',
        text: 'Sensibilisé(e)',
        conseils: [
            { title: 'Optimise ton wifi', text: 'Privilégie le wifi à la 4G/5G : c\'est jusqu\'à 20 fois moins énergivore.' },
            { title: 'Compresse tes fichiers', text: 'Réduis la taille de tes images et documents avant de les envoyer ou stocker.' },
            { title: 'Limite le streaming HD', text: 'Regarder en qualité standard plutôt qu\'en 4K divise par 4 l\'empreinte carbone.' },
            { title: 'Pense reconditionné', text: 'Acheter un appareil reconditionné réduit l\'impact environnemental de 80%.' }
        ]
    },
    avance: {
        icon: '🌳',
        text: 'Engagé(e)',
        conseils: [
            { title: 'Hébergement vert', text: 'Choisis des hébergeurs utilisant des énergies renouvelables pour tes sites et données.' },
            { title: 'Mode sombre', text: 'Utilise le mode sombre sur les écrans OLED pour réduire la consommation d\'énergie.' },
            { title: 'Audite ton usage cloud', text: 'Fais le tri dans ton stockage cloud : chaque Go stocké consomme de l\'énergie.' },
            { title: 'Partage tes connaissances', text: 'Sensibilise ton entourage aux bonnes pratiques du numérique responsable.' }
        ]
    },
    expert: {
        icon: '🦋',
        text: 'Expert(e)',
        conseils: [
            { title: 'Éco-conception web', text: 'Applique les principes d\'éco-conception pour créer des sites légers et performants.' },
            { title: 'Mesure ton impact', text: 'Utilise des outils comme Website Carbon Calculator pour mesurer l\'impact de tes projets.' },
            { title: 'Influence positive', text: 'Deviens ambassadeur du numérique responsable dans ton organisation.' },
            { title: 'Innovation durable', text: 'Explore les technologies low-tech et les alternatives durables dans tes projets.' }
        ]
    }
};

const objectifsData = {
    'remise-forme': { icon: '📱', text: 'Réduire mon usage' },
    'amelioration': { icon: '♻️', text: 'Optimiser mes pratiques' },
    'performance': { icon: '🌍', text: 'Réduire mon empreinte' },
    'optimisation': { icon: '💡', text: 'Inspirer les autres' }
};

function initQuiz() { updateProgress(); }

function updateProgress() {
    const progressFill = document.getElementById('progressFill');
    const progressIndicator = document.getElementById('progressIndicator');
    if (progressFill && progressIndicator) {
        const percentage = ((currentQuestion - 1) / totalQuestions) * 100;
        progressFill.style.width = percentage + '%';
        progressIndicator.textContent = currentQuestion;
    }
}

function createStarBurst(x, y) {
    const stars = ['⭐', '✨', '🌟', '💫', '🦋'];
    const particleCount = 12;
    const ring = document.createElement('div');
    ring.className = 'ring-burst';
    ring.style.left = x + 'px';
    ring.style.top = y + 'px';
    document.body.appendChild(ring);
    setTimeout(() => ring.remove(), 600);
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'star-particle';
        particle.textContent = stars[Math.floor(Math.random() * stars.length)];
        const angle = (i / particleCount) * Math.PI * 2;
        const distance = 80 + Math.random() * 60;
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.setProperty('--tx', Math.cos(angle) * distance + 'px');
        particle.style.setProperty('--ty', Math.sin(angle) * distance + 'px');
        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 900);
    }
}

function selectAnswer(card, questionNumber, event) {
    const rect = card.getBoundingClientRect();
    const x = event ? event.clientX : rect.left + rect.width / 2;
    const y = event ? event.clientY : rect.top + rect.height / 2;
    createStarBurst(x, y);
    card.classList.add('sparkle');
    setTimeout(() => card.classList.remove('sparkle'), 500);
    card.parentElement.querySelectorAll('.answer-card').forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    const value = card.dataset.value;
    if (questionNumber === 1) answers.niveau = value;
    else if (questionNumber === 2) answers.objectif = value;
    setTimeout(() => {
        if (questionNumber < totalQuestions) goToNextQuestion();
        else showResults();
    }, 700);
}

function goToNextQuestion() {
    const currentSlide = document.getElementById('question' + currentQuestion);
    const nextSlide = document.getElementById('question' + (currentQuestion + 1));
    if (currentSlide && nextSlide) {
        currentSlide.classList.add('hidden');
        nextSlide.classList.remove('hidden');
        currentQuestion++;
        updateProgress();
    }
}

function showResults() {
    const question2 = document.getElementById('question2');
    const results = document.getElementById('results');
    const progressFill = document.getElementById('progressFill');
    if (question2 && results) {
        question2.classList.add('hidden');
        results.classList.remove('hidden');
        if (progressFill) progressFill.style.width = '100%';
        saveProfile();
        displayResultsSummary();
    }
}

function displayResultsSummary() {
    const summaryContainer = document.getElementById('resultsSummary');
    if (!summaryContainer) return;
    const niveau = conseilsData[answers.niveau];
    const objectif = objectifsData[answers.objectif];
    summaryContainer.innerHTML = `
        <div class="result-item">
            <span class="result-label">Ton niveau</span>
            <span class="result-value">${niveau.icon} ${niveau.text}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Ton objectif</span>
            <span class="result-value">${objectif.icon} ${objectif.text}</span>
        </div>
    `;
}

function saveProfile() {
    localStorage.setItem('sportProfil', JSON.stringify({
        niveau: answers.niveau,
        objectif: answers.objectif,
        date: new Date().toISOString()
    }));
}

function loadConseils() {
    const savedProfile = localStorage.getItem('sportProfil');
    if (!savedProfile) return;
    const profile = JSON.parse(savedProfile);
    const noProfile = document.getElementById('noProfile');
    const profileConseils = document.getElementById('profileConseils');
    if (noProfile && profileConseils) {
        noProfile.classList.add('hidden');
        profileConseils.classList.remove('hidden');
        const niveauData = conseilsData[profile.niveau];
        const objectifData = objectifsData[profile.objectif];
        document.getElementById('levelIcon').textContent = niveauData.icon;
        document.getElementById('levelText').textContent = niveauData.text;
        document.getElementById('goalIcon').textContent = objectifData.icon;
        document.getElementById('goalText').textContent = objectifData.text;
        document.getElementById('profileDescription').textContent =
            `Voici tes conseils en tant que ${niveauData.text.toLowerCase()} visant à ${objectifData.text.toLowerCase()} !`;
        niveauData.conseils.forEach((conseil, i) => {
            document.getElementById(`conseil${i + 1}Title`).textContent = conseil.title;
            document.getElementById(`conseil${i + 1}Text`).textContent = conseil.text;
        });
    }
}

document.addEventListener('DOMContentLoaded', function () {
    if (document.getElementById('question1')) initQuiz();
});
