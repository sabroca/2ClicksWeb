// Toggle mobile menu
const toggle = document.querySelector('.nav-toggle');
const menu = document.querySelector('.menu');
if (toggle) toggle.addEventListener('click', ()=> menu.classList.toggle('open'));

// Active nav link
const path = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.menu a').forEach(a=>{
  const href = a.getAttribute('href');
  if (href === path) a.classList.add('active');
});

// Footer year
const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();

// Portfolio filters
const chips = document.querySelectorAll('.chip');
const items = document.querySelectorAll('.gallery .item');
chips.forEach(ch=>ch.addEventListener('click',()=>{
  chips.forEach(c=>c.classList.remove('active'));
  ch.classList.add('active');
  const f = ch.dataset.filter;
  items.forEach(it=>{
    it.style.display = (f==='all' || it.classList.contains(f)) ? '' : 'none';
  });
}));

// Lightbox (só se existir na página)
const lightbox = document.getElementById('lightbox');
if (lightbox){
  const img = lightbox.querySelector('img');
  const caption = lightbox.querySelector('.caption');
  document.querySelectorAll('.gallery .thumb').forEach(thumb=>{
    thumb.addEventListener('click',()=>{
      img.src = thumb.querySelector('img')?.src || '';
      caption.textContent = 'Pré-visualização';
      lightbox.style.display = 'grid';
      lightbox.setAttribute('aria-hidden','false');
    });
  });
  lightbox.querySelector('.close').addEventListener('click',()=>{
    lightbox.style.display = 'none';
    lightbox.setAttribute('aria-hidden','true');
  });
}

// Form (demo-only)
const form = document.getElementById('contact-form');
if (form){
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const status = document.getElementById('form-status');
    const data = Object.fromEntries(new FormData(form).entries());
    status.textContent = 'Enviando…';
    setTimeout(()=>{
      status.textContent = 'Mensagem enviada! Em breve entraremos em contato.';
      form.reset();
    }, 800);
    console.log('Form data (demo):', data);
  });
}

// ===== Swipe/drag lateral na seção de preços (mobile) =====
(function(){
  const scroller = document.querySelector('.pricing.grid');
  if (!scroller) return;

  let isDown = false, startX = 0, scrollStart = 0;

  const start = (x) => { isDown = true; startX = x; scrollStart = scroller.scrollLeft; };
  const move  = (x) => { if (!isDown) return; scroller.scrollLeft = scrollStart - (x - startX); };
  const end   = ()   => { isDown = false; };

  // mouse
  scroller.addEventListener('mousedown', e => start(e.pageX));
  scroller.addEventListener('mousemove', e => move(e.pageX));
  scroller.addEventListener('mouseleave', end);
  scroller.addEventListener('mouseup', end);

  // touch
  scroller.addEventListener('touchstart', e => start(e.touches[0].pageX), {passive:true});
  scroller.addEventListener('touchmove',  e => move(e.touches[0].pageX),  {passive:true});
  scroller.addEventListener('touchend', end);
})();
