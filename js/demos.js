/* SNOW HUB - harmless web demos for My Lab.
   A demo is a list of "stages" shown inside a <dialog>. Everything runs in the
   page only: no audio, no fullscreen, no storage, no network, no system access. */
(function () {
  'use strict';
  var root = document.body.dataset.root || '';

  /* Small builders for the fake Windows-style dialog and its buttons */
  function dlg(title, text, buttons) { return '<div class="dlg"><b>' + title + '</b><div>' + text + '</div><div class="row">' + buttons + '</div></div>'; }
  function go(n, label) { return '<button class="btn small" type="button" data-go="' + n + '">' + label + '</button>'; }
  function end(msg) { return { html: '<h2>Demo finished</h2><p>' + msg + '</p>' + go(0, 'Replay') }; }
  function fakeCode() {
    var out = [];
    for (var i = 0; i < 14; i++) out.push('0x' + Math.random().toString(16).slice(2, 8).toUpperCase() + '  ' + Math.random().toString(16).slice(2, 10));
    return out.join('<br>');
  }
  function blocks() {
    var out = '';
    for (var i = 0; i < 60; i++) out += '<i style="animation-delay:' + (Math.random() * 1.5).toFixed(2) + 's"></i>';
    return '<div class="blocks" aria-hidden="true">' + out + '</div>';
  }

  /* One function per lab project: returns its stages. A stage with "ms" moves on by itself. */
  var DEMOS = {
    adminabusevirus: function () {
      var s = [{ html: dlg('Raining Tacos', 'Start the slideshow?', go(2, 'Yes') + go(1, 'No')) },
               { html: dlg('Raining Tacos', 'Are you sure? Last chance.', go(2, 'Start')) }];
      for (var c = 0; c < 2; c++) for (var i = 1; i <= 4; i++)
        s.push({ ms: 2000, cls: 'black', html: '<img src="' + root + 'assets/previews/raining-tacos-' + i + '.jpg" alt="Slideshow image ' + i + ' of 4">' });
      s.push(end('Prank over. Nothing was changed on your device.'));
      return s;
    },
    loveme: function () {
      return [{ html: dlg('Question', 'Do you love me? :)', go(1, 'Yes') + go(2, 'No')) },
              { html: dlg('&lt;3', 'Me too =)', go(0, 'Replay')) },
              { html: dlg('Oh no...', 'The original script shows a warning here, then starts a shutdown. This demo stops at the warning and does nothing.', go(0, 'Replay')) }];
    },
    pcoptimizer: function () {
      return [{ ms: 4000, html: '<h2>PCOptimizer</h2><p>Optimizing your PC...</p><div class="bar"><i style="animation-duration:4000ms"></i></div><p class="small">Loading shortened from 10 seconds to 4.</p>' },
              { ms: 3000, cls: 'code', html: fakeCode() },
              { ms: 3000, cls: 'blue', html: '<h2>:(</h2><p>Simulated error screen. Nothing is wrong with your PC.</p>' },
              { ms: 3000, cls: 'black', html: '<p>Restarting... (visual simulation only)</p><div class="bar"><i style="animation-duration:3000ms"></i></div>' },
              end('It was a visual simulation. Your PC was not touched.')];
    },
    windowsexe: function () {
      var alerts = ['Unknown process found', 'Registry warning', 'Network anomaly', 'Critical file at risk', 'System unstable'];
      return [{ html: dlg('WINDOWS.EXE', 'This is a visual simulation. Continue?', go(1, 'Continue') + '<button class="btn small" type="button" data-close>Cancel</button>') },
              { ms: 3000, html: '<p>Desktop breaking apart...</p>' + blocks() },
              { ms: 3000, cls: 'code', html: fakeCode() },
              { ms: 4500, html: '<h2>Scanning...</h2>' + alerts.map(function (a, i) { return '<div class="alert" style="animation-delay:' + (i * 0.8) + 's">Simulated alert: ' + a + '</div>'; }).join('') },
              { ms: 3000, cls: 'blue', html: '<h2>:(</h2><p>Simulated blue screen. Nothing is wrong with your PC.</p>' },
              end('The real simulation lasts about 47 seconds; this demo is shortened. Nothing was modified.')];
    }
  };

  /* Player: builds the dialog, shows stages, wires Replay / choices / Close. */
  function run(id) {
    var item = window.HUB.lab.filter(function (x) { return x.id === id; })[0];
    if (!item || !DEMOS[id] || typeof HTMLDialogElement === 'undefined') return;
    var stages = DEMOS[id](), timer;
    var d = document.createElement('dialog');
    d.className = 'demo';
    d.innerHTML = '<div class="demo-bar"><strong>Demo: ' + window.HUB.esc(item.name) + '</strong><button class="btn small" type="button" data-close>Close</button></div>' +
      '<div class="demo-screen" aria-live="polite"></div>' +
      '<p class="demo-note">Harmless web demo. It runs only in this tab and changes nothing on your device. Press Esc to close.</p>';
    document.body.appendChild(d);
    var screen = d.querySelector('.demo-screen');
    function show(n) {
      clearTimeout(timer);
      var s = stages[n];
      screen.className = 'demo-screen ' + (s.cls || '');
      screen.innerHTML = s.html;
      Array.prototype.forEach.call(screen.querySelectorAll('[data-go]'), function (b) { b.onclick = function () { show(+b.dataset.go); }; });
      if (s.ms) timer = setTimeout(function () { show(n + 1); }, s.ms);
    }
    d.addEventListener('click', function (e) { if (e.target.closest('[data-close]')) d.close(); });
    d.addEventListener('close', function () { clearTimeout(timer); d.remove(); });
    d.showModal();
    show(0);
  }

  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-demo]');
    if (b) run(b.dataset.demo);
  });
})();
