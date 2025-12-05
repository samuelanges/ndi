/**
 * SPORT PROFIL - Quiz Application
 * Niveau 1: Profilage du Sportif
 */

// Quiz State
let currentQuestion = 1;
const totalQuestions = 2;
let answers = {
    niveau: null,
    objectif: null
};

// Data for conseils
const conseilsData = {
    debutant: {
        icon: '🌱',
        text: 'Débutant(e)',
        conseils: [
            { title: 'Commence doucement', text: 'Privilégie des séances courtes (20-30 min) pour habituer ton corps progressivement.' },
            { title: 'Établis une routine', text: 'Fixe-toi 2-3 séances par semaine à des horaires réguliers pour créer une habitude.' },
            { title: 'Écoute ton corps', text: 'Les courbatures sont normales au début, mais une douleur vive nécessite du repos.' },
            { title: 'Célèbre chaque victoire', text: 'Chaque séance réalisée est une réussite. Note tes progrès pour rester motivé(e) !' }
        ]
    },
    intermediaire: {
        icon: '🔥',
        text: 'Intermédiaire',
        conseils: [
            { title: 'Varie les exercices', text: 'Alterne entre cardio, renforcement et flexibilité pour un développement équilibré.' },
            { title: 'Augmente progressivement', text: 'Ajoute 10% d\'intensité ou de volume chaque semaine pour continuer à progresser.' },
            { title: 'Soigne ta récupération', text: 'Intègre des étirements et des jours de repos actif pour optimiser tes résultats.' },
            { title: 'Fixe des objectifs SMART', text: 'Des objectifs Spécifiques, Mesurables, Atteignables, Réalistes et Temporels te guideront.' }
        ]
    },
    avance: {
        icon: '💪',
        text: 'Avancé(e)',
        conseils: [
            { title: 'Périodise ton entraînement', text: 'Alterne entre phases d\'intensité et de récupération pour éviter le surentraînement.' },
            { title: 'Travaille tes points faibles', text: 'Identifie et cible spécifiquement les zones à améliorer dans ta pratique.' },
            { title: 'Optimise ta nutrition', text: 'Adapte ton alimentation à tes entraînements : protéines, glucides, hydratation.' },
            { title: 'Analyse tes performances', text: 'Utilise des outils de suivi pour mesurer tes progrès et ajuster ton approche.' }
        ]
    },
    expert: {
        icon: '🏆',
        text: 'Expert(e)',
        conseils: [
            { title: 'Planifie sur le long terme', text: 'Établis un plan annuel avec des objectifs de compétition et des pics de forme.' },
            { title: 'Récupération avancée', text: 'Intègre cryothérapie, massages, et sommeil optimisé dans ta routine.' },
            { title: 'Mental de champion', text: 'Travaille la visualisation et la gestion du stress pour performer le jour J.' },
            { title: 'Entoure-toi d\'experts', text: 'Coach, nutritionniste, kiné : une équipe pluridisciplinaire pour aller plus loin.' }
        ]
    }
};

const objectifsData = {
    'remise-forme': { icon: '🧘', text: 'Remise en forme légère' },
    'amelioration': { icon: '📈', text: 'Amélioration générale' },
    'performance': { icon: '⚡', text: 'Performance physique' },
    'optimisation': { icon: '🎯', text: 'Optimisation / Compétition' }
};

/**
 * Initialize the quiz
 */
function initQuiz() {
    updateProgress();
}

/**
 * Update progress bar
 */
function updateProgress() {
    const progressFill = document.getElementById('progressFill');
    const progressIndicator = document.getElementById('progressIndicator');

    if (progressFill && progressIndicator) {
        const percentage = ((currentQuestion - 1) / totalQuestions) * 100;
        progressFill.style.width = percentage + '%';
        progressIndicator.textContent = currentQuestion;
    }
}

/**
 * Create star particle effect
 */
function createStarBurst(x, y) {
    const stars = ['⭐', '✨', '🌟', '💫', '⚡'];
    const colors = ['#ffc800', '#ff9eb4', '#1cb0f6', '#ce82ff', '#58cc02'];
    const particleCount = 12;

    // Create ring burst
    const ring = document.createElement('div');
    ring.className = 'ring-burst';
    ring.style.left = x + 'px';
    ring.style.top = y + 'px';
    document.body.appendChild(ring);

    // Remove ring after animation
    setTimeout(() => ring.remove(), 600);

    // Create star particles
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'star-particle';
        particle.textContent = stars[Math.floor(Math.random() * stars.length)];

        // Calculate angle for even distribution
        const angle = (i / particleCount) * Math.PI * 2;
        const distance = 80 + Math.random() * 60;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;

        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.setProperty('--tx', tx + 'px');
        particle.style.setProperty('--ty', ty + 'px');
        particle.style.animationDelay = (Math.random() * 0.1) + 's';

        document.body.appendChild(particle);

        // Remove particle after animation
        setTimeout(() => particle.remove(), 900);
    }
}

/**
 * Select an answer
 */
function selectAnswer(card, questionNumber, event) {
    // Get click position for star effect
    const rect = card.getBoundingClientRect();
    const x = event ? event.clientX : rect.left + rect.width / 2;
    const y = event ? event.clientY : rect.top + rect.height / 2;

    // Create star burst effect
    createStarBurst(x, y);

    // Add sparkle effect to card
    card.classList.add('sparkle');
    setTimeout(() => card.classList.remove('sparkle'), 500);

    // Remove previous selection
    const cards = card.parentElement.querySelectorAll('.answer-card');
    cards.forEach(c => c.classList.remove('selected'));

    // Add selection to current card
    card.classList.add('selected');

    // Store answer
    const value = card.dataset.value;
    if (questionNumber === 1) {
        answers.niveau = value;
    } else if (questionNumber === 2) {
        answers.objectif = value;
    }

    // Animate and go to next question after delay
    setTimeout(() => {
        if (questionNumber < totalQuestions) {
            goToNextQuestion();
        } else {
            showResults();
        }
    }, 700);
}

/**
 * Go to next question
 */
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

/**
 * Show results
 */
function showResults() {
    const question2 = document.getElementById('question2');
    const results = document.getElementById('results');
    const progressFill = document.getElementById('progressFill');

    if (question2 && results) {
        question2.classList.add('hidden');
        results.classList.remove('hidden');

        // Complete progress bar
        if (progressFill) {
            progressFill.style.width = '100%';
        }

        // Save to localStorage
        saveProfile();

        // Display summary
        displayResultsSummary();
    }
}

/**
 * Display results summary
 */
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

/**
 * Save profile to localStorage
 */
function saveProfile() {
    const profile = {
        niveau: answers.niveau,
        objectif: answers.objectif,
        date: new Date().toISOString()
    };
    localStorage.setItem('sportProfil', JSON.stringify(profile));
}

/**
 * Load conseils based on saved profile
 */
function loadConseils() {
    const savedProfile = localStorage.getItem('sportProfil');

    if (!savedProfile) {
        // No profile, show the no-profile message
        return;
    }

    const profile = JSON.parse(savedProfile);
    const noProfile = document.getElementById('noProfile');
    const profileConseils = document.getElementById('profileConseils');

    if (noProfile && profileConseils) {
        noProfile.classList.add('hidden');
        profileConseils.classList.remove('hidden');

        // Update profile display
        const niveauData = conseilsData[profile.niveau];
        const objectifData = objectifsData[profile.objectif];

        document.getElementById('levelIcon').textContent = niveauData.icon;
        document.getElementById('levelText').textContent = niveauData.text;
        document.getElementById('goalIcon').textContent = objectifData.icon;
        document.getElementById('goalText').textContent = objectifData.text;

        // Update subtitle
        document.getElementById('profileDescription').textContent =
            `Voici tes conseils personnalisés en tant que ${niveauData.text.toLowerCase()} visant ${objectifData.text.toLowerCase()} !`;

        // Display conseils
        const conseils = niveauData.conseils;
        for (let i = 0; i < conseils.length; i++) {
            document.getElementById(`conseil${i + 1}Title`).textContent = conseils[i].title;
            document.getElementById(`conseil${i + 1}Text`).textContent = conseils[i].text;
        }
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function () {
    // Check if we're on the questionnaire page
    if (document.getElementById('question1')) {
        initQuiz();
    }
});
