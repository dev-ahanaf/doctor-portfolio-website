/**
 * Dr. Md. Musa Al Ashari - Official Portfolio Website
 * Main JavaScript Controller
 * Complete Suite: Stages 1, 2, and 3 (Footer, Security & Optimizations)
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initMobileMenu();
  initLanguageToggle();
  initSmoothScroll();
  initFaqAccordion();
  initAppointmentForm();
  initTestimonialFilter();
  initScrollReveal();
  initBackToTop();
  initNewsletterForm();
});

/**
 * XSS Sanitation Helper: Safely escapes unsafe characters
 */
function sanitizeHTML(str) {
  if (!str) return '';
  const temp = document.createElement('div');
  temp.textContent = str;
  return temp.innerHTML;
}

/**
 * Adds scroll elevation and blur effect to sticky navbar
 */
function initNavbarScroll() {
  const navbar = document.getElementById('main-navbar');
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/**
 * Mobile Hamburger Menu Controller with accessibility & keyboard navigation
 */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-btn');
  const closeBtn = document.getElementById('mobile-menu-close');
  const drawer = document.getElementById('mobile-drawer');
  const backdrop = document.getElementById('mobile-backdrop');
  const menuLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !drawer || !backdrop) return;

  const openMenu = () => {
    drawer.classList.remove('translate-x-full');
    backdrop.classList.remove('opacity-0', 'pointer-events-none');
    backdrop.classList.add('opacity-100');
    toggleBtn.setAttribute('aria-expanded', 'true');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.classList.add('overflow-hidden');
  };

  const closeMenu = () => {
    drawer.classList.add('translate-x-full');
    backdrop.classList.remove('opacity-100');
    backdrop.classList.add('opacity-0', 'pointer-events-none');
    toggleBtn.setAttribute('aria-expanded', 'false');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('overflow-hidden');
  };

  toggleBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  backdrop.addEventListener('click', closeMenu);

  menuLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !drawer.classList.contains('translate-x-full')) {
      closeMenu();
    }
  });
}

/**
 * Smooth Anchor Navigation with sticky header offset
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 84;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * Bilingual Support Indicator (EN / বাংলা)
 */
function initLanguageToggle() {
  const langButtons = document.querySelectorAll('.lang-btn');
  langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      langButtons.forEach(b => {
        b.classList.remove('bg-teal-700', 'text-white', 'font-semibold');
        b.classList.add('text-slate-600', 'hover:text-teal-800');
      });
      btn.classList.add('bg-teal-700', 'text-white', 'font-semibold');
      btn.classList.remove('text-slate-600', 'hover:text-teal-800');
    });
  });
}

/**
 * Accessible FAQ Accordion
 */
function initFaqAccordion() {
  const accordionButtons = document.querySelectorAll('.faq-toggle');

  accordionButtons.forEach(button => {
    button.addEventListener('click', () => {
      const item = button.closest('.accordion-item');
      const isExpanded = button.getAttribute('aria-expanded') === 'true';

      document.querySelectorAll('.accordion-item.open').forEach(openItem => {
        if (openItem !== item) {
          openItem.classList.remove('open');
          openItem.querySelector('.faq-toggle').setAttribute('aria-expanded', 'false');
        }
      });

      if (isExpanded) {
        item.classList.remove('open');
        button.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('open');
        button.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/**
 * Appointment Booking Form with Anti-Spam Honeypot, Validation & XSS Prevention
 */
function initAppointmentForm() {
  const form = document.getElementById('appointment-booking-form');
  const dateInput = document.getElementById('appointment-date');
  const successModal = document.getElementById('booking-success-modal');
  const closeSuccessBtn = document.getElementById('close-success-btn');

  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
  }

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Security Honeypot check (Bots fill this invisible field, humans do not)
    const honeypot = document.getElementById('hp-website');
    if (honeypot && honeypot.value.trim() !== '') {
      console.warn('Bot submission blocked via honeypot trap.');
      return;
    }

    const nameInput = document.getElementById('patient-name');
    const phoneInput = document.getElementById('patient-phone');
    const serviceInput = document.getElementById('patient-service');
    const slotInput = document.getElementById('patient-slot');
    const notesInput = document.getElementById('patient-notes');

    let isValid = true;

    // Reset errors
    form.querySelectorAll('.error-text').forEach(el => el.classList.add('hidden'));
    form.querySelectorAll('input, select, textarea').forEach(el => el.classList.remove('border-rose-500', 'ring-1', 'ring-rose-500'));

    // Validate Name
    const sanitizedName = sanitizeHTML(nameInput.value.trim());
    if (!sanitizedName || sanitizedName.length < 3) {
      showFieldError(nameInput, 'Please enter patient full name (at least 3 characters)');
      isValid = false;
    }

    // Validate Phone
    const phoneClean = phoneInput.value.replace(/[^0-9+]/g, '');
    if (phoneClean.length < 10) {
      showFieldError(phoneInput, 'Please provide a valid active contact or WhatsApp number');
      isValid = false;
    }

    // Validate Date
    if (!dateInput.value) {
      showFieldError(dateInput, 'Please select your preferred consultation date');
      isValid = false;
    }

    // Validate Service
    if (!serviceInput.value) {
      showFieldError(serviceInput, 'Please choose a required service');
      isValid = false;
    }

    if (!isValid) return;

    // Show loading spinner
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <span>Processing Appointment Request...</span>
    `;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;

      const token = 'MUSA-' + Math.floor(100000 + Math.random() * 900000);
      document.getElementById('success-token').textContent = token;
      document.getElementById('success-patient-name').textContent = sanitizedName;
      document.getElementById('success-date').textContent = dateInput.value;
      document.getElementById('success-service').textContent = serviceInput.options[serviceInput.selectedIndex].text;
      document.getElementById('success-slot').textContent = slotInput.value || 'Evening Slot (5:00 PM - 9:00 PM)';

      if (successModal) {
        successModal.classList.remove('hidden');
        successModal.classList.add('flex');
      }

      form.reset();
    }, 850);
  });

  function showFieldError(field, message) {
    field.classList.add('border-rose-500', 'ring-1', 'ring-rose-500');
    const errorEl = field.parentElement.querySelector('.error-text');
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.remove('hidden');
    }
  }

  if (closeSuccessBtn && successModal) {
    closeSuccessBtn.addEventListener('click', () => {
      successModal.classList.add('hidden');
      successModal.classList.remove('flex');
    });
  }
}

/**
 * Testimonials Category Filter
 */
function initTestimonialFilter() {
  const filterBtns = document.querySelectorAll('.testimonial-filter-btn');
  const cards = document.querySelectorAll('.testimonial-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-category');

      filterBtns.forEach(b => {
        b.classList.remove('bg-teal-700', 'text-white', 'shadow-sm');
        b.classList.add('bg-white', 'text-slate-600', 'border-slate-200');
      });
      btn.classList.add('bg-teal-700', 'text-white', 'shadow-sm');
      btn.classList.remove('bg-white', 'text-slate-600', 'border-slate-200');

      cards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (category === 'all' || cardCat === category) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/**
 * Scroll Reveal Animations via IntersectionObserver
 */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal-on-scroll');
  if (!('IntersectionObserver' in window)) {
    elements.forEach(el => el.classList.add('is-revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

/**
 * Floating Back-to-Top Button
 */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top-btn');
  if (!backToTopBtn) return;

  const toggleBackToTop = () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', toggleBackToTop, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/**
 * Monthly Health Tips Newsletter Subscription
 */
function initNewsletterForm() {
  const form = document.getElementById('newsletter-form');
  const feedback = document.getElementById('newsletter-feedback');
  if (!form || !feedback) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = document.getElementById('newsletter-email');
    const emailVal = emailInput.value.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailVal)) {
      feedback.textContent = 'Please enter a valid email address.';
      feedback.className = 'text-xs text-rose-400 mt-2 block';
      return;
    }

    feedback.textContent = '✓ Subscribed successfully! You will receive Dr. Musa\'s monthly health guide.';
    feedback.className = 'text-xs text-emerald-400 mt-2 block';
    form.reset();

    setTimeout(() => {
      feedback.textContent = '';
    }, 6000);
  });
}
