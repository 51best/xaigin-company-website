/* M10 / 导航、渐入与公开联系信息；不连接业务系统。 */
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
window.matchMedia('(min-width: 801px)').addEventListener('change', event => {
  if (event.matches) closeMenu();
});
const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
if ('IntersectionObserver' in window && !motion.matches) {
  document.documentElement.classList.add('motion-ready');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(item => observer.observe(item));
}
document.querySelectorAll('[data-contact]').forEach(item => {
  const key = item.dataset.contact;
  const value = (window.XAIGIN_CONFIG[key] || '').trim();
  if (!value) return;
  if (key === 'phone' && /^[+\d\s()-]+$/.test(value)) {
    const link = document.createElement('a'); link.href = `tel:${value.replace(/[\s()-]/g, '')}`;
    link.textContent = value; item.replaceChildren(link);
  } else if (key === 'email' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    const link = document.createElement('a'); link.href = `mailto:${value}`;
    link.textContent = value; item.replaceChildren(link);
  } else { item.textContent = value; }
});
document.querySelector('#year').textContent = new Date().getFullYear();
