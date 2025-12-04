// paginas/js/faq.js - controla o acordeão com animação suave
document.addEventListener('DOMContentLoaded', function () {
  const items = document.querySelectorAll('.faq-item');

  items.forEach(item => {
    const btn = item.querySelector('.faq-toggle');
    const answer = item.querySelector('.answer');

    // Ensure initial collapsed state
    answer.style.maxHeight = '0px';
    answer.setAttribute('aria-hidden', 'true');
    btn.setAttribute('aria-expanded', 'false');

    function open() {
      item.classList.add('open');
      const h = answer.scrollHeight;
      answer.style.maxHeight = h + 'px';
      answer.setAttribute('aria-hidden', 'false');
      btn.setAttribute('aria-expanded', 'true');
    }

    function close() {
      item.classList.remove('open');
      answer.style.maxHeight = '0px';
      answer.setAttribute('aria-hidden', 'true');
      btn.setAttribute('aria-expanded', 'false');
    }

    btn.addEventListener('click', function (e) {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      if (expanded) close(); else open();
    });

    // Keyboard support (Enter / Space)
    btn.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        btn.click();
      }
    });

    // If the content inside answer changes (images, fonts), update maxHeight when transition ends
    window.addEventListener('resize', function () {
      if (item.classList.contains('open')) {
        // allow a small timeout for layout to settle
        requestAnimationFrame(() => {
          answer.style.maxHeight = answer.scrollHeight + 'px';
        });
      }
    });
  });
});
