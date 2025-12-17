// ==========================================
// ICELAND QUIZ APP - Hauptlogik
// ==========================================

// FRAGEN-DATENBANK
// Format: { unlockDate: 'YYYY-MM-DD', question: '', answer: '', caseSensitive: false }
const questions = [
    {
        id: 1,
        unlockDate: '2025-12-24', // Heiligabend - erste Frage
        question: 'Wo versteckt sich dein Weihnachtsgeschenk? Tipp: Es ist im Hotelzimmer',
        answer: 'Koffer',
        caseSensitive: false
    },
    {
        id: 2,
        unlockDate: '2025-12-28', // Erster Sonntag nach Weihnachten
        question: 'In welchem Monat hast du Geburtstag?',
        answer: 'April',
        caseSensitive: false
    },
    {
        id: 3,
        unlockDate: '2026-01-04',
        question: 'Wie viele Puzzleteile hatte dein Weihnachtsgeschenk?',
        answer: '1000',
        caseSensitive: false
    },
    {
        id: 4,
        unlockDate: '2026-01-11',
        question: 'In welchem Land haben wir geheiratet?',
        answer: 'Thailand',
        caseSensitive: false
    },
    {
        id: 5,
        unlockDate: '2026-01-18',
        question: 'Welche Insel haben wir zuletzt bereist?',
        answer: 'Malta',
        caseSensitive: false
    },
    {
        id: 6,
        unlockDate: '2026-01-25',
        question: 'Welcher Ort in Thailand gefällt dir am besten?',
        answer: 'Koh Samui',
        caseSensitive: false
    },
    {
        id: 7,
        unlockDate: '2026-02-01',
        question: 'Halte durch, ist nicht mehr lange :P, Wie gehts dir heute?',
        answer: 'Gut',
        caseSensitive: false
    },
    {
        id: 8,
        unlockDate: '2026-02-08',
        question: '"Ne, da hab ich jetzt keinen Bock mehr drauf.." Von wem stammt diese legendäre Aussage?',
        answer: 'Ruby',
        caseSensitive: false
    },
        {
        id: 9,
        unlockDate: '2026-02-15',
        question: 'Was ist dein Hobby, außer Reisen und Serien schauen?',
        answer: 'Lesen',
        caseSensitive: false
    },
    {
        id: 10,
        unlockDate: '2026-02-22',
        question: 'Was ist die Hauptstadt von Norwegen?',
        answer: 'Oslo',
        caseSensitive: false
    },
    {
        id: 11,
        unlockDate: '2026-03-01',
        question: 'Welcher Ozean liegt zwischen Europa und Amerika?',
        answer: 'Atlantik',
        caseSensitive: false
    },
    {
        id: 12,
        unlockDate: '2026-03-08',
        question: 'Was hast du zum Valentistag bekommen?',
        answer: 'Socken',
        caseSensitive: false
    },
    {
        id: 13,
        unlockDate: '2026-03-15',
        question: 'Was war deine erste Vermutung wohin die Reise an deinem Geburtstag geht?',
        answer: 'Norwegen',
        caseSensitive: false
    },
    {
        id: 14,
        unlockDate: '2026-03-22',
        question: 'Welches Land ist bekannt für IKEA und Köttbullar?',
        answer: 'Schweden',
        caseSensitive: false
    },
    {
        id: 15,
        unlockDate: '2026-03-29',
        question: 'In welchem Land liegt die Stadt Dublin?',
        answer: 'Irland',
        caseSensitive: false
    },
    {
        id: 16,
        unlockDate: '2026-04-05',
        question: 'Wie viele Stunden hat eine Woche?',
        answer: '168',
        caseSensitive: false
    },
    {
        id: 17,
        unlockDate: '2026-04-12',
        question: 'Welcher Wochentag ist heute?',
        answer: 'Sonntag',
        caseSensitive: false
    },
    {
        id: 18,
        unlockDate: '2026-04-19',
        question: 'Bist du aufgeregt?',
        answer: 'Ja',
        caseSensitive: false
    },

];

// Finale Fragen (am Flughafen)
const finalQuestion = {
    id: 19,
    unlockDate: '2026-04-25', // Abreisetag
    question: 'Vorletzte Station: Wo sind wir gerade?',
    answer: 'Flughafen',
    caseSensitive: false
};

const ultimateFinalQuestion = {
    id: 20,
    question: 'Wer hat heute Geburtstag? 🎂',
    answer: 'Ruby', // <-- ÄNDERE DAS!
    caseSensitive: false
};

// ==========================================
// STATE MANAGEMENT
// ==========================================

class QuizState {
    constructor() {
        this.loadState();
    }

    loadState() {
        const saved = localStorage.getItem('icelandQuizState');
        if (saved) {
            const state = JSON.parse(saved);
            this.answeredQuestions = state.answeredQuestions || [];
            this.binaryData = state.binaryData || '';
            this.currentQuestionIndex = state.currentQuestionIndex || 0;
        } else {
            this.answeredQuestions = [];
            this.binaryData = '';
            this.currentQuestionIndex = 0;
        }
    }

    saveState() {
        localStorage.setItem('icelandQuizState', JSON.stringify({
            answeredQuestions: this.answeredQuestions,
            binaryData: this.binaryData,
            currentQuestionIndex: this.currentQuestionIndex
        }));
    }

    markAnswered(questionId, answer) {
        this.answeredQuestions.push(questionId);
        this.addBinaryData(answer);
        this.currentQuestionIndex++;
        this.saveState();
    }

    addBinaryData(text) {
        const binary = this.textToBinary(text);
        this.binaryData += binary;
        this.saveState();
    }

    textToBinary(text) {
        return text.split('').map(char => {
            return char.charCodeAt(0).toString(2).padStart(8, '0');
        }).join('');
    }

    isQuestionAnswered(questionId) {
        return this.answeredQuestions.includes(questionId);
    }

    getProgress() {
        return {
            answered: this.answeredQuestions.length,
            total: questions.length
        };
    }
}

const state = new QuizState();

// ==========================================
// DATUM & ZEIT LOGIK
// ==========================================

function getCurrentDate() {
    const now = new Date();
    return now.toISOString().split('T')[0]; // YYYY-MM-DD
}

function isQuestionUnlocked(unlockDate) {
    const current = new Date(getCurrentDate());
    const unlock = new Date(unlockDate);
    return current >= unlock;
}

function getNextUnlockDate() {
    for (let q of questions) {
        if (!state.isQuestionAnswered(q.id) && !isQuestionUnlocked(q.unlockDate)) {
            return q.unlockDate;
        }
    }
    return null;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

function getTimeUntilUnlock(unlockDate) {
    const now = new Date();
    const unlock = new Date(unlockDate + 'T00:00:00');
    const diff = unlock - now;

    if (diff <= 0) return 'Jetzt verfügbar!';

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return `${days}d ${hours}h ${minutes}m`;
}

// ==========================================
// UI UPDATE FUNKTIONEN
// ==========================================

function updateProgressBar() {
    const progress = state.getProgress();
    const percentage = (progress.answered / progress.total) * 100;
    
    document.getElementById('progressBar').style.width = percentage + '%';
    document.getElementById('progressText').textContent = 
        `${progress.answered}/18 Teile gesammelt`;
}

function getCurrentQuestion() {
    // Finde die erste unbeantwortete Frage
    for (let q of questions) {
        if (!state.isQuestionAnswered(q.id)) {
            return q;
        }
    }
    
    // Alle normalen Fragen beantwortet - zeige finale Fragen
    if (!state.isQuestionAnswered(finalQuestion.id)) {
        return finalQuestion;
    }
    
    if (!state.isQuestionAnswered(ultimateFinalQuestion.id)) {
        return ultimateFinalQuestion;
    }
    
    return null; // Alles fertig!
}

function displayQuestion(question) {
    const quizSection = document.getElementById('quizSection');
    const lockedMessage = document.getElementById('lockedMessage');
    
    if (!isQuestionUnlocked(question.unlockDate)) {
        // Frage ist noch gesperrt
        quizSection.querySelector('.question-card').style.display = 'none';
        lockedMessage.style.display = 'block';
        
        document.getElementById('nextDate').textContent = formatDate(question.unlockDate);
        startCountdown(question.unlockDate);
    } else {
        // Frage ist freigeschaltet
        quizSection.querySelector('.question-card').style.display = 'block';
        lockedMessage.style.display = 'none';
        
        document.getElementById('questionNumber').textContent = `Frage ${question.id}`;
        document.getElementById('questionText').textContent = question.question;
        document.getElementById('answerInput').value = '';
        document.getElementById('message').style.display = 'none';
    }
}

function startCountdown(unlockDate) {
    const countdownEl = document.getElementById('countdown');
    
    function update() {
        countdownEl.textContent = getTimeUntilUnlock(unlockDate);
    }
    
    update();
    setInterval(update, 60000); // Update jede Minute
}

function showMessage(text, type) {
    const messageEl = document.getElementById('message');
    messageEl.textContent = text;
    messageEl.className = 'message ' + type;
    messageEl.style.display = 'block';
}

function checkAnswer() {
    const question = getCurrentQuestion();
    if (!question) return;
    
    const userAnswer = document.getElementById('answerInput').value.trim();
    const correctAnswer = question.answer;
    
    const isCorrect = question.caseSensitive 
        ? userAnswer === correctAnswer
        : userAnswer.toLowerCase() === correctAnswer.toLowerCase();
    
    if (isCorrect) {
        // Richtige Antwort!
        showMessage('✓ Richtig! Daten werden hinzugefügt...', 'success');
        
        // Binärdaten anzeigen (kurz)
        const binary = state.textToBinary(userAnswer);
        setTimeout(() => {
            showMessage(`Deine Bits: ${binary.substring(0, 50)}... wurden hinzugefügt!`, 'success');
        }, 1000);
        
        // State updaten
        state.markAnswered(question.id, userAnswer);
        updateProgressBar();
        
        // Nächste Frage nach 3 Sekunden
        setTimeout(() => {
            checkCompletion();
        }, 3000);
        
    } else {
        showMessage('✗ Leider falsch. Versuch es nochmal!', 'error');
    }
}

function checkCompletion() {
    const progress = state.getProgress();
    
    if (progress.answered === questions.length) {
        // Alle normalen Fragen beantwortet - zeige Binärcode
        showBinaryData();
    }
    
    if (state.isQuestionAnswered(finalQuestion.id)) {
        // Nach finaler Frage - zeige Ultimate Final Question
        displayQuestion(ultimateFinalQuestion);
    }
    
    if (state.isQuestionAnswered(ultimateFinalQuestion.id)) {
        // ALLES FERTIG - QR CODE ANIMATION!
        showQRAnimation();
    } else {
        // Lade nächste Frage
        const nextQ = getCurrentQuestion();
        if (nextQ) {
            displayQuestion(nextQ);
        }
    }
}

function showBinaryData() {
    const binarySection = document.getElementById('binarySection');
    const binaryDisplay = document.getElementById('binaryDisplay');
    
    binaryDisplay.textContent = state.binaryData;
    binarySection.style.display = 'block';
    
    // Scroll zu Binary Section
    binarySection.scrollIntoView({ behavior: 'smooth' });
}

async function showQRAnimation() {
    const quizSection = document.getElementById('quizSection');
    const binarySection = document.getElementById('binarySection');
    const qrSection = document.getElementById('qrSection');
    
    // Hide quiz & binary
    quizSection.style.display = 'none';
    
    // Animate binary → QR
    binarySection.querySelector('h3').textContent = '⚡ Konvertiere Daten...';
    
    await sleep(2000);
    
    // Generate QR Code
    const qrData = 'https://imgur.com/ONB00d9';
    generateQRCode(qrData);
    
    // Hide binary, show QR
    binarySection.style.display = 'none';
    qrSection.style.display = 'block';
    qrSection.scrollIntoView({ behavior: 'smooth' });
}

function generateQRCode(data) {
    const qrContainer = document.getElementById('qrCanvas');
    qrContainer.innerHTML = ''; // Clear previous
    
    new QRCode(qrContainer, {
        text: data,
        width: 256,
        height: 256,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// ==========================================
// EVENT LISTENERS
// ==========================================

document.getElementById('submitBtn').addEventListener('click', checkAnswer);

document.getElementById('answerInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkAnswer();
    }
});

// ==========================================
// INITIALIZATION
// ==========================================

function init() {
    updateProgressBar();
    
    const currentQ = getCurrentQuestion();
    if (currentQ) {
        displayQuestion(currentQ);
    } else {
        // Alles fertig!
        showQRAnimation();
    }
}

// Start app
init();

// DEBUG: Uncomment für Testing
// console.log('Current State:', state);
// console.log('Current Date:', getCurrentDate());
