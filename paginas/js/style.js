// Intersection Observer for letter and element animation
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const letters = entry.target.querySelectorAll('.letter');
      if (entry.target.classList.contains('interrupcao')) {
        // For interruption section, no staggered delay
        letters.forEach(letter => {
          letter.style.animationPlayState = 'running';
        });
      } else {
        // For main section, staggered delay
        letters.forEach((letter, index) => {
          letter.style.animationDelay = `${index * 0.03}s`;
          letter.style.animationPlayState = 'running';
        });
      }
      const animateElements = entry.target.querySelectorAll('.animate-element');
      animateElements.forEach(element => {
        element.style.animationPlayState = 'running';
      });
      const animateSideElements = entry.target.querySelectorAll('.animate-side');
      animateSideElements.forEach(element => {
        element.style.animationPlayState = 'running';
      });
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe the interruption section
const interrupcaoSection = document.querySelector('.interrupcao');
if (interrupcaoSection) {
  observer.observe(interrupcaoSection);
}

// Observe the main section for the button animation
const mainSection = document.querySelector('main');
if (mainSection) {
  observer.observe(mainSection);
}

// Trigger animation for elements already visible on load
document.addEventListener('DOMContentLoaded', () => {
  const animateElements = document.querySelectorAll('.animate-element');
  animateElements.forEach(element => {
    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      element.style.animationPlayState = 'running';
    }
  });

  // Specifically trigger animation for the WhatsApp button in main section
  const whatsappButton = document.querySelector('.botao-whatsapp.animate-element');
  if (whatsappButton) {
    whatsappButton.style.animationPlayState = 'running';
  }

  // Specifically trigger animation for the contact button in interruption section
  const contactButton = document.querySelector('.botao_contato.animate-element');
  if (contactButton) {
    contactButton.style.animationPlayState = 'running';
  }
});

// Hamburger Menu Toggle Functionality
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  const closeBtn = document.querySelector('.close-btn');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileNav.classList.toggle('active');
    });

    // Close mobile nav when clicking the close button
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('active');
      });
    }

    // Close mobile nav when clicking on a link
    const mobileLinks = mobileNav.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('active');
      });
    });

    // Close mobile nav when clicking outside
    document.addEventListener('click', (e) => {
      if (!mobileNav.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('active');
      }
    });
  }
});
