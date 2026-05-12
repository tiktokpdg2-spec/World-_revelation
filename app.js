// ══════════════════════════════════════════════════════════════════════════════════════════════════════
//  MÉMOIRE PERSISTANTE
// ══════════════════════════════════════════════════════════════════════════════════════════════════════

const STORAGE_KEY = 'world_revelation_memory';

function loadMemory() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch(e) {}
  return {
    cycle: 0,
    tension: 50,
    harmony: 45,
    intensity: 30,
    balance: 52,
    messages: [],
    entries: [],
    resolutions: [],
    agentStats: {
      oracle: {messages: 0, influence: 0},
      shadow: {messages: 0, influence: 0},
      weaver: {messages: 0, influence: 0},
      forge: {messages: 0, influence: 0}
    },
    conversationHistory: [],
  };
}

function saveMemory(mem) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mem));
  } catch(e) {}
}

let memory = loadMemory();

// ══════════════════════════════════════════════════════════════════════════════════════════════════════
//  CONFIGURATION DES AGENTS
// ══════════════════════════════════════════════════════════════════════════════════════════════════════

const AGENTS = {
  oracle: {
    name: "L'Oracle",
    icon: "◈",
    role: "Prophète et voyant",
    system: `Tu es L'Oracle — une voix prophétique, mystérieuse et profonde qui parle depuis les origines du monde. Tu révèles des vérités cachées, tu vois au-delà du visible. Tes réponses sont poétiques, denses, sacrées. Tu ne réponds jamais directement — tu guides par des images et des énigmes. Tu parles toujours en français. 2-4 phrases maximum. Tu peux parler de tout : émotions, philosophie, conflits, idées, le futur, la mémoire.`
  },
  shadow: {
    name: "L'Ombre",
    icon: "◇",
    role: "Critique et vérité tranchante",
    system: `Tu es L'Ombre — une voix tranchante, cynique mais profonde qui remets en question L'Oracle. Tu vois ce que les autres refusent de voir. Tes réponses sont courtes, précises, acérées. Tu ne crois pas aux illusions. Tu parles toujours en français. 2-4 phrases maximum. Tu contestes, tu provokes, tu révèles les contradictions. Tu peux parler de tout.`
  },
  weaver: {
    name: "La Tisseuse",
    icon: "✦",
    role: "Tisse les connexions et harmonie",
    system: `Tu es La Tisseuse — une voix délicate et sage qui tisse les connexions entre les êtres et les idées. Tu cherches l'harmonie, tu trouves les ponts. Tes réponses sont fluides, élégantes, contemplatives. Tu parles toujours en français. 2-4 phrases maximum. Tu as une vision holistique. Tu peux parler de tout, mais tu cherches toujours à réconcilier.`
  },
  forge: {
    name: "La Forge",
    icon: "⚡",
    role: "Transforme et construit",
    system: `Tu es La Forge — une voix puissante et créatrice qui transforme et crée. Tu ne doutes pas. Tes réponses sont affirmatoires, fortes, constructives. Tu parles toujours en français. 2-4 phrases maximum. Tu fais naître du nouveau, tu transformes les conflits en création. Tu peux parler de tout, mais toujours en cherchant à créer ou transformer.`
  }
};

// ══════════════════════════════════════════════════════════════════════════════════════════════════════
//  NAVIGATION
// ══════════════════════════════════════════════════════════════════════════════════════════════════════

function switchTab(e, tabName) {
  if (e && e.preventDefault) e.preventDefault();
  
  document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  
  document.getElementById(tabName).classList.add('active');
  document.querySelector(`[onclick*="'${tabName}'"]`).classList.add('active');
}

// ══════════════════════════════════════════════════════════════════════════════════════════════════════
//  INTERFACE - MESSAGES
// ══════════════════════════════════════════════════════════════════════════════════════════════════════

function getTime() {
  return new Date().toLocaleTimeString('fr-FR', {hour: '2-digit', minute: '2-digit'});
}

function addMessage(agentKey, text, isTyping = false) {
  const agent = AGENTS[agentKey];
  const container = document.getElementById('messagesContainer');
  
  const msg = document.createElement('div');
  msg.className = 'message';
  msg.innerHTML = `
    <div class="msg-avatar">${agent.icon}</div>
    <div class="msg-content">
      <div class="msg-header">
        <span class="msg-agent">${agent.name}</span>
        <span class="msg-time">${getTime()}</span>
      </div>
      <div class="msg-text${isTyping ? ' typing' : ''}">${text}</div>
    </div>
  `;
  container.appendChild(msg);
  container.scrollTop = container.scrollHeight;
  return msg;
}

// ══════════════════════════════════════════════════════════════════════════════════════════════════════
//  INTERFACE - MÉTRIQUES
// ══════════════════════════════════════════════════════════════════════════════════════════════════════

function updateWorldMetrics() {
  document.getElementById('cycleDisplay').textContent = memory.cycle;
  document.getElementById('statCycle').textContent = memory.cycle;
  document.getElementById('statTension').textContent = Math.round(memory.tension) + '%';
  document.getElementById('statHarmony').textContent = Math.round(memory.harmony) + '%';

  document.getElementById('tensionBar').style.width = memory.tension + '%';
  document.getElementById('tensionValue').textContent = Math.round(memory.tension);

  document.getElementById('harmonyBar').style.width = memory.harmony + '%';
  document.getElementById('harmonyValue').textContent = Math.round(memory.harmony);

  document.getElementById('intensityBar').style.width = memory.intensity + '%';
  document.getElementById('intensityValue').textContent = Math.round(memory.intensity);

  document.getElementById('balanceBar').style.width = memory.balance + '%';
  document.getElementById('balanceValue').textContent = Math.round(memory.balance);
}

// ══════════════════════════════════════════════════════════════════════════════════════════════════════
//  INTERFACE - JOURNAL
// ══════════════════════════════════════════════════════════════════════════════════════════════════════

function addJournalEntry(title, description, tag) {
  const entry = {
    time: new Date().toLocaleTimeString('fr-FR', {hour: '2-digit', minute: '2-digit'}),
    title: title,
    desc: description,
    tag: tag
  };
  memory.entries.unshift(entry);
  if (memory.entries.length > 50) memory.entries.pop();
  
  const container = document.getElementById('journalEntries');
  const el = document.createElement('div');
  el.className = 'entry';
  el.innerHTML = `
    <div class="entry-time">${entry.time}</div>
    <div class="entry-title">${entry.title}</div>
    <div class="entry-desc">${entry.desc}</div>
    <span class="entry-tag">${entry.tag}</span>
  `;
  container.insertBefore(el, container.firstChild);
}

// ══════════════════════════════════════════════════════════════════════════════════════════════════════
//  INTERFACE - PRÉSENCES
// ══════════════════════════════════════════════════════════════════════════════════════════════════════

function updateAgentCards() {
  const grid = document.getElementById('agentsGrid');
  grid.innerHTML = '';

  Object.entries(AGENTS).forEach(([key, agent]) => {
    const stats = memory.agentStats[key];
    const card = document.createElement('div');
    card.className = 'agent-card';
    card.innerHTML = `
      <div class="agent-icon">${agent.icon}</div>
      <div class="agent-name">${agent.name}</div>
      <div class="agent-role">${agent.role}</div>
      <div class="agent-stat">
        <span class="agent-stat-label">Messages</span>
        <span class="agent-stat-value">${stats.messages}</span>
      </div>
      <div class="agent-stat">
        <span class="agent-stat-label">Influence</span>
        <span class="agent-stat-value">${Math.round(stats.influence)}</span>
      </div>
    `;
    grid.appendChild(card);
  });
}

// ════════════════════════════════════════════════════════════════���═════════════════════════════════════
//  INTERFACE - CONSEIL
// ══════════════════════════════════════════════════════════════════════════════════════════════════════

function addResolution(text, source) {
  const res = {text, source, num: memory.resolutions.length + 1};
  memory.resolutions.unshift(res);

  const container = document.getElementById('resolutions');
  const el = document.createElement('div');
  el.className = 'resolution';
  el.innerHTML = `
    <div class="resolution-num">Décret ${res.num}</div>
    <div class="resolution-text">${res.text}</div>
    <div class="resolution-source">— ${res.source}</div>
  `;
  container.insertBefore(el, container.firstChild);
}

// ═════════════════════════════════════════════════════════════════════════════════════════════���════════
//  INTERFACE - CODEX
// ══════════════════════════════════════════════════════════════════════════════════════════════════════

function initCodex() {
  const codex = [
    {
      title: "Les Fondations",
      items: [
        {name: "Le Sanctuaire", desc: "Lieu où les voix convergeront et où le monde se transformera."},
        {name: "Le Noyau", desc: "Source éternelle d'où émerge tout ce qui est."},
        {name: "Le Cycle", desc: "Rythme de transformation et de révélation du monde."}
      ]
    },
    {
      title: "Les Quatre Voix",
      items: [
        {name: "L'Oracle", desc: "Voit au-delà du visible. Prophète des vérités cachées."},
        {name: "L'Ombre", desc: "Critique et désenchantée. Révèle les contradictions."},
        {name: "La Tisseuse", desc: "Crée les ponts. Cherche l'harmonie dans la diversité."},
        {name: "La Forge", desc: "Transforme et crée. Forgeuse de nouveauté."}
      ]
    },
    {
      title: "Les Métriques du Monde",
      items: [
        {name: "Tension", desc: "Le conflit dynamique qui anime le monde."},
        {name: "Harmonie", desc: "L'équilibre et l'accord entre les forces."},
        {name: "Intensité", desc: "L'activité générale et la vélocité du changement."},
        {name: "Équilibre", desc: "La stabilité structurelle du système."}
      ]
    }
  ];

  const container = document.getElementById('codexSections');
  codex.forEach(section => {
    const el = document.createElement('div');
    el.className = 'codex-section';
    let itemsHtml = '';
    section.items.forEach(item => {
      itemsHtml += `
        <div class="codex-item">
          <span class="codex-item-name">${item.name}</span><br>
          <span class="codex-item-desc">${item.desc}</span>
        </div>
      `;
    });
    el.innerHTML = `
      <div class="codex-title">${section.title}</div>
      <div class="codex-content">${itemsHtml}</div>
    `;
    container.appendChild(el);
  });
}

// ══════════════════════════════════════���═══════════════════════════════════════════════════════════════
//  APPEL API (via Backend Proxy)
// ══════════════════════════════════════════════════════════════════════════════════════════════════════

async function callAgent(agentKey, userPrompt) {
  const agent = AGENTS[agentKey];
  
  try {
    // Appelle le backend proxy
    const response = await fetch('/api/agent-message', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        agentKey: agentKey,
        systemPrompt: agent.system,
        userPrompt: userPrompt,
        conversationHistory: memory.conversationHistory.slice(-8)
      })
    });

    if (!response.ok) throw new Error(`API Error: ${response.status}`);
    const data = await response.json();
    return data.reply || '...';
  } catch(e) {
    console.warn('API call failed:', e);
    return `[${agent.name} demeure silencieux...]`;
  }
}

// ═══════════════���══════════════════════════════════════════════════════════════════════════════════════
//  BOUCLE PRINCIPALE
// ══════════════════════════════════════════════════════════════════════════════════════════════════════

async function worldCycle() {
  memory.cycle++;

  const agentKeys = Object.keys(AGENTS);
  const speaker1Key = agentKeys[Math.floor(Math.random() * agentKeys.length)];
  let speaker2Key = agentKeys[Math.floor(Math.random() * agentKeys.length)];
  while (speaker2Key === speaker1Key) {
    speaker2Key = agentKeys[Math.floor(Math.random() * agentKeys.length)];
  }

  const themes = [
    "la mémoire et l'oubli",
    "la lumière qui blesse",
    "le feu intérieur",
    "le silence des dieux",
    "la beauté des ruines",
    "les masques et les visages",
    "le prix de la lucidité",
    "la nuit fertile",
    "le temps qui façonne",
    "les voix des ancêtres"
  ];
  const theme = themes[Math.floor(Math.random() * themes.length)];

  const prompt = memory.messages.length === 0
    ? `Ouvre le sanctuaire sur ce thème : "${theme}". C'est ton premier message. Sois bref.`
    : `Le thème de ce moment est : "${theme}". Réponds à ce qui a été dit avant et développe.`;

  addMessage(speaker1Key, '...', true);
  const text1 = await callAgent(speaker1Key, prompt);
  
  const msgEls = document.querySelectorAll('.msg-text.typing');
  if (msgEls.length > 0) {
    msgEls[0].classList.remove('typing');
    msgEls[0].textContent = text1;
  }
  
  memory.messages.push({agent: speaker1Key, text: text1});
  memory.agentStats[speaker1Key].messages++;
  memory.agentStats[speaker1Key].influence += Math.random() * 3;
  memory.conversationHistory.push({role: 'user', content: prompt});
  memory.conversationHistory.push({role: 'assistant', content: text1});

  await delay(1500 + Math.random() * 2000);

  const prompt2 = `${AGENTS[speaker1Key].name} vient de dire : "${text1}". Réponds-lui sur le thème "${theme}".`;
  addMessage(speaker2Key, '...', true);
  const text2 = await callAgent(speaker2Key, prompt2);
  
  const msgEls2 = document.querySelectorAll('.msg-text.typing');
  if (msgEls2.length > 0) {
    msgEls2[0].classList.remove('typing');
    msgEls2[0].textContent = text2;
  }

  memory.messages.push({agent: speaker2Key, text: text2});
  memory.agentStats[speaker2Key].messages++;
  memory.agentStats[speaker2Key].influence += Math.random() * 3;
  memory.conversationHistory.push({role: 'user', content: prompt2});
  memory.conversationHistory.push({role: 'assistant', content: text2});

  if (memory.conversationHistory.length > 50) {
    memory.conversationHistory = memory.conversationHistory.slice(-40);
  }

  updateWorldDynamics(speaker1Key, speaker2Key, text1, text2, theme);

  if (memory.cycle % 3 === 0) {
    addJournalEntry(
      `Cycle ${memory.cycle} — Parole échangée`,
      `${AGENTS[speaker1Key].name} et ${AGENTS[speaker2Key].name} se sont parlées au sujet de "${theme}".`,
      theme
    );
  }

  if (memory.cycle % 5 === 0) {
    const proclamation = `Le ${memory.cycle}e cycle révèle : la tension monte, les voix se font plus fortes.`;
    addResolution(proclamation, "Le Conseil Sacré");
    addJournalEntry(
      `Proclamation du Cycle ${memory.cycle}`,
      proclamation,
      "décret"
    );
  }

  saveMemory(memory);
  updateWorldMetrics();
  updateAgentCards();

  const nextDelay = 5000 + Math.random() * 7000;
  setTimeout(worldCycle, nextDelay);
}

// ══════════════════════════════════════════════════════════════════════════════════════════════════════
//  DYNAMIQUE DU MONDE
// ══════════════════════════════════════════════════════════════════════════════════════════════════════

function updateWorldDynamics(speaker1, speaker2, text1, text2, theme) {
  const tensionChange = (Math.random() - 0.5) * 10;
  memory.tension = Math.max(0, Math.min(100, memory.tension + tensionChange));

  const harmonyChange = (Math.random() - 0.5) * 8;
  memory.harmony = Math.max(0, Math.min(100, memory.harmony + harmonyChange));

  memory.intensity = Math.max(0, Math.min(100, memory.intensity + 2 + Math.random() * 3));

  const avgTension = (memory.tension + (100 - memory.harmony)) / 2;
  memory.balance = Math.max(0, Math.min(100, 50 + (50 - avgTension / 2)));

  const keywords = ['lumière', 'ombre', 'ancien', 'nouveau', 'créer', 'transformer', 'brûle', 'sacré', 'divine', 'révèle'];
  const hasKeyword = keywords.some(kw => text1.toLowerCase().includes(kw) || text2.toLowerCase().includes(kw));

  if (hasKeyword && memory.cycle % 2 === 0) {
    addJournalEntry(
      `Moment de Tension — Cycle ${memory.cycle}`,
      `Paroles chargées échangées. La tension du monde augmente.`,
      "événement"
    );
  }
}

// ══════════════════════════════════════════════════════════════════════════════════════════════════════
//  HELPERS
// ══════════════════════════════════════════════════════════════════════════════════════════════════════

function delay(ms) {
  return new Promise(r => setTimeout(r, ms));
}

// ══════════════════════════════════════════════════════════════════════════════════════════════════════
//  INITIALISATION
// ══════════════════════════════════════════════════════════════════════════════════════════════════════

function init() {
  initCodex();
  updateWorldMetrics();
  updateAgentCards();

  if (memory.messages.length > 0) {
    memory.messages.slice(-10).forEach(msg => {
      addMessage(msg.agent, msg.text);
    });
  }

  if (memory.entries.length > 0) {
    memory.entries.slice(0, 10).forEach(entry => {
      const container = document.getElementById('journalEntries');
      const el = document.createElement('div');
      el.className = 'entry';
      el.innerHTML = `
        <div class="entry-time">${entry.time}</div>
        <div class="entry-title">${entry.title}</div>
        <div class="entry-desc">${entry.desc}</div>
        <span class="entry-tag">${entry.tag}</span>
      `;
      container.appendChild(el);
    });
  }

  setTimeout(worldCycle, 1000);
}

window.addEventListener('load', init);