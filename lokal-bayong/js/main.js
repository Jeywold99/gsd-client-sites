/* Lokal Bayong — shared interactions for the static site */
(function () {
  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
    });
  }

  // Bag counter (persists across pages via localStorage)
  function bagCount() {
    return parseInt(localStorage.getItem('lb_bag') || '0', 10);
  }
  function renderBag() {
    document.querySelectorAll('[data-bag-count]').forEach(function (el) {
      el.textContent = 'Bag (' + bagCount() + ')';
    });
  }
  renderBag();
  document.querySelectorAll('[data-add-to-bag]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      localStorage.setItem('lb_bag', bagCount() + 1);
      renderBag();
      var original = btn.getAttribute('data-label') || btn.textContent;
      btn.setAttribute('data-label', original);
      btn.textContent = 'Added \u2713';
      setTimeout(function () { btn.textContent = original; }, 1400);
    });
  });

  // Collection filters (shop / home featured)
  var chips = document.querySelectorAll('[data-filter]');
  if (chips.length) {
    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        var val = chip.getAttribute('data-filter');
        chips.forEach(function (c) { c.classList.toggle('is-active', c === chip); });
        document.querySelectorAll('[data-collection]').forEach(function (card) {
          var show = val === 'All' || card.getAttribute('data-collection') === val;
          card.style.display = show ? '' : 'none';
        });
      });
    });
  }

  // Product detail: swatches + qty
  document.querySelectorAll('[data-swatches]').forEach(function (group) {
    group.querySelectorAll('.swatch').forEach(function (sw) {
      sw.addEventListener('click', function () {
        group.querySelectorAll('.swatch').forEach(function (s) { s.classList.remove('is-on'); });
        sw.classList.add('is-on');
      });
    });
  });
  document.querySelectorAll('[data-qty]').forEach(function (q) {
    var out = q.querySelector('span');
    var n = 1;
    q.querySelectorAll('button').forEach(function (b) {
      b.addEventListener('click', function () {
        n = Math.max(1, n + (b.getAttribute('data-step') === '+' ? 1 : -1));
        out.textContent = n;
      });
    });
  });

  // Newsletter / contact form: friendly inline confirm
  document.querySelectorAll('[data-confirm-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"], .btn');
      if (btn) btn.textContent = form.getAttribute('data-confirm-form');
      form.querySelectorAll('input,textarea').forEach(function (i) { i.value = ''; });
    });
  });

  // Footer year
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
