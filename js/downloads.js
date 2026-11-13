/* SNOW HUB - Downloads. Three levels:
   downloads.html            -> categories (Beta, Releases, Tools, Resources)
   downloads.html?cat=beta   -> files of one category
   download.html?id=...      -> details of one file + real download button */
(function () {
  'use strict';
  var HUB = window.HUB, esc = HUB.esc, root = HUB.root, cats = HUB.downloads.categories;
  var main = document.getElementById('main'), q = new URLSearchParams(location.search);
  var page = document.body.dataset.page;

  function categoryList(content) {
    content.innerHTML = '<div class="grid">' + cats.map(function (c) {
      var has = c.items.length > 0;
      return '<article class="card' + (has ? '' : ' off') + '">' + HUB.titlebar('Category') + '<div class="card-body"><h3>' +
        (has ? '<a class="stretch" href="downloads.html?cat=' + c.id + '">' + esc(c.name) + '</a>' : esc(c.name)) + '</h3><p>' + esc(c.desc) + '</p>' +
        '<div class="tags"><span class="tag">' + (has ? c.items.length + (c.items.length > 1 ? ' files' : ' file') : 'Coming Soon') + '</span></div></div></article>';
    }).join('') + '</div>';
  }

  function categoryPage(content, c) {
    content.innerHTML = '<nav class="crumbs" aria-label="Breadcrumb"><a href="downloads.html">Downloads</a> / <span>' + esc(c.name) + '</span></nav><h2>' + esc(c.name) + '</h2>' +
      (c.items.length ? '<div class="grid">' + c.items.map(function (i) {
        var href = 'download.html?id=' + i.id;
        return '<article class="card">' + HUB.titlebar(c.name) + '<div class="card-body"><h3><a class="stretch" href="' + href + '">' + esc(i.name) + '</a></h3><p>' + esc(i.summary) + '</p>' +
          '<div class="tags"><span class="tag">' + esc(i.version) + '</span><span class="tag">' + esc(i.format) + '</span></div>' +
          '<div class="actions"><a class="btn small" href="' + href + '">Details</a><a class="btn primary small" href="' + root + i.file + '" download>Download</a></div></div></article>';
      }).join('') + '</div>' : '<p class="empty">Coming Soon. Nothing is published in ' + esc(c.name) + ' yet.</p>');
  }

  function itemPage() {
    var item, cat;
    cats.forEach(function (c) { c.items.forEach(function (i) { if (i.id === q.get('id')) { item = i; cat = c; } }); });
    if (!item) { main.innerHTML = HUB.notFound('This download does not exist.', 'downloads.html', 'Back to Downloads'); return; }
    document.title = item.name + ' - SNOW HUB';
    var list = function (a) { return '<ul class="feat">' + a.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>'; };
    main.innerHTML =
      '<nav class="crumbs" aria-label="Breadcrumb"><a href="downloads.html">Downloads</a> / <a href="downloads.html?cat=' + cat.id + '">' + esc(cat.name) + '</a> / <span>' + esc(item.name) + '</span></nav>' +
      '<h1>' + esc(item.name) + '</h1><p class="lead">' + esc(item.summary) + '</p>' +
      '<div class="detail"><div class="card">' + HUB.titlebar('Inside the package') + '<div class="card-body">' + list(item.contents) + '<h3>Requirements</h3>' + list(item.requirements) + '</div></div>' +
      '<aside class="card">' + HUB.titlebar('File') + '<div class="card-body"><dl class="meta"><dt>Version</dt><dd>' + esc(item.version) + '</dd><dt>Format</dt><dd>' + esc(item.format) +
      '</dd><dt>File</dt><dd>' + esc(item.filename) + '</dd><dt>Size</dt><dd>' + esc(item.size) + '</dd><dt>SHA-256</dt><dd><code>' + item.sha256 + '</code></dd></dl>' +
      '<div class="actions"><a class="btn primary" href="' + root + item.file + '" download>Download ' + esc(item.filename) + '</a></div>' +
      '<p class="small">Compare the SHA-256 with the downloaded file to check it is intact.</p></div></aside></div>';
  }

  if (page === 'download') { itemPage(); return; }
  var content = document.getElementById('content'), wanted = q.get('cat');
  var cat = cats.filter(function (c) { return c.id === wanted; })[0];
  if (wanted && !cat) main.innerHTML = HUB.notFound('This download category does not exist.', 'downloads.html', 'Back to Downloads');
  else if (cat) categoryPage(content, cat);
  else categoryList(content);
})();
