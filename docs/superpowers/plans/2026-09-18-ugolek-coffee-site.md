# «Уголёк» — сайт кофейни: план реализации

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Собрать адаптивный одностраничный сайт кофейни «Уголёк» — чистый HTML/CSS/JS, без фреймворков, полностью работающий offline.

**Architecture:** Три файла (`index.html`, `style.css`, `script.js`) + папка `images/` с локальными фото. Mobile-first CSS с медиа-запросами для планшета/десктопа. Вся интерактивность — vanilla JS без библиотек.

**Tech Stack:** HTML5, CSS3 (custom properties, CSS Grid/Flexbox), vanilla JS (IntersectionObserver), Google Fonts (Fraunces, Inter).

**Spec:** `docs/superpowers/specs/2026-09-18-ugolek-coffee-site-design.md`

## Global Constraints

- Никаких фреймворков и сборщиков — только статические `index.html`, `style.css`, `script.js`
- Mobile-first: базовые стили для 375px, затем `min-width` медиа-запросы для планшета (768px) и десктопа (1200px)
- Цвета: терракотовый `#C1673B`, крем `#F5EBDD`, тёмный кофейный `#3B2A20`
- Шрифты: заголовки — Fraunces (serif), текст — Inter (sans-serif), оба через Google Fonts `<link>`
- Все внешние ссылки (соцсети, карта, форма) — нерабочие плейсхолдеры, это демо-проект
- Изображения — локальные файлы в `images/`, скачанные с Unsplash (свободная лицензия)

---

## Task 1: Загрузка изображений

**Files:**
- Create: `images/hero.jpg`, `images/about.jpg`, `images/gallery-1.jpg` … `images/gallery-7.jpg` (9 файлов всего)

**Interfaces:**
- Produces: набор файлов в `images/`, на которые будут ссылаться `index.html` (Task 2) через относительные пути `images/<name>.jpg`

- [ ] **Step 1: Создать папку images**

```bash
mkdir -p images
```

- [ ] **Step 2: Скачать все 9 изображений**

```bash
curl -sL "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?w=1920&q=80&fm=jpg&fit=crop" -o images/hero.jpg
curl -sL "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=1200&q=80&fm=jpg&fit=crop" -o images/about.jpg
curl -sL "https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=1000&q=80&fm=jpg&fit=crop" -o images/gallery-1.jpg
curl -sL "https://images.unsplash.com/photo-1511081692775-05d0f180a065?w=1000&q=80&fm=jpg&fit=crop" -o images/gallery-2.jpg
curl -sL "https://images.unsplash.com/photo-1559001724-fbad036dbc9e?w=1000&q=80&fm=jpg&fit=crop" -o images/gallery-3.jpg
curl -sL "https://images.unsplash.com/photo-1690609561635-f63c587b3aba?w=1000&q=80&fm=jpg&fit=crop" -o images/gallery-4.jpg
curl -sL "https://images.unsplash.com/photo-1597528662465-55ece5734101?w=1000&q=80&fm=jpg&fit=crop" -o images/gallery-5.jpg
curl -sL "https://images.unsplash.com/photo-1651604033534-e66b281f1981?w=1000&q=80&fm=jpg&fit=crop" -o images/gallery-6.jpg
curl -sL "https://images.unsplash.com/photo-1579265898841-79c7890d69cf?w=1000&q=80&fm=jpg&fit=crop" -o images/gallery-7.jpg
```

- [ ] **Step 3: Проверить, что все файлы скачаны и весят разумно (не пустые/не HTML-страница ошибки)**

```bash
ls -la images/
file images/*.jpg
```

Expected: 9 файлов, каждый `file` определяет как `JPEG image data`, размер каждого > 20KB (если файл маленький или определяется как ASCII/HTML — значит скачалась страница ошибки, нужно перепроверить URL).

- [ ] **Step 4: Commit**

```bash
git add images/
git commit -m "Add local Unsplash images for coffee shop site"
```

---

## Task 2: HTML-структура страницы

**Files:**
- Create: `index.html`

**Interfaces:**
- Consumes: файлы из `images/` (Task 1) по путям `images/hero.jpg`, `images/about.jpg`, `images/gallery-1.jpg`…`gallery-7.jpg`
- Produces: DOM-структура с id-якорями, на которые ссылаются CSS-классы (Task 3-4) и JS-селекторы (Task 5): `#menu` (якорь для кнопки-скролла), класс `.fade-in` на секциях (для JS-анимации), `.scroll-to-menu` (кнопка в hero), `#demo-form` (форма контактов)

- [ ] **Step 1: Написать index.html со всеми 7 разделами**

```html
<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>«Уголёк» — кофейня в историческом центре</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;1,9..144,500&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="style.css">
</head>
<body>

<header class="hero" id="top">
  <div class="hero__overlay"></div>
  <img src="images/hero.jpg" alt="Интерьер кофейни «Уголёк»" class="hero__bg">
  <div class="hero__content">
    <h1 class="hero__title">Уголёк</h1>
    <p class="hero__tagline">Тёплый уголок в самом сердце старого города</p>
    <a href="#menu" class="btn btn--primary scroll-to-menu">Посмотреть меню</a>
  </div>
</header>

<section class="about fade-in" id="about">
  <div class="container about__grid">
    <img src="images/about.jpg" alt="Интерьер кофейни" class="about__img">
    <div class="about__text">
      <h2>О нас</h2>
      <p>«Уголёк» открылся три года назад в отреставрированном купеческом доме XIX века, в самом сердце исторического центра. Толстые кирпичные стены, деревянные балки под потолком и запах свежемолотого кофе — вот что встречает наших гостей с порога.</p>
      <p>Мы верим, что хорошая кофейня — это не просто напитки, а место, где хочется задержаться. Поэтому у нас всегда есть свежая выпечка, удобные кресла у окна и плейлист, под который приятно думать или болтать с друзьями.</p>
      <p>Заходите — здесь всегда найдётся свободный столик и тёплая чашка чего-нибудь вкусного.</p>
    </div>
  </div>
</section>

<section class="menu fade-in" id="menu">
  <div class="container">
    <h2>Меню</h2>
    <div class="menu__grid">
      <article class="menu__card">
        <span class="menu__icon">☕</span>
        <h3>Эспрессо</h3>
        <p class="menu__price">150 ₽</p>
      </article>
      <article class="menu__card">
        <span class="menu__icon">☕</span>
        <h3>Капучино</h3>
        <p class="menu__price">220 ₽</p>
      </article>
      <article class="menu__card">
        <span class="menu__icon">☕</span>
        <h3>Флэт уайт</h3>
        <p class="menu__price">240 ₽</p>
      </article>
      <article class="menu__card">
        <span class="menu__icon">☕</span>
        <h3>Раф</h3>
        <p class="menu__price">280 ₽</p>
      </article>
      <article class="menu__card">
        <span class="menu__icon">🍫</span>
        <h3>Какао</h3>
        <p class="menu__price">210 ₽</p>
      </article>
      <article class="menu__card">
        <span class="menu__icon">🥐</span>
        <h3>Круассан</h3>
        <p class="menu__price">180 ₽</p>
      </article>
      <article class="menu__card">
        <span class="menu__icon">🍰</span>
        <h3>Чизкейк</h3>
        <p class="menu__price">320 ₽</p>
      </article>
      <article class="menu__card">
        <span class="menu__icon">🍫</span>
        <h3>Шоколадный брауни</h3>
        <p class="menu__price">250 ₽</p>
      </article>
    </div>
  </div>
</section>

<section class="gallery fade-in" id="gallery">
  <div class="container">
    <h2>Галерея</h2>
    <div class="gallery__grid">
      <img src="images/gallery-1.jpg" alt="Интерьер кофейни" loading="lazy">
      <img src="images/gallery-2.jpg" alt="Зал кофейни" loading="lazy">
      <img src="images/gallery-3.jpg" alt="Латте-арт" loading="lazy">
      <img src="images/gallery-4.jpg" alt="Чашка кофе" loading="lazy">
      <img src="images/gallery-5.jpg" alt="Выпечка" loading="lazy">
      <img src="images/gallery-6.jpg" alt="Круассаны" loading="lazy">
      <img src="images/gallery-7.jpg" alt="Кофе с рисунком" loading="lazy">
    </div>
  </div>
</section>

<section class="hours fade-in" id="hours">
  <div class="container hours__grid">
    <div class="hours__text">
      <h2>Часы работы и адрес</h2>
      <p><strong>Пн–Пт:</strong> 8:00 – 21:00</p>
      <p><strong>Сб–Вс:</strong> 9:00 – 22:00</p>
      <p><strong>Адрес:</strong> ул. Кузнечная, 12, старый город</p>
    </div>
    <div class="hours__map">
      <iframe
        src="about:blank"
        title="Карта — placeholder для Yandex Maps"
        class="hours__map-frame"
        loading="lazy"></iframe>
      <p class="hours__map-caption">Здесь будет встроенная карта Yandex Maps</p>
    </div>
  </div>
</section>

<section class="contact fade-in" id="contact">
  <div class="container">
    <h2>Свяжитесь с нами</h2>
    <p class="contact__phone">+7 (900) 123-45-67</p>
    <div class="contact__socials">
      <a href="#" aria-label="VK" class="social-icon">VK</a>
      <a href="#" aria-label="Telegram" class="social-icon">TG</a>
      <a href="#" aria-label="Instagram" class="social-icon">IG</a>
    </div>
    <form class="contact__form" id="demo-form">
      <input type="text" placeholder="Ваше имя" required>
      <input type="email" placeholder="Email" required>
      <textarea placeholder="Сообщение" rows="3"></textarea>
      <button type="submit" class="btn btn--primary">Отправить</button>
      <p class="contact__form-note">Демо-форма, отправка не выполняется.</p>
    </form>
  </div>
</section>

<footer class="footer">
  <div class="container">
    <p>&copy; 2026 «Уголёк». Все права защищены.</p>
  </div>
</footer>

<script src="script.js"></script>
</body>
</html>
```

- [ ] **Step 2: Проверить валидность структуры**

```bash
grep -c "<section" index.html
grep -c "fade-in" index.html
```

Expected: `grep -c "<section"` → `5` (about, menu, gallery, hours, contact), `grep -c "fade-in"` → `5` (все 5 секций с классом для анимации).

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "Add semantic HTML structure for coffee shop site"
```

---

## Task 3: CSS — дизайн-система, Hero, About

**Files:**
- Create: `style.css` (первая часть: reset, переменные, hero, about, базовые компоненты `.btn`, `.container`)

**Interfaces:**
- Consumes: классы из `index.html` (Task 2): `.hero`, `.hero__bg`, `.hero__overlay`, `.hero__content`, `.hero__title`, `.hero__tagline`, `.btn`, `.btn--primary`, `.about`, `.about__grid`, `.about__img`, `.about__text`, `.container`
- Produces: CSS custom properties (`--color-terracotta`, `--color-cream`, `--color-coffee`, `--font-serif`, `--font-sans`) — используются во всех последующих CSS-задачах (Task 4)

- [ ] **Step 1: Написать базовую часть style.css**

```css
:root {
  --color-terracotta: #C1673B;
  --color-cream: #F5EBDD;
  --color-coffee: #3B2A20;
  --color-bg-warm: #FBF6EE;
  --font-serif: 'Fraunces', serif;
  --font-sans: 'Inter', sans-serif;
}

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  font-family: var(--font-sans);
  color: var(--color-coffee);
  background-color: var(--color-bg-warm);
  background-image:
    repeating-linear-gradient(0deg, rgba(59,42,32,0.02) 0px, rgba(59,42,32,0.02) 1px, transparent 1px, transparent 3px),
    repeating-linear-gradient(90deg, rgba(59,42,32,0.02) 0px, rgba(59,42,32,0.02) 1px, transparent 1px, transparent 3px);
  line-height: 1.6;
}

h1, h2, h3 { font-family: var(--font-serif); font-weight: 600; }

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px;
}

.btn {
  display: inline-block;
  padding: 14px 32px;
  border-radius: 999px;
  font-family: var(--font-sans);
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  border: none;
  font-size: 1rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.btn--primary {
  background: var(--color-terracotta);
  color: var(--color-cream);
}

.btn--primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(193, 103, 59, 0.35);
}

/* Hero */
.hero {
  position: relative;
  height: 100vh;
  min-height: 480px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.hero__bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}

.hero__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(59,42,32,0.35), rgba(59,42,32,0.75));
  z-index: 1;
}

.hero__content {
  position: relative;
  z-index: 2;
  text-align: center;
  color: var(--color-cream);
  padding: 0 20px;
}

.hero__title {
  font-size: 3.5rem;
  font-style: italic;
  margin-bottom: 12px;
}

.hero__tagline {
  font-size: 1.1rem;
  margin-bottom: 32px;
  opacity: 0.9;
}

@media (min-width: 768px) {
  .hero__title { font-size: 5rem; }
  .hero__tagline { font-size: 1.3rem; }
}

/* About */
.about { padding: 80px 0; }

.about__grid {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.about__img {
  width: 100%;
  border-radius: 16px;
  object-fit: cover;
  max-height: 320px;
}

.about__text h2 { font-size: 2rem; margin-bottom: 20px; }
.about__text p { margin-bottom: 16px; }

@media (min-width: 768px) {
  .about__grid {
    flex-direction: row;
    align-items: center;
    gap: 48px;
  }
  .about__img { max-height: none; flex: 1; }
  .about__text { flex: 1; }
}
```

- [ ] **Step 2: Открыть index.html в браузере Claude и проверить визуально**

Открыть файл в Browser pane (`preview_start` с `url: "file:///<полный путь>/index.html"`), сделать скриншот. Ожидается: hero-блок в полный экран с фото, заголовок «Уголёк», кнопка видна; секция «О нас» с фото и текстом в два столбца на desktop.

- [ ] **Step 3: Commit**

```bash
git add style.css
git commit -m "Add design system, hero and about styles"
```

---

## Task 4: CSS — Menu, Gallery, Hours, Contact, Footer + адаптив

**Files:**
- Modify: `style.css` (добавить стили для оставшихся секций в конец файла)

**Interfaces:**
- Consumes: переменные из Task 3 (`--color-terracotta`, `--color-cream`, `--color-coffee`, `--font-serif`, `--font-sans`, `.container`, `.btn`), классы из Task 2: `.menu__grid`, `.menu__card`, `.menu__icon`, `.menu__price`, `.gallery__grid`, `.hours__grid`, `.hours__map-frame`, `.contact__socials`, `.social-icon`, `.contact__form`, `.footer`

- [ ] **Step 1: Дописать стили Menu/Gallery/Hours/Contact/Footer**

```css
/* Menu */
.menu { padding: 80px 0; background: var(--color-cream); }
.menu h2 { font-size: 2rem; margin-bottom: 40px; text-align: center; }

.menu__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.menu__card {
  background: var(--color-bg-warm);
  border-radius: 16px;
  padding: 24px;
  text-align: center;
  box-shadow: 0 4px 14px rgba(59,42,32,0.08);
}

.menu__icon { font-size: 2rem; display: block; margin-bottom: 8px; }
.menu__card h3 { font-size: 1.1rem; margin-bottom: 6px; }
.menu__price { color: var(--color-terracotta); font-weight: 600; }

@media (min-width: 768px) {
  .menu__grid { grid-template-columns: repeat(4, 1fr); }
}

/* Gallery */
.gallery { padding: 80px 0; }
.gallery h2 { font-size: 2rem; margin-bottom: 40px; text-align: center; }

.gallery__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.gallery__grid img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 12px;
}

@media (min-width: 768px) {
  .gallery__grid { grid-template-columns: repeat(4, 1fr); }
  .gallery__grid img { height: 200px; }
}

/* Hours */
.hours { padding: 80px 0; background: var(--color-cream); }
.hours__grid { display: flex; flex-direction: column; gap: 32px; }
.hours__text h2 { font-size: 2rem; margin-bottom: 20px; }
.hours__text p { margin-bottom: 8px; }

.hours__map-frame {
  width: 100%;
  height: 240px;
  border: none;
  border-radius: 12px;
  background: var(--color-coffee);
}

.hours__map-caption {
  text-align: center;
  font-size: 0.85rem;
  opacity: 0.7;
  margin-top: 8px;
}

@media (min-width: 768px) {
  .hours__grid { flex-direction: row; }
  .hours__text, .hours__map { flex: 1; }
}

/* Contact */
.contact { padding: 80px 0; text-align: center; }
.contact h2 { font-size: 2rem; margin-bottom: 16px; }
.contact__phone { font-size: 1.3rem; font-weight: 600; margin-bottom: 20px; }

.contact__socials {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-bottom: 40px;
}

.social-icon {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--color-terracotta);
  color: var(--color-cream);
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  font-size: 0.8rem;
  font-weight: 600;
}

.contact__form {
  max-width: 420px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.contact__form input,
.contact__form textarea {
  padding: 12px 16px;
  border-radius: 10px;
  border: 1px solid rgba(59,42,32,0.2);
  font-family: var(--font-sans);
  font-size: 1rem;
}

.contact__form-note {
  font-size: 0.8rem;
  opacity: 0.6;
}

/* Footer */
.footer {
  padding: 24px 0;
  background: var(--color-coffee);
  color: var(--color-cream);
  text-align: center;
  font-size: 0.85rem;
}

/* Fade-in animation (JS toggles .is-visible) */
.fade-in {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.fade-in.is-visible {
  opacity: 1;
  transform: translateY(0);
}
```

- [ ] **Step 2: Проверить в браузере на 375px и 1440px**

Через Browser pane: `resize_window` preset `mobile` → скриншот, затем preset `desktop` → скриншот. Ожидается: на мобильном — меню/галерея в 2 колонки, часы работы в столбик; на десктопе — меню в 4 колонки, часы работы в две колонки. Без горизонтального скролла на 375px.

- [ ] **Step 3: Commit**

```bash
git add style.css
git commit -m "Add responsive styles for menu, gallery, hours, contact, footer"
```

---

## Task 5: JS — анимации при скролле и интерактивность

**Files:**
- Create: `script.js`

**Interfaces:**
- Consumes: класс `.fade-in` (добавляет `.is-visible`, Task 4 читает этот класс в CSS), элемент `.scroll-to-menu` (Task 2), `#demo-form` (Task 2)

- [ ] **Step 1: Написать script.js**

```javascript
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
```

- [ ] **Step 2: Проверить в браузере**

Через Browser pane: открыть страницу, прочитать консоль (`read_console_messages`) — ожидается отсутствие ошибок. Скролльнуть вниз — секции должны появляться с fade-in-up. Нажать «Посмотреть меню» — должен произойти плавный скролл к разделу меню. Заполнить и отправить демо-форму — должен появиться alert, страница не должна перезагружаться.

- [ ] **Step 3: Commit**

```bash
git add script.js
git commit -m "Add scroll animations and form interactivity"
```

---

## Task 6: Финальная проверка

**Files:**
- (нет новых файлов — только верификация)

**Interfaces:**
- Consumes: весь готовый сайт (`index.html`, `style.css`, `script.js`, `images/`)

- [ ] **Step 1: Открыть готовый сайт в Browser pane и пройтись по всем разделам**

Проверить desktop (1440px) и mobile (375px): все 7 секций отображаются, изображения загружены (не битые), текст читаем, кнопка меню скроллит корректно, форма показывает alert, нет горизонтального скролла на мобильном.

- [ ] **Step 2: Проверить консоль на ошибки**

`read_console_messages` — ожидается пустой список ошибок (`onlyErrors: true`).

- [ ] **Step 3: Финальный commit и push**

```bash
git add -A
git status
git commit -m "Final polish for Ugolek coffee shop landing page" --allow-empty
git push
```
