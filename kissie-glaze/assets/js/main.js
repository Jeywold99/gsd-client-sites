/* ============================================================
   Kissie Glaze — shared interactions
   ============================================================ */
(function () {
  'use strict';

  /* ---------- mobile nav toggle ---------- */
  var toggle = document.querySelector('.nav__toggle');
  var links = document.querySelector('.nav__links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
    });
  }

  /* ---------- lightbox ---------- */
  var lightbox = document.querySelector('.lightbox');
  if (lightbox) {
    var lightboxImg = lightbox.querySelector('img');
    document.querySelectorAll('[data-zoom]').forEach(function (img) {
      img.addEventListener('click', function () {
        lightboxImg.src = img.getAttribute('src');
        lightboxImg.alt = img.getAttribute('alt') || '';
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });
    function closeLightbox() {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    }
    lightbox.addEventListener('click', closeLightbox);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeLightbox();
    });
  }

  /* ---------- contact form ---------- */
  var form = document.querySelector('#order-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var nameField = form.elements.cname;
      var first = nameField && nameField.value.trim()
        ? ', ' + nameField.value.trim().split(' ')[0]
        : '';
      var card = document.querySelector('#form-wrap');
      if (card) {
        card.innerHTML =
          '<div class="thanks">' +
          '<div class="heart">\u2665</div>' +
          '<h3>Thank you' + first.replace(/</g, '') + '!</h3>' +
          '<p>We\u2019ve received your request and will reply soon. For the fastest response, message us directly on Facebook.</p>' +
          '<a class="btn btn-primary btn-sm" href="https://m.me/kissieglazecakes" target="_blank" rel="noopener">Message on Facebook</a>' +
          '</div>';
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }
})();
