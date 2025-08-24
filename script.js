// Smooth scroll for in-page links
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const id = a.getAttribute('href');
  const target = document.querySelector(id);
  if (target) {
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.pushState(null, '', id);
  }
});

// Header shadow on scroll
const onScroll = () => {
  const scrolled = window.scrollY > 8;
  document.documentElement.classList.toggle('header-shadow', scrolled);
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Subtle parallax for hero decor (respects reduced motion)
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const heroEl = document.querySelector('.hero');
const parallaxEls = document.querySelectorAll('.hero [data-speed]');
if (heroEl && parallaxEls.length && !prefersReduced) {
  let ticking = false;
  const parallax = () => {
    const rect = heroEl.getBoundingClientRect();
    const offset = Math.min(1.2, Math.max(-1.2, (window.innerHeight * 0.5 - (rect.top + rect.height * 0.5)) / window.innerHeight));
    parallaxEls.forEach((el) => {
      const sp = parseFloat(el.getAttribute('data-speed') || '0');
      el.style.setProperty('--parallax', `${offset * sp * 80}px`);
    });
    ticking = false;
  };
  const onScrollP = () => {
    if (!ticking) { requestAnimationFrame(parallax); ticking = true; }
  };
  window.addEventListener('scroll', onScrollP, { passive: true });
  window.addEventListener('resize', onScrollP);
  parallax();
}

// FAQ accordion
document.querySelectorAll('.faq-q').forEach((btn) => {
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    const panel = btn.nextElementSibling;
    if (panel) panel.hidden = expanded;
  });
});

// Apply form handling (demo)
const form = document.getElementById('apply-form');
const status = document.getElementById('form-status');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.textContent = '';
    const formData = new FormData(form);
    const name = (formData.get('name') || '').toString().trim();
    const email = (formData.get('email') || '').toString().trim();
    const challenge = (formData.get('challenge') || '').toString().trim();
    const goal = (formData.get('goal') || '').toString().trim();

    // Simple validation
    if (!name || !email || !challenge || !goal) {
      status.textContent = '未入力の項目があります。ご確認ください。';
      status.style.color = '#ff8a8a';
      return;
    }

    // Demo: pretend to submit
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true; btn.textContent = '送信中…';
    await new Promise((r) => setTimeout(r, 900));

    btn.disabled = false; btn.textContent = '無料相談に申し込む';
    status.style.color = '';
    status.textContent = '送信ありがとうございました。24時間以内に日程候補をご連絡します。';
    form.reset();
  });
}

// Focus style for skip link on tab
document.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') document.body.classList.add('show-focus');
});
