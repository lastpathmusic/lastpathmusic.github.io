(function () {
  var SETS = {
    unplugged: { id: 'XCCrGZh4p_A', start: 509, title: 'Last Path unplugged set' },
    electronic: { id: '2iG8EpuD2qg', start: 630, title: 'Last Path chill electronic set' }
  };
  var section = document.getElementById('live');
  var stage = document.getElementById('stage');
  var watch = document.getElementById('watch-link');
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.tabs [role="tab"]'));

  // Try the sharpest YouTube thumbnail first (1280x720), then step down.
  // A missing size either errors or returns a tiny placeholder, so check width too.
  function loadThumb(img, id) {
    var sizes = ['maxresdefault', 'sddefault', 'hqdefault'];
    var i = 0;
    function next() {
      img.onerror = img.onload = null;
      img.onerror = function () { if (++i < sizes.length) next(); };
      img.onload = function () { if (img.naturalWidth <= 120 && ++i < sizes.length) next(); };
      img.src = 'https://i.ytimg.com/vi/' + id + '/' + sizes[i] + '.jpg';
    }
    next();
  }

  function show(key) {
    var s = SETS[key];
    section.dataset.mode = key;
    stage.setAttribute('aria-labelledby', 'tab-' + key);
    watch.href = 'https://youtu.be/' + s.id + '?t=' + s.start;
    tabs.forEach(function (t) {
      var on = t.dataset.set === key;
      t.setAttribute('aria-selected', on);
      t.tabIndex = on ? 0 : -1;
    });

    // Click-to-load facade: no YouTube scripts load until the visitor presses play.
    stage.innerHTML = '';
    var btn = document.createElement('button');
    btn.className = 'facade';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Play: ' + s.title);
    btn.innerHTML = '<img alt="" loading="lazy"><span class="play"></span>';
    loadThumb(btn.firstChild, s.id);
    btn.addEventListener('click', function () {
      var f = document.createElement('iframe');
      f.title = s.title;
      f.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen';
      f.allowFullscreen = true;
      f.src = 'https://www.youtube-nocookie.com/embed/' + s.id + '?start=' + s.start + '&autoplay=1&rel=0';
      stage.replaceChildren(f);
    });
    stage.appendChild(btn);
  }

  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { show(t.dataset.set); });
    t.addEventListener('keydown', function (e) {
      var n = e.key === 'ArrowRight' ? i + 1 : e.key === 'ArrowLeft' ? i - 1 : null;
      if (n === null) return;
      e.preventDefault();
      var next = tabs[(n + tabs.length) % tabs.length];
      next.focus();
      show(next.dataset.set);
    });
  });

  show('unplugged');
  document.getElementById('year').textContent = new Date().getFullYear();
})();
