/* ============================================
   CONTACT FORM — Validation & Submission
   ============================================ */

export function initContact() {
  const form = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Gather values
    const name = form.querySelector('#form-name').value.trim();
    const email = form.querySelector('#form-email').value.trim();
    const message = form.querySelector('#form-message').value.trim();

    // Basic validation
    let isValid = true;
    clearErrors();

    if (!name) {
      showError('#form-name', 'Name is required');
      isValid = false;
    }

    if (!email || !isValidEmail(email)) {
      showError('#form-email', 'Valid email is required');
      isValid = false;
    }

    if (!message) {
      showError('#form-message', 'Message is required');
      isValid = false;
    }

    if (!isValid) return;

    // Simulate submission
    const submitBtn = form.querySelector('#btn-submit');
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
      form.style.display = 'none';
      formSuccess.classList.add('show');
    }, 1500);
  });

  // Real-time validation feedback
  form.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('blur', () => {
      const value = input.value.trim();
      if (input.required && !value) {
        input.style.borderColor = 'rgba(255, 51, 102, 0.5)';
      } else if (input.type === 'email' && value && !isValidEmail(value)) {
        input.style.borderColor = 'rgba(255, 51, 102, 0.5)';
      } else if (value) {
        input.style.borderColor = 'rgba(0, 255, 136, 0.3)';
      }
    });

    input.addEventListener('focus', () => {
      input.style.borderColor = 'rgba(0, 240, 255, 0.4)';
    });
  });

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function showError(selector, message) {
    const input = form.querySelector(selector);
    if (input) {
      input.style.borderColor = 'rgba(255, 51, 102, 0.5)';
      input.setAttribute('aria-invalid', 'true');

      // Add error message
      const error = document.createElement('span');
      error.className = 'form-error';
      error.textContent = message;
      error.style.cssText = 'color: #ff3366; font-size: 0.75rem; margin-top: 4px; display: block; font-family: var(--font-mono);';
      input.parentElement.appendChild(error);
    }
  }

  function clearErrors() {
    form.querySelectorAll('.form-error').forEach(el => el.remove());
    form.querySelectorAll('[aria-invalid]').forEach(el => {
      el.removeAttribute('aria-invalid');
      el.style.borderColor = '';
    });
  }
}
