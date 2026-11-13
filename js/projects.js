/* SNOW HUB - My Lab, My Projects and the shared project detail page.
   Search + category filter run on the data from data.js. */
(function () {
  'use strict';
  var HUB = window.HUB, esc = HUB.esc, page = document.body.dataset.page;
  var main = document.getElementById('main');

  /* Search box + category chips + card grid */
  function catalog(items, type) {
    var grid = document.getElementById('grid'), q = document.getElementById('q'),
        chips = document.getElementById('chips'), count = document.getElementById('count');
    var cats = ['All'].concat(items.map(function (i) { return i.category; }).filter(function (c, i, a) { return a.indexOf(c) === i; }));
    var cat = 'All';
    chips.innerHTML = cats.map(function (c, i) { return '<button class="chip" type="button" aria-pressed="' + (i === 0) + '" data-c="' + esc(c) + '">' + esc(c) + '</button>'; }).join('');
    function draw() {
      var t = q.value.trim().toLowerCase();
      var list = items.filter(function (i) {
        var hay = (i.name + ' ' + i.summary + ' ' + i.category + ' ' + (i.tags || []).join(' ')).toLowerCase();
        return (cat === 'All' || i.category === cat) && hay.indexOf(t) !== -1;
      });
      grid.innerHTML = list.length ? list.map(function (i) { return HUB.card(i, type); }).join('')
        : '<p class="empty">No result for “' + esc(q.value) + '”. Try another word or choose All.</p>';
      count.textContent = list.length + ' of ' + items.length + ' shown';
    }
    chips.onclick = function (e) {
      var b = e.target.closest('.chip'); if (!b) return;
      cat = b.dataset.c;
      Array.prototype.forEach.call(chips.querySelectorAll('.chip'), function (x) { x.setAttribute('aria-pressed', x === b); });
      draw();
    };
    q.oninput = draw;
    draw();
  }

  /* Detail page: detail.html?type=lab|project&id=... */
  function detail() {
    var p = new URLSearchParams(location.search);
    var type = p.get('type') === 'project' ? 'project' : 'lab';
    var list = type === 'lab' ? HUB.lab : HUB.projects;
    var back = type === 'lab' ? ['My Lab', 'lab.html'] : ['My Projects', 'projects.html'];
    var it = list.filter(function (x) { return x.id === p.get('id'); })[0];
    if (!it) { main.innerHTML = HUB.notFound('This project does not exist.', back[1], 'Back to ' + back[0]); return; }
    document.title = it.name + ' - SNOW HUB';
    var meta = it.meta.map(function (m) { return '<dt>' + esc(m[0]) + '</dt><dd>' + esc(m[1]) + '</dd>'; }).join('');
    main.innerHTML =
      '<nav class="crumbs" aria-label="Breadcrumb"><a href="' + back[1] + '">' + back[0] + '</a> / <span>' + esc(it.name) + '</span></nav>' +
      '<h1>' + esc(it.name) + '</h1><p class="lead">' + esc(it.summary) + '</p>' +
      '<div class="detail"><div class="win">' + HUB.titlebar(it.category) + HUB.shot(it) + '</div>' +
      '<aside class="card">' + HUB.titlebar('Details') + '<div class="card-body"><dl class="meta">' + meta + '</dl><div class="actions">' +
      (it.demo ? '<button class="btn primary" type="button" data-demo="' + it.id + '">Run demo</button>' : '') +
      '<a class="btn" href="' + back[1] + '">Back to ' + back[0] + '</a></div></div></aside></div>' +
      '<section><h2>' + (type === 'lab' ? 'How it works' : 'Features') + '</h2><ul class="feat">' +
      it.details.map(function (d) { return '<li>' + esc(d) + '</li>'; }).join('') + '</ul>' +
      (type === 'lab' ? '<p class="note">Only this presentation and a harmless web demo are published. The original scripts and files are not available on SNOW HUB.</p>' : '') + '</section>';
  }

  if (page === 'lab') catalog(HUB.lab, 'lab');
  else if (page === 'projects') catalog(HUB.projects, 'project');
  else if (page === 'detail') detail();
})();
