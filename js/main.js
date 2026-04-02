/* ============================================
   MAIN ENTRY POINT
   ============================================ */

import { initThreeScene } from './three-scene.js';
import { initNavigation } from './navigation.js';
import { initAnimations } from './animations.js';
import { initAgents } from './agents.js';
import { initContact } from './contact.js';
import { initPet } from './pet.js';

// Wait for DOM
document.addEventListener('DOMContentLoaded', () => {
  // Remove preloader after a brief delay
  const preloader = document.getElementById('preloader');

  const removePreloader = () => {
    if (preloader && !preloader.classList.contains('loaded')) {
      preloader.classList.add('loaded');
      setTimeout(() => {
        if (preloader.parentNode) preloader.remove();
      }, 600);
    }
  };

  // Wait for full load
  window.addEventListener('load', () => setTimeout(removePreloader, 400));

  // If window has already loaded or as a safety fallback
  if (document.readyState === 'complete') {
    setTimeout(removePreloader, 400);
  } else {
    // Ultimate fallback if load event hangs or was missed incorrectly
    setTimeout(removePreloader, 3500);
  }

  // Initialize modules
  try {
    initThreeScene();
  } catch (e) {
    console.warn('Three.js scene failed to initialize:', e);
  }

  initNavigation();

  // Slight delay for animations to let DOM settle
  requestAnimationFrame(() => {
    initAnimations();
  });

  initAgents();
  initContact();
  initPet();
});
