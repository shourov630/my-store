/* ============================================
   PET ASSISTANT — Interactive Bot Helper
   ============================================ */

export function initPet() {
  // Create pet DOM
  const petHTML = `
    <div class="pet-assistant" id="petAssistant">
      <div class="pet-bubble" id="petBubble">
        <button class="close-bubble" id="closeBubble" aria-label="Close message">×</button>
        <span id="petMessage">👋 Hey there! I'm <strong>Pixel</strong>, your tracking buddy. Click me for quick navigation!</span>
      </div>

      <div class="pet-actions" id="petActions">
        <button class="pet-action-btn" data-section="portfolio">📊 See My Work</button>
        <button class="pet-action-btn" data-section="agents">🤖 Try AI Agents</button>
        <button class="pet-action-btn" data-section="contact">💬 Get In Touch</button>
        <button class="pet-action-btn" data-section="services">⚡ View Services</button>
      </div>

      <div class="pet-character" id="petCharacter" aria-label="Pet assistant Pixel" role="button" tabindex="0">
        <div class="pet-glow"></div>
        <div class="pet-notification" id="petNotification"></div>
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- Body -->
          <rect x="12" y="20" width="40" height="32" rx="12" fill="url(#petBodyGrad)" stroke="rgba(0,240,255,0.3)" stroke-width="1.5"/>
          <!-- Screen/Face -->
          <rect x="18" y="26" width="28" height="18" rx="6" fill="#0a0a14" stroke="rgba(0,240,255,0.2)" stroke-width="1"/>
          <!-- Left eye -->
          <g class="pet-eye" transform-origin="27 34">
            <circle cx="27" cy="34" r="3.5" fill="#00f0ff">
              <animate attributeName="opacity" values="1;0.7;1" dur="3s" repeatCount="indefinite"/>
            </circle>
            <circle cx="27" cy="34" r="1.5" fill="#fff" opacity="0.8"/>
          </g>
          <!-- Right eye -->
          <g class="pet-eye" transform-origin="37 34">
            <circle cx="37" cy="34" r="3.5" fill="#7c3aed">
              <animate attributeName="opacity" values="1;0.7;1" dur="3s" repeatCount="indefinite" begin="0.5s"/>
            </circle>
            <circle cx="37" cy="34" r="1.5" fill="#fff" opacity="0.8"/>
          </g>
          <!-- Antenna -->
          <line x1="32" y1="20" x2="32" y2="12" stroke="rgba(0,240,255,0.5)" stroke-width="2" stroke-linecap="round"/>
          <circle cx="32" cy="10" r="3" fill="#00f0ff" opacity="0.8">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite"/>
          </circle>
          <!-- Arms -->
          <rect x="4" y="30" width="8" height="4" rx="2" fill="url(#petBodyGrad)" stroke="rgba(0,240,255,0.2)" stroke-width="1"/>
          <rect x="52" y="30" width="8" height="4" rx="2" fill="url(#petBodyGrad)" stroke="rgba(0,240,255,0.2)" stroke-width="1"/>
          <!-- Feet -->
          <rect x="20" y="50" width="10" height="6" rx="3" fill="url(#petBodyGrad)" stroke="rgba(0,240,255,0.2)" stroke-width="1"/>
          <rect x="34" y="50" width="10" height="6" rx="3" fill="url(#petBodyGrad)" stroke="rgba(0,240,255,0.2)" stroke-width="1"/>
          <!-- Mouth (smile) -->
          <path d="M28 39 Q32 42 36 39" stroke="#00f0ff" stroke-width="1.5" fill="none" stroke-linecap="round" opacity="0.6"/>
          <!-- Gradient definitions -->
          <defs>
            <linearGradient id="petBodyGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#1a1a2e"/>
              <stop offset="100%" stop-color="#16213e"/>
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', petHTML);

  // Elements
  const pet = document.getElementById('petAssistant');
  const character = document.getElementById('petCharacter');
  const bubble = document.getElementById('petBubble');
  const actions = document.getElementById('petActions');
  const closeBubble = document.getElementById('closeBubble');
  const notification = document.getElementById('petNotification');
  const messageEl = document.getElementById('petMessage');

  if (!pet || !character) return;

  let isActionsOpen = false;
  let bubbleTimeout;
  let idleTimeout;

  // Messages based on section
  const sectionMessages = {
    hero: "👋 Welcome! I'm <strong>Pixel</strong>, your tracking assistant. Need help navigating?",
    about: "📋 Here's where you learn about <strong>SHOUROV's</strong> expertise in data-driven marketing!",
    skills: "🛠️ Check out these <strong>tracking superpowers</strong> — GTM, GA4, Pixel & more!",
    portfolio: "📊 Real proof! These events are <strong>actually tracked and verified</strong>.",
    services: "⚡ Need tracking help? These <strong>services</strong> cover everything from setup to optimization!",
    agents: "🤖 Try the <strong>AI Agents</strong>! Click 'Run Test' to see tracking diagnostics in action.",
    contact: "💌 Ready to work together? <strong>Send a message</strong> or reach out on Fiverr/Upwork!"
  };

  // Show initial greeting after delay
  setTimeout(() => {
    showBubble(sectionMessages.hero);
    // Auto-hide after 6 seconds
    bubbleTimeout = setTimeout(() => hideBubble(), 6000);
  }, 3000);

  // Toggle actions on click
  character.addEventListener('click', () => {
    if (isActionsOpen) {
      closeActions();
    } else {
      openActions();
    }
  });

  // Keyboard support
  character.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      character.click();
    }
  });

  // Close bubble
  if (closeBubble) {
    closeBubble.addEventListener('click', (e) => {
      e.stopPropagation();
      hideBubble();
    });
  }

  // Quick action buttons
  document.querySelectorAll('.pet-action-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const section = btn.dataset.section;
      const target = document.getElementById(section);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      closeActions();
      // Show relevant message
      setTimeout(() => {
        showBubble(sectionMessages[section] || "Let me help you explore! 🚀");
        bubbleTimeout = setTimeout(() => hideBubble(), 5000);
      }, 600);
    });
  });

  // Track scroll and update messages
  let currentSection = 'hero';
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        if (id !== currentSection) {
          currentSection = id;
          notification.style.display = 'block';

          // Reset idle timer
          clearTimeout(idleTimeout);
          idleTimeout = setTimeout(() => {
            if (!isActionsOpen) {
              showBubble(sectionMessages[currentSection] || "Exploring? Click me for quick links! ✨");
              bubbleTimeout = setTimeout(() => hideBubble(), 5000);
            }
          }, 8000); // Show tip after 8s idle in new section
        }
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('section[id]').forEach(section => {
    observer.observe(section);
  });

  function showBubble(message) {
    clearTimeout(bubbleTimeout);
    messageEl.innerHTML = message;
    bubble.classList.add('visible');
    notification.style.display = 'none';
  }

  function hideBubble() {
    bubble.classList.remove('visible');
  }

  function openActions() {
    isActionsOpen = true;
    actions.classList.add('visible');
    hideBubble();
  }

  function closeActions() {
    isActionsOpen = false;
    actions.classList.remove('visible');
  }

  // Close actions when clicking outside
  document.addEventListener('click', (e) => {
    if (isActionsOpen && !pet.contains(e.target)) {
      closeActions();
    }
  });

  // Fun: pet reacts to rapid scrolling
  let lastScrollTop = 0;
  let scrollSpeed = 0;

  window.addEventListener('scroll', () => {
    const st = window.scrollY;
    scrollSpeed = Math.abs(st - lastScrollTop);
    lastScrollTop = st;

    if (scrollSpeed > 100) {
      character.style.animationDuration = '0.5s';
      setTimeout(() => {
        character.style.animationDuration = '3s';
      }, 1000);
    }
  }, { passive: true });
}
