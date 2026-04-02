/* ============================================
   GSAP SCROLL ANIMATIONS
   ============================================ */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initAnimations() {
  // Check reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    // Just show everything immediately
    document.querySelectorAll('.reveal').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  // Hero animations
  const heroTimeline = gsap.timeline({ delay: 0.5 });

  heroTimeline
    .to('.hero-badge', {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power3.out'
    })
    .to('.hero-title', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.3')
    .to('.hero-subtitle', {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power3.out'
    }, '-=0.4')
    .to('.hero-buttons', {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power3.out'
    }, '-=0.3');

  // Reveal on scroll for all `.reveal` elements
  const revealElements = document.querySelectorAll('.reveal:not(.hero-badge):not(.hero-title):not(.hero-subtitle):not(.hero-buttons)');

  revealElements.forEach((el, index) => {
    gsap.fromTo(el,
      {
        opacity: 0,
        y: 40
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          end: 'top 50%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  // Stat counter animation
  const statNumbers = document.querySelectorAll('.stat-number[data-count]');
  statNumbers.forEach(stat => {
    const target = parseInt(stat.dataset.count, 10);

    ScrollTrigger.create({
      trigger: stat,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(stat, {
          duration: 2,
          ease: 'power2.out',
          onUpdate: function () {
            const progress = this.progress();
            const current = Math.round(target * progress);
            stat.textContent = current + (target < 10 ? '+' : '+');
          }
        });
      }
    });
  });

  // Skill progress rings
  const progressBars = document.querySelectorAll('.progress-bar[data-percent]');
  progressBars.forEach(bar => {
    const percent = parseInt(bar.dataset.percent, 10);
    const circumference = 2 * Math.PI * 36; // r=36
    const offset = circumference - (percent / 100) * circumference;

    ScrollTrigger.create({
      trigger: bar,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(bar, {
          strokeDashoffset: offset,
          duration: 1.5,
          ease: 'power3.out',
          delay: 0.2
        });
      }
    });
  });

  // Funnel step animation
  const funnelSteps = document.querySelectorAll('.funnel-step');
  funnelSteps.forEach((step, i) => {
    ScrollTrigger.create({
      trigger: step,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(step, {
          delay: i * 0.15,
          duration: 0.5,
          onStart: () => step.classList.add('active')
        });

        // Animate count
        const countEl = step.querySelector('.funnel-step-count');
        if (countEl) {
          const target = parseInt(countEl.dataset.count, 10);
          gsap.to(countEl, {
            duration: 1.5,
            delay: i * 0.15,
            ease: 'power2.out',
            onUpdate: function () {
              const current = Math.round(target * this.progress());
              countEl.textContent = current.toLocaleString();
            }
          });
        }
      }
    });
  });

  // Debug timeline — stagger entries
  const debugEvents = document.querySelectorAll('.debug-event');
  debugEvents.forEach((event, i) => {
    gsap.fromTo(event,
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        duration: 0.4,
        delay: i * 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: event.parentElement,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  // Tag items — stagger
  const tagItems = document.querySelectorAll('.tag-item');
  tagItems.forEach((item, i) => {
    gsap.fromTo(item,
      { opacity: 0, x: 20 },
      {
        opacity: 1,
        x: 0,
        duration: 0.4,
        delay: i * 0.06,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: item.parentElement,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  // Service cards — stagger
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach((card, i) => {
    gsap.fromTo(card,
      { opacity: 0, y: 30, scale: 0.97 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        delay: i * 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  // Skill cards — stagger
  const skillCards = document.querySelectorAll('.skill-card');
  skillCards.forEach((card, i) => {
    gsap.fromTo(card,
      { opacity: 0, y: 30, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        delay: i * 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  // Contact link items
  const contactLinks = document.querySelectorAll('.contact-link-item');
  contactLinks.forEach((item, i) => {
    gsap.fromTo(item,
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.5,
        delay: i * 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 90%',
          toggleActions: 'play none none none'
        }
      }
    );
  });
}
