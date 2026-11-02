// NEXORA AI prototype. Everything here is front-end only and uses hand-written sample data.
// No AI, accounts, databases, payments or API keys are connected.
(function () {
  document.documentElement.classList.add('js');

  var $ = function (id) { return document.getElementById(id); };
  var toast = $('toast'), toastTimer;

  /* ---------- Mobile menu ---------- */
  var menuBtn = $('menuBtn'), menu = $('menu');
  function setMenu(open) {
    menu.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  menuBtn.addEventListener('click', function () { setMenu(!menu.classList.contains('open')); });
  menu.addEventListener('click', function (e) { if (e.target.tagName === 'A') setMenu(false); });

  /* ---------- Toast for features that are not live ---------- */
  function showToast(text) {
    toast.textContent = text;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove('show'); }, 3800);
  }
  document.querySelectorAll('[data-soon]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      showToast(btn.dataset.soon + ' is a proposed plan. Payments and the waitlist are not live yet, so nothing was saved or charged.');
    });
  });

  /* ---------- Dashboard preview: task checklist ---------- */
  var boxes = document.querySelectorAll('#tasks input');
  function updateTasks() {
    var done = 0;
    boxes.forEach(function (b) { if (b.checked) done++; });
    $('taskCount').textContent = done + ' of ' + boxes.length + ' done';
    $('taskBar').style.width = (done / boxes.length * 100) + '%';
  }
  boxes.forEach(function (b) { b.addEventListener('change', updateTasks); });
  updateTasks();

  /* ---------- Business Builder example tabs ---------- */
  var builder = {
    idea: '<h4>Idea: weekday lunch boxes</h4><p>A home kitchen that prepares healthy lunch boxes for office workers in one neighbourhood. Low startup cost, repeat customers, and easy to test with 10 orders.</p>',
    niche: '<h4>Niche: busy professionals</h4><ul><li>Audience: office workers within 5 km</li><li>Competition: canteens and delivery apps</li><li>Your edge: fresh, local, subscription pricing</li></ul>',
    plan: '<h4>First 30 days</h4><ul><li>Week 1: test 3 menu items with friends</li><li>Week 2: set prices and take photos</li><li>Week 3: pre-sell to 20 nearby offices</li><li>Week 4: launch and ask for reviews</li></ul>'
  };
  var tabs = document.querySelectorAll('#builderTabs button');
  function showTab(key) {
    tabs.forEach(function (t) { t.setAttribute('aria-selected', String(t.dataset.tab === key)); });
    $('builderPanel').innerHTML = builder[key];
  }
  tabs.forEach(function (t) { t.addEventListener('click', function () { showTab(t.dataset.tab); }); });
  showTab('idea');

  /* ---------- Sales Assistant example chats ---------- */
  var chats = {
    price: ['Customer: Another shop is cheaper than you.', 'Reply: Thanks for comparing. Our price includes free setup and 30 days of support. Would a smaller starter package suit your budget better?'],
    follow: ['Customer: I will think about it.', 'Reply: Of course. Shall I hold your quote for three days? I am happy to answer any questions in the meantime.'],
    question: ['Customer: Does this come in other sizes?', 'Reply: Yes, it comes in small, medium and large. Tell me what you plan to use it for and I will suggest the best fit.']
  };
  function showChat(key) {
    var c = chats[key];
    $('chat').innerHTML = '<div class="msg cust"><small>Customer</small>' + c[0].replace('Customer: ', '') +
      '</div><div class="msg reply"><small>Example reply</small>' + c[1].replace('Reply: ', '') + '</div>';
    document.querySelectorAll('#chatChips .chip').forEach(function (b) { b.classList.toggle('on', b.dataset.chat === key); });
  }
  document.querySelectorAll('#chatChips .chip').forEach(function (b) {
    b.addEventListener('click', function () { showChat(b.dataset.chat); });
  });
  showChat('price');

  /* ---------- Growth Dashboard sample data ---------- */
  var growth = {
    7:  { rev: '$4,860',  ord: '142',   conv: '3.8%', reach: '18.2k', bars: [52, 61, 48, 70, 66, 84, 92],
          ch: [['Email', 42], ['Instagram', 31], ['Search', 18], ['Referrals', 9]] },
    30: { rev: '$21,430', ord: '611',   conv: '3.4%', reach: '74.9k', bars: [40, 48, 55, 52, 63, 70, 66, 78, 85, 90],
          ch: [['Email', 38], ['Instagram', 34], ['Search', 19], ['Referrals', 9]] },
    90: { rev: '$58,910', ord: '1,702', conv: '3.1%', reach: '212k',  bars: [30, 36, 42, 40, 50, 58, 55, 66, 72, 80, 86, 94],
          ch: [['Email', 35], ['Instagram', 33], ['Search', 22], ['Referrals', 10]] }
  };
  function showRange(key) {
    var d = growth[key];
    $('mRev').textContent = d.rev;
    $('mOrd').textContent = d.ord;
    $('mConv').textContent = d.conv;
    $('mReach').textContent = d.reach;
    $('chart').innerHTML = d.bars.map(function (h) { return '<i style="height:' + h + '%"></i>'; }).join('');
    $('channels').innerHTML = d.ch.map(function (c) {
      return '<div class="ch"><div><span>' + c[0] + '</span><span>' + c[1] + '% of sales</span></div><div class="bar"><div style="width:' + c[1] * 2 + '%"></div></div></div>';
    }).join('');
    document.querySelectorAll('#rangeChips .chip').forEach(function (b) { b.classList.toggle('on', b.dataset.range === key); });
  }
  document.querySelectorAll('#rangeChips .chip').forEach(function (b) {
    b.addEventListener('click', function () { showRange(b.dataset.range); });
  });
  showRange('7');

  /* ---------- Gentle reveal on scroll ---------- */
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.08 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  $('year').textContent = new Date().getFullYear();
})();
