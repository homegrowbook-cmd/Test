# 🎭 Demo Mode - UI ohne Backend testen

## Überblick

Der **Demo Mode** ermöglicht es, die komplette homegrowbook UI zu erkunden und zu testen, **ohne einen Backend-Server zu benötigen**. Dies ist perfekt für:

- 🎨 UI/UX Testing und Feedback
- 🚀 Schnelles Ausprobieren der Platform
- 📱 Präsentationen und Demos
- 🧪 Frontend-Entwicklung ohne Backend-Abhängigkeit

## 🌐 Live Demo

Die Demo ist verfügbar unter:
**https://homegrowbook-cmd.github.io/Test/**

## 🔐 Demo Login

Auf der Login-Seite findest du drei Demo-Benutzer:

### Demo-Accounts

| Emoji | Name | Username | Beschreibung |
|-------|------|----------|--------------|
| 👩‍🌾 | Alice | `alice_grower` | Passionierte Indoor-Growerin mit 5 Jahren Erfahrung |
| 👨‍🌾 | Bob | `bob_cultivator` | Organischer Grower, liebt Experimente mit Strains |
| 🌿 | Charlie | `charlie_green` | Hydroponik-Spezialist, tech-versierter Grower |

### Anmeldung

1. Navigiere zu: https://homegrowbook-cmd.github.io/Test/auth/login
2. Scrolle nach unten zum Abschnitt **"🎭 Try Demo Mode"**
3. Klicke auf einen der drei Demo-User-Buttons
4. Du wirst automatisch eingeloggt und zur Runs-Seite weitergeleitet

## ✨ Was funktioniert im Demo Mode?

### ✅ Voll funktionsfähig

- **Navigation**: Alle Navigationslinks funktionieren
- **Login/Logout**: Demo-Login und Logout
- **Runs anzeigen**: Liste von Beispiel-Grow-Diaries mit verschiedenen Phasen
- **User Profile**: Zeigt das Profil des eingeloggten Demo-Users
- **Responsive Design**: Funktioniert auf Desktop und Mobile
- **Dark Mode UI**: Ansprechende Dark-Theme-Oberfläche

### ⚠️ Mock-Daten

Der Demo Mode verwendet vorgespeicherte Mock-Daten:

- **6 Beispiel-Runs** mit verschiedenen Strains und Wachstumsphasen
- **Verschiedene Grow-Methoden**: Soil, Hydro, Outdoor
- **Realistische Daten**: Likes, Kommentare, Einträge
- **Verschiedene Phasen**: Seedling, Vegetative, Flowering, Drying

### ❌ Nicht verfügbar im Demo Mode

Da kein Backend vorhanden ist, funktionieren folgende Features nicht:

- Neue Runs erstellen (Button vorhanden, aber keine Datenspeicherung)
- Neue Entries hinzufügen
- Bilder hochladen
- Kommentare schreiben
- Likes vergeben
- Usern folgen
- Daten werden nicht gespeichert

## 🛠️ Technische Details

### Wie funktioniert der Demo Mode?

1. **Auth Store**: Erweitert um `isDemoMode` Flag und `loginDemo()` Funktion
2. **Mock-Daten**: Vordefinierte Beispiel-Daten in den Komponenten
3. **API Fallback**: Bei API-Fehlern werden automatisch Mock-Daten verwendet
4. **LocalStorage**: Demo-Token wird gespeichert (`demo-token`)

### Demo-Indikator

Wenn du im Demo Mode bist, siehst du einen blauen Banner:

```
Demo Mode: Showing example diaries. Connect to a backend API to see real data.
```

## 📸 Screenshots

### Homepage
![Homepage](https://github.com/user-attachments/assets/1157ab9e-0136-4be8-a61f-7eabb8d37d90)

### Login-Seite mit Demo-Optionen
![Login mit Demo Mode](https://github.com/user-attachments/assets/8d2a9ea7-aa6c-4437-862d-b323720dd2aa)

### Runs-Übersicht im Demo Mode
![Runs-Seite Demo](https://github.com/user-attachments/assets/211d1fbe-9e0e-45b8-bc9a-b0b3ec9e733d)

### User Profile im Demo Mode
![Profile Demo](https://github.com/user-attachments/assets/0671a82f-9d50-49be-a31e-da569b4730f5)

## 🚀 Für Entwickler

### Demo Mode lokal testen

```bash
# Frontend starten
cd frontend
npm install
npm run dev

# Browser öffnen
open http://localhost:3000/auth/login

# Auf einen Demo-User-Button klicken
```

### Demo Mode implementiert in

- `frontend/src/store/authStore.ts` - Demo-Login-Logik
- `frontend/src/lib/api.ts` - Demo-Token-Handling
- `frontend/src/app/auth/login/page.tsx` - Demo-Login-Buttons
- `frontend/src/app/runs/page.tsx` - Mock-Daten für Runs
- `frontend/src/app/users/[username]/UserProfileClient.tsx` - Demo-User-Daten

### Neue Mock-Daten hinzufügen

Um weitere Mock-Daten hinzuzufügen, bearbeite die entsprechenden Komponenten:

```typescript
// Beispiel: Weitere Runs hinzufügen in runs/page.tsx
const mockRuns: Run[] = [
  // ... bestehende Runs
  {
    id: '7',
    title: 'Dein neuer Mock-Run',
    // ... weitere Felder
  }
];
```

## 🔄 Von Demo Mode zu echtem Backend

Wenn du bereit bist, mit einem echten Backend zu arbeiten:

1. **Backend starten**: Siehe [README.md](README.md#quick-start) für Setup-Anweisungen
2. **Registrieren**: Erstelle einen echten Account über `/auth/register`
3. **Login**: Nutze reguläres Login mit Email/Username und Passwort
4. **Echte Daten**: Alle Änderungen werden nun in der Datenbank gespeichert

## 💡 Feedback

Der Demo Mode soll es einfach machen, die UI zu erkunden. Wenn du Feedback hast:

- 🐛 **Bugs**: Öffne ein [GitHub Issue](https://github.com/homegrowbook-cmd/Test/issues)
- 💡 **Verbesserungsvorschläge**: Nutze [GitHub Discussions](https://github.com/homegrowbook-cmd/Test/discussions)
- 🎨 **UI/UX Feedback**: Sehr willkommen!

## 📝 Changelog

### v1.0 (November 2024)
- ✅ Initiale Demo Mode Implementation
- ✅ 3 Demo-User (Alice, Bob, Charlie)
- ✅ 6 Beispiel-Runs mit Mock-Daten
- ✅ Demo-Banner zur Kennzeichnung
- ✅ Profile-Fallback für Demo-User

---

**Happy Testing! 🌿**
