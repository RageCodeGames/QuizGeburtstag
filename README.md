# 🇮🇸 Island Quiz App - Setup Guide

## ✅ Was du hast:

- `index.html` - Hauptseite
- `style.css` - Design
- `app.js` - Logik
- `manifest.json` - PWA Config

## 🔧 WICHTIG - Vor dem Deployment:

### 1. In `app.js` ändern:

**Zeile 47:** Ihren Namen eintragen
```javascript
answer: 'HIER_IHREN_NAMEN_EINTRAGEN',
```

**Zeile 307:** Dein Illusion Diffusion Link
```javascript
const qrData = 'HIER_DEIN_ILLUSION_DIFFUSION_LINK';
```

### 2. Fragen ergänzen (Zeile 18-40 in app.js):

Aktuell sind nur 5 Beispiel-Fragen drin. Du brauchst 17 insgesamt!

Format:
```javascript
{
    id: 6,
    unlockDate: '2025-01-26', // YYYY-MM-DD
    question: 'Deine Frage hier?',
    answer: 'Richtige Antwort',
    caseSensitive: false
}
```

### 3. Daten anpassen:

Alle Sonntage von 29.12.2025 bis 20.04.2026:
- 29.12.2025
- 05.01.2026
- 12.01.2026
- 19.01.2026
- 26.01.2026
- 02.02.2026
- 09.02.2026
- 16.02.2026
- 23.02.2026
- 02.03.2026
- 09.03.2026
- 16.03.2026
- 23.03.2026
- 30.03.2026
- 06.04.2026
- 13.04.2026
- 20.04.2026

## 🚀 Deployment auf GitHub Pages:

### Schritt 1: GitHub Account erstellen
- Gehe zu github.com
- Registriere dich (kostenlos)

### Schritt 2: Repository erstellen
- Klicke auf "New Repository"
- Name: `iceland-quiz` (oder beliebig)
- Public (kostenlos)
- Create Repository

### Schritt 3: Files hochladen
- Klicke "uploading an existing file"
- Ziehe alle 4 Dateien rein
- Commit changes

### Schritt 4: GitHub Pages aktivieren
- Settings → Pages
- Source: main branch
- Save
- URL erscheint: `https://deinusername.github.io/iceland-quiz/`

### Schritt 5: Link an sie schicken
- Sie öffnet Link auf iPhone
- Safari: Teilen → "Zum Home-Bildschirm"
- Fertig! 🎉

## 📱 Testen:

1. Öffne `index.html` in Chrome
2. F12 → Console
3. Ändere Datum temporär zum Testen:
```javascript
// In app.js, Zeile 99 ersetzen durch:
function getCurrentDate() {
    return '2024-12-24'; // Test-Datum
}
```

## 🎨 Icon erstellen (optional):

Brauchst du ein App-Icon (192x192 und 512x512)?
- Canva.com (kostenlos)
- Emoji + Text "🌍 Quiz"
- Export als PNG

## 🐛 Debugging:

Falls etwas nicht funktioniert:
- F12 → Console (zeigt Fehler)
- Application Tab → Local Storage (zeigt gespeicherte Daten)
- Clear Site Data (zum Reset)

## ⚡ Quick Commands (VS Code):

- `Ctrl + Shift + P` → "Live Server" → Start
- Öffnet App im Browser mit Auto-Reload

---

**Bei Fragen: Einfach fragen! 🚀**
