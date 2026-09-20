(function () {
  var root = document.documentElement;

  // Light / dark toggle
  var btn = document.getElementById('theme');
  function current() {
    var t = root.getAttribute('data-theme');
    if (t) return t;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  btn.addEventListener('click', function () {
    var next = current() === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  });

  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  // Card details open in a dialog
  var modal = document.getElementById('modal');
  if (!modal || typeof modal.showModal !== 'function') {
    root.classList.add('no-js'); // browsers without <dialog>: show details inline
    return;
  }
  var title = document.getElementById('modal-title');
  var status = document.getElementById('modal-status');
  var body = document.getElementById('modal-body');

  function openCard(card) {
    var t = card.querySelector('h3');
    var s = card.querySelector('.status');
    var full = card.querySelector('.full');
    if (!t || !full) return;
    title.textContent = t.textContent;
    status.innerHTML = s ? s.innerHTML : '';
    body.innerHTML = full.innerHTML;
    modal.showModal();
    modal.scrollTop = 0;
    if (card.id) { try { history.replaceState(null, '', '#' + card.id); } catch (e) {} }
  }

  document.querySelectorAll('.card .open').forEach(function (b) {
    b.addEventListener('click', function () { openCard(b.closest('.card')); });
  });
  modal.querySelector('.modal-x').addEventListener('click', function () { modal.close(); });
  modal.addEventListener('click', function (e) { if (e.target === modal) modal.close(); }); // click backdrop
  modal.addEventListener('close', function () {
    try { history.replaceState(null, '', location.pathname + location.search); } catch (e) {}
  });
})();
