(function () {
  var root = document.documentElement;
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

  // Highlight the current section in the side nav.
  var links = {};
  document.querySelectorAll('.rail nav a').forEach(function (a) { links[a.getAttribute('href').slice(1)] = a; });
  var sections = Object.keys(links).map(function (id) { return document.getElementById(id); }).filter(Boolean);
  if ('IntersectionObserver' in window && sections.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          Object.keys(links).forEach(function (k) { links[k].classList.toggle('on', k === e.target.id); });
        }
      });
    }, { rootMargin: '-20% 0px -70% 0px' });
    sections.forEach(function (s) { io.observe(s); });
  }
})();
