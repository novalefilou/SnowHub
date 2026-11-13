/* SNOW HUB - shared code: navigation shell, page transitions, status light,
   card helpers and the Home page. Loaded on every page after data.js. */
(function () {
  'use strict';
  var root = document.body.dataset.root || '';
  var $ = function (s) { return document.querySelector(s); };
  var esc = function (s) {
    return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; });
  };

  /* Navigation entries: [key, label, link] */
  var NAV = [['home', 'HOME', 'index.html'], ['lab', 'MY LAB', 'pages/lab.html'], ['projects', 'MY PROJECTS', 'pages/projects.html'],
             ['socials', 'MY SOCIALS', 'pages/socials.html'], ['downloads', 'DOWNLOADS', 'pages/downloads.html']];
  var section = document.body.dataset.section;
  if (section === 'auto') section = new URLSearchParams(location.search).get('type') === 'project' ? 'projects' : 'lab';

  var LOGO = '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><path d="M16 3v26M4.7 9.5l22.6 13M4.7 22.5l22.6-13M12.5 5.5L16 8.5l3.5-3M12.5 26.5l3.5-3 3.5 3"/></svg>';
  var WINDOW_ICON = '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="5" y="9" width="38" height="30" rx="4"/><path d="M5 17h38"/></svg>';

  /* Helpers shared with the other scripts */
  var HUB = window.HUB;
  HUB.esc = esc;
  HUB.root = root;
  HUB.titlebar = function (label) { return '<div class="tb"><span>' + esc(label) + '</span><span aria-hidden="true"><i></i><i></i><i></i></span></div>'; };
  HUB.shot = function (it) {
    return it.image ? '<img class="shot" src="' + root + it.image + '" alt="' + esc(it.alt || it.name) + '" loading="lazy">'
                    : '<div class="shot ph" role="img" aria-label="No preview available">' + WINDOW_ICON + '</div>';
  };
  /* A clickable project card. type is 'lab' or 'project'. */
  HUB.card = function (it, type) {
    var href = root + 'pages/detail.html?type=' + type + '&id=' + it.id;
    return '<article class="card">' + HUB.titlebar(it.category) + HUB.shot(it) +
      '<div class="card-body"><h3><a class="stretch" href="' + href + '">' + esc(it.name) + '</a></h3><p>' + esc(it.summary) + '</p>' +
      '<div class="actions"><a class="btn primary small" href="' + href + '">' + (type === 'lab' ? 'View Project' : 'Project Details') + '</a>' +
      (it.demo ? '<button class="btn small" type="button" data-demo="' + it.id + '">Demo</button>' : '') + '</div></div></article>';
  };
  /* In-page 404 for unknown ids */
  HUB.notFound = function (msg, href, label) {
    return '<h1>404</h1><p class="lead">' + esc(msg) + '</p><div class="hero-btns"><a class="btn primary" href="' + href + '">' + esc(label) + '</a></div>';
  };

  /* ----- Shell: top bar (mobile), sidebar, scrim ----- */
  var main = document.getElementById('main');
  var links = NAV.map(function (n) {
    return '<a href="' + root + n[2] + '"' + (n[0] === section ? ' aria-current="page"' : '') + '>' + n[1] + '</a>';
  }).join('');
  var brand = '<a class="brand" href="' + root + 'index.html">' + LOGO + 'SNOW HUB</a>';
  main.insertAdjacentHTML('beforebegin',
    '<header class="top">' + brand + '<button class="btn small" id="menu" type="button" aria-expanded="false" aria-controls="side">Menu</button></header>' +
    '<aside class="side" id="side">' + brand + '<nav class="nav" aria-label="Main">' + links + '</nav>' +
    '<div class="status" id="status" role="status"><span class="dot"></span><span id="stext">SNOW HUB ONLINE</span></div></aside><div class="scrim" id="scrim"></div>');

  var side = $('#side'), menu = $('#menu'), scrim = $('#scrim');
  function toggle(open) { side.classList.toggle('open', open); scrim.classList.toggle('show', open); menu.setAttribute('aria-expanded', open); }
  menu.onclick = function () { toggle(!side.classList.contains('open')); };
  scrim.onclick = function () { toggle(false); };
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') toggle(false); });

  /* Status light follows the browser's connection state */
  function status() {
    var on = navigator.onLine;
    $('#status').classList.toggle('off', !on);
    $('#stext').textContent = on ? 'SNOW HUB ONLINE' : 'SNOW HUB OFFLINE';
  }
  addEventListener('online', status); addEventListener('offline', status); status();

  /* Page transition: fade out the content, then follow the link */
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href]');
    if (!a || a.target || a.hasAttribute('download') || e.metaKey || e.ctrlKey || e.shiftKey || e.button) return;
    var u = new URL(a.href);
    if (u.origin !== location.origin || (u.pathname === location.pathname && u.search === location.search)) return;
    e.preventDefault();
    main.classList.add('leaving');
    setTimeout(function () { location.href = a.href; }, 150);
  });
  addEventListener('pageshow', function () { main.classList.remove('leaving'); });

  /* ----- Home page: featured projects and latest updates ----- */
  var feat = $('#featured');
  if (feat) {
    feat.innerHTML = HUB.card(HUB.projects[0], 'project') + HUB.card(HUB.projects[1], 'project') + HUB.card(HUB.lab[3], 'lab');
    $('#updates').innerHTML = HUB.updates.map(function (u) {
      return '<li><span class="date">' + esc(u.date) + '</span><span>' + esc(u.text) + '</span></li>';
    }).join('');
  }
})();
