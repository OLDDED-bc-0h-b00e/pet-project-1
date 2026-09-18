document.addEventListener('DOMContentLoaded', () => {
  const fadeEls = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  fadeEls.forEach((el) => observer.observe(el));

  const scrollBtn = document.querySelector('.scroll-to-menu');
  if (scrollBtn) {
    scrollBtn.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelector('#menu').scrollIntoView({ behavior: 'smooth' });
    });
  }

  const demoForm = document.querySelector('#demo-form');
  if (demoForm) {
    demoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Это демо-форма — отправка не выполняется.');
    });
  }
});
