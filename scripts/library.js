/* 子页导航；正文与目录在无脚本时仍然可读。 */
document.body.classList.add('library-enabled');
const menu = document.querySelector('#menu-toggle');
const nav = document.querySelector('#main-nav');
function closeMenu() {
  menu.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-label', '打开导航');
  nav.classList.remove('open');
}
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? '关闭导航' : '打开导航');
  nav.classList.toggle('open', open);
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
    closeMenu(); menu.focus();
  }
});
const narrow = window.matchMedia('(max-width: 800px)');
const contents = document.querySelector('.chapter-nav details');
function adaptNavigation() {
  closeMenu();
  contents.open = !narrow.matches;
}
narrow.addEventListener('change', adaptNavigation);
adaptNavigation();
document.querySelector('#year').textContent = new Date().getFullYear();
