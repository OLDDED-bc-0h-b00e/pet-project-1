document.addEventListener('DOMContentLoaded', () => {
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
