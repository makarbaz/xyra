
(function () {
  'use strict';

  const form = document.querySelector('[data-contact-form]');
  const status = document.querySelector('[data-form-status]');

  if (!form || !status) {
    return;
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    status.className = 'form-status';
    status.textContent = '';

    // Validate required fields and email format.
    if (!form.checkValidity()) {
      form.reportValidity();

      status.textContent =
        'Please complete all required fields and check your email address.';

      status.classList.add('is-error');
      return;
    }

    // This is intentionally a demo-only form.
    // Connect a secure endpoint before accepting real enquiries.
    status.textContent =
      'Your details passed validation, but this demo form does not send or store messages yet. Please connect a form endpoint before publishing.';

    status.setAttribute('role', 'status');
    status.setAttribute('aria-live', 'polite');
  });
})();
