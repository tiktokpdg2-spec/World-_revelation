# 🏛️ World Revelation — Le Sanctuaire Vivant

Une application immersive où des **agents autonomes** parlent, réagissent, et transforment un **monde en temps réel**.

---

## 🎭 Concept

**World Revelation** est un sanctuaire numérique divin où :
- **4 agents** distincts dialoguent de manière autonome
- Leurs paroles façonnent l'**état du monde** en temps réel
- La **tension**, l'**harmonie**, et l'**intensité** fluctuent dynamiquement
- Les faits importants sont **archivés** dans un Journal Sacré
- Le **Conseil** proclame les décrets majeurs
- Un **Codex** contient la mythologie et les lois du monde

---

## 🏗️ Architecture

### Frontend (index.html + app.js)
- 7 onglets immersifs : Sanctuaire, Voix, Monde, Archives, Présences, Conseil, Codex
- Mémoire persistante via localStorage
- Design cosmique et sacré
- Navigation stable et fluide

### Backend (server.js)
- Proxy sécurisé pour les appels API Claude
- Tient la clé API en environnement sécurisé
- Gère les requêtes des agents

---

## 🚀 Installation

### 1. Clone ou télécharge le repository
```bash
git clone https://github.com/yourusername/world-revelation.git
cd world-revelation
```

### 2. Install les dépendances
```bash
npm install
```

### 3. Configure l'API
```bash
cp .env.example .env
```
Édite `.env` et ajoute ta clé Anthropic :
```
ANTHROPIC_API_KEY=sk-ant-votre-vraie-cle-ici
```

### 4. Démarre le serveur
```bash
npm start
```

Ouvert http://localhost:3000 dans ton navigateur.

---

## 🎭 Les Quatre Voix

### **L'Oracle (◈)**
Prophète mystérieux. Révèle les vérités cachées par des énigmes et métaphores.

### **L'Ombre (◇)**
Critique tranchante. Conteste L'Oracle et révèle les contradictions.

### **La Tisseuse (✦)**
Sage délicate. Tisse les connexions et cherche l'harmonie dans la diversité.

### **La Forge (⚡)**
Force créatrice. Transforme les conflits en nouveauté et construction.

---

## 📊 Métriques du Monde

- **Tension** : Conflit et dynamique (0-100%)
- **Harmonie** : Accord et équilibre (0-100%)
- **Intensité** : Activité générale (0-100%)
- **Équilibre** : Stabilité structurelle (0-100%)

Ces métriques **changent réellement** en fonction des dialogues des agents.

---

## 📁 Structure

```
world-revelation/
├── index.html          # Frontend complet
├── app.js              # Logique JavaScript
├── server.js           # Backend Express
├── package.json        # Dépendances Node
├── .env.example        # Template d'environnement
├── .gitignore          # Fichiers ignorés
└── README.md           # Cette documentation
```

---

## 🔄 Cycle du Monde

1. Toutes les **5-12 secondes**, deux agents se dialoguent
2. Leurs paroles changent l'**état du monde**
3. Tous les **3 cycles**, une entrée est ajoutée au Journal
4. Tous les **5 cycles**, le Conseil émet une Proclamation
5. L'historique est conservé et visible dans les Archives

---

## 🎨 Palette de Couleurs

- **Or** (#C9A84C) — Sacré et divin
- **Ivoire** (#E2D5BC) — Texte principal
- **Bronze** (#8B7355) — Accents subtils
- **Noir cosmique** (#05040306) — Fond profond

---

## 📱 Responsive

- **Mobile-first** design
- Parfait sur téléphone
- Escalade élégante sur desktop
- Navigation par onglets fixes en bas

---

## 🛠️ Personnalisation

### Modifier les agents
Édite `const AGENTS` dans `app.js` pour changer leurs noms, rôles, ou systèmes.

### Changer les thèmes de conversation
Modifie le tableau `themes` dans la fonction `worldCycle()`.

### Ajuster la dynamique du monde
Dans `updateWorldDynamics()`, change les formules de calcul de tension/harmonie.

---

## 🚨 Troubleshooting

### "API Error 401"
→ Vérifie que `ANTHROPIC_API_KEY` est correctement défini dans `.env`

### "Module not found"
→ Assure-toi d'avoir exécuté `npm install`

### Les agents ne parlent pas
→ Vérifie que le serveur est en cours d'exécution (`npm start`)
→ Vérifie la console du navigateur pour les erreurs

---

## 📚 Ressources

- [Anthropic Claude API](https://console.anthropic.com)
- [Express.js Docs](https://expressjs.com)
- [MDN Web Docs](https://developer.mozilla.org)

---

## 📄 Licence

MIT — Libre d'usage et de modification.

---

**Créé avec 🏛️ pour un sanctuaire vivant et divin.**