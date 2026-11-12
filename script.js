const body = document.body;
const header = document.querySelector('.site-header');
const menuButton = document.getElementById('menu-button');
const mainMenu = document.getElementById('main-menu');
const menuOverlay = document.getElementById('menu-overlay');
const themeButton = document.getElementById('theme-button');
const themeIcon = document.getElementById('theme-icon');
const themeColorTag = document.querySelector('meta[name="theme-color"]');

document.documentElement.classList.add('js');

function applyTheme(mode) {
  if (mode === 'light') {
    body.classList.add('light-mode');
    themeIcon.className = 'fas fa-moon';
    themeColorTag.setAttribute('content', '#F2EDE3');
  } else {
    body.classList.remove('light-mode');
    themeIcon.className = 'fas fa-sun';
    themeColorTag.setAttribute('content', '#000000');
  }
}

let savedTheme = 'dark';
try {
  savedTheme = localStorage.getItem('yalla-theme') || 'dark';
} catch (error) {
}
applyTheme(savedTheme);

themeButton.addEventListener('click', function () {
  const newTheme = body.classList.contains('light-mode') ? 'dark' : 'light';
  applyTheme(newTheme);
  try {
    localStorage.setItem('yalla-theme', newTheme);
  } catch (error) {}
});


function openMenu() {
  mainMenu.classList.add('open');
  menuOverlay.classList.add('open');
  menuButton.classList.add('open');
  menuButton.setAttribute('aria-expanded', 'true');
  body.classList.add('menu-is-open');
}

function closeMenu() {
  mainMenu.classList.remove('open');
  menuOverlay.classList.remove('open');
  menuButton.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  body.classList.remove('menu-is-open');
}

menuButton.addEventListener('click', function () {
  if (mainMenu.classList.contains('open')) {
    closeMenu();
  } else {
    openMenu();
  }
});

menuOverlay.addEventListener('click', closeMenu);
mainMenu.querySelectorAll('a').forEach(function (link) {
  link.addEventListener('click', closeMenu);
});
document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') closeMenu();
});
window.addEventListener('resize', function () {
  if (window.innerWidth >= 900) closeMenu();
});


window.addEventListener('scroll', function () {
  header.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });


const hiddenItems = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  hiddenItems.forEach(function (item) { observer.observe(item); });
} else {
  hiddenItems.forEach(function (item) { item.classList.add('show'); });
}
document.getElementById('year').textContent = new Date().getFullYear();
