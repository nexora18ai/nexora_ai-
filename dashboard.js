// NEXORA AI dashboard prototype.
// Front-end only: sample data, no AI, no accounts, no payments, no API keys.
(function () {
  var $ = function (id) { return document.getElementById(id); };
  var root = document.documentElement;

  /* ---------- Icons ---------- */
  var ICONS = {
    home: 'M3 11l9-8 9 8v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z',
    builder: 'M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2zM9 21h6',
    sales: 'M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z',
    marketing: 'M3 11v2a1 1 0 0 0 1 1h2l5 4V6L6 10H4a1 1 0 0 0-1 1zM15 9a4 4 0 0 1 0 6M18 6a8 8 0 0 1 0 12',
    growth: 'M3 17l6-6 4 4 8-8M15 7h6v6',
    settings: 'M4 7h9M17 7h3M4 17h3M11 17h9M15 4v6M9 14v6'
  };
  function icon(n) { return '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="' + ICONS[n] + '"/></svg>'; }

  /* ---------- Data ---------- */
  var NAV = [
    { id: 'overview',  label: 'Overview',          tab: 'Home',      icon: 'home' },
    { id: 'builder',   label: 'Business Builder',  tab: 'Builder',   icon: 'builder' },
    { id: 'sales',     label: 'Sales Assistant',   tab: 'Sales',     icon: 'sales' },
    { id: 'marketing', label: 'Marketing Studio',  tab: 'Marketing', icon: 'marketing' },
    { id: 'growth',    label: 'Growth Dashboard',  tab: 'Growth',    icon: 'growth' },
    { id: 'settings',  label: 'Settings',          icon: 'settings', noTab: true }
  ];

  var TOOLS = [
    { id: 'builder', title: 'AI Business Builder', icon: 'builder',
      desc: 'Develop ideas, choose a niche and shape a launch plan.',
      does: ['Develop and compare business ideas', 'Help you choose a niche', 'Draft a simple business plan', 'Create a 30-day launch checklist'],
      steps: ['Describe your skills and budget', 'Review idea and niche options', 'Pick one and get a plan', 'Follow the checklist'] },
    { id: 'sales', title: 'AI Sales Assistant', icon: 'sales',
      desc: 'Improve sales conversations and draft customer replies.',
      does: ['Prepare for customer objections', 'Draft replies you can edit', 'Suggest follow-up messages', 'Outline sales strategies'],
      steps: ['Paste a customer message', 'Choose a tone', 'Review a draft reply', 'Edit and send it yourself'] },
    { id: 'marketing', title: 'Marketing Studio', icon: 'marketing',
      desc: 'Plan campaigns and draft promotional copy.',
      does: ['Suggest marketing ideas', 'Draft promotional copy', 'Write product descriptions', 'Build a weekly content plan'],
      steps: ['Describe your product', 'Pick a channel', 'Review draft ideas and copy', 'Add the best ones to your plan'] },
    { id: 'growth', title: 'Growth Dashboard', icon: 'growth', spark: [40, 55, 48, 70, 62, 85, 95],
      desc: 'Track sales, activity and marketing performance.' }
  ];

  var ACTIVITY = [
    ['builder', 'Compared two niche options', 'Today, 9:40 AM'],
    ['sales', 'Saved a reply to a price objection', 'Today, 8:15 AM'],
    ['marketing', 'Planned a 7-day content calendar', 'Yesterday'],
    ['growth', 'Viewed the weekly sales summary', 'Yesterday'],
    ['builder', 'Completed launch checklist step 3', '2 days ago']
  ];

  var USAGE = [
    ['Business Builder sessions', 12, 30, ''],
    ['Sales replies drafted', 48, 100, ''],
    ['Marketing drafts', 21, 60, ''],
    ['Storage', 0.4, 1, ' GB']
  ];

  var GROWTH = {
    7:  { rev: '$4,860',  ord: '142',   conv: '3.8%', reach: '18.2k', bars: [52, 61, 48, 70, 66, 84, 92],
          ch: [['Email', 42], ['Instagram', 31], ['Search', 18], ['Referrals', 9]] },
    30: { rev: '$21,430', ord: '611',   conv: '3.4%', reach: '74.9k', bars: [40, 48, 55, 52, 63, 70, 66, 78, 85, 90],
          ch: [['Email', 38], ['Instagram', 34], ['Search', 19], ['Referrals', 9]] },
    90: { rev: '$58,910', ord: '1,702', conv: '3.1%', reach: '212k',  bars: [30, 36, 42, 40, 50, 58, 55, 66, 72, 80, 86, 94],
          ch: [['Email', 35], ['Instagram', 33], ['Search', 22], ['Referrals', 10]] }
  };

  /* ---------- Navigation markup ---------- */
  $('sideNav').innerHTML = NAV.map(function (n) {
    return '<a href="#' + n.id + '" data-nav="' + n.id + '">' + icon(n.icon) + n.label + '</a>';
  }).join('');
  $('tabBar').innerHTML = NAV.filter(function (n) { return !n.noTab; }).map(function (n) {
    return '<a href="#' + n.id + '" data-nav="' + n.id + '">' + icon(n.icon) + n.tab + '</a>';
  }).join('');

  /* ---------- Overview ---------- */
  $('toolCards').innerHTML = TOOLS.map(function (t) {
    var spark = t.spark ? '<div class="spark" aria-hidden="true">' + t.spark.map(function (h) { return '<i style="height:' + h + '%"></i>'; }).join('') + '</div>' : '';
    return '<a class="tool" href="#' + t.id + '"><span class="ico">' + icon(t.icon) + '</span><h3>' + t.title + '</h3><p>' + t.desc + '</p>' + spark +
      '<span class="state">' + (t.spark ? 'Sample data' : 'Not connected yet') + '</span></a>';
  }).join('');

  $('activity').innerHTML = ACTIVITY.map(function (a) {
    return '<li><span class="ico">' + icon(a[0]) + '</span><div>' + a[1] + '<small>' + a[2] + '</small></div></li>';
  }).join('');

  $('usage').innerHTML = USAGE.map(function (u) {
    return '<div class="use"><div><span>' + u[0] + '</span><span>' + u[1] + ' of ' + u[2] + u[3] + '</span></div>' +
      '<div class="bar"><div data-w="' + Math.round(u[1] / u[2] * 100) + '"></div></div></div>';
  }).join('');

  /* ---------- Tool views ---------- */
  TOOLS.forEach(function (t) {
    if (t.id === 'growth') return;
    $('v-' + t.id).innerHTML =
      '<div class="tool-head"><span class="ico big">' + icon(t.icon) + '</span><div><h2>' + t.title + '</h2><p>' + t.desc + '</p></div></div>' +
      '<div class="two"><section class="box"><h3>What it is planned to do</h3><ul class="list">' +
      t.does.map(function (d) { return '<li>' + d + '</li>'; }).join('') + '</ul></section>' +
      '<section class="box"><h3>How it would work</h3><ol class="list">' +
      t.steps.map(function (s) { return '<li>' + s + '</li>'; }).join('') + '</ol></section></div>' +
      '<div class="box notice"><div><h3>Not connected yet</h3><p>This tool is a design preview. No AI is connected, so nothing can be generated or saved.</p></div>' +
      '<button class="btn primary" type="button" data-soon="' + t.title + '">Launch tool</button></div>';
  });

  /* ---------- Growth view ---------- */
  $('v-growth').innerHTML =
    '<div class="tool-head"><span class="ico big">' + icon('growth') + '</span><div><h2>Growth Dashboard</h2><p>Sample figures showing how sales and marketing could be tracked.</p></div></div>' +
    '<div class="box-h"><div class="chips" id="rangeChips">' +
    ['7', '30', '90'].map(function (r) { return '<button class="cbtn" type="button" data-range="' + r + '" aria-pressed="false">' + r + ' days</button>'; }).join('') +
    '</div><em class="chip s">Sample data</em></div>' +
    '<div class="stats"><div><small>Revenue</small><strong id="mRev"></strong></div><div><small>Orders</small><strong id="mOrd"></strong></div>' +
    '<div><small>Conversion</small><strong id="mConv"></strong></div><div><small>Campaign reach</small><strong id="mReach"></strong></div></div>' +
    '<div class="two"><section class="box"><h3>Revenue trend</h3><div class="chart" id="chart" aria-label="Sample revenue chart"></div></section>' +
    '<section class="box"><h3>Sales by marketing channel</h3><div id="channels"></div></section></div>';

  function showRange(key) {
    var d = GROWTH[key];
    $('mRev').textContent = d.rev; $('mOrd').textContent = d.ord;
    $('mConv').textContent = d.conv; $('mReach').textContent = d.reach;
    $('chart').innerHTML = d.bars.map(function (h) { return '<i style="height:' + h + '%"></i>'; }).join('');
    $('channels').innerHTML = d.ch.map(function (c) {
      return '<div class="ch"><div><span>' + c[0] + '</span><span>' + c[1] + '%</span></div><div class="bar"><div style="width:' + c[1] * 2 + '%"></div></div></div>';
    }).join('');
    document.querySelectorAll('#rangeChips .cbtn').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.range === key)); });
  }
  document.querySelectorAll('#rangeChips .cbtn').forEach(function (b) {
    b.addEventListener('click', function () { showRange(b.dataset.range); });
  });
  showRange('7');

  /* ---------- Settings view ---------- */
  $('v-settings').innerHTML =
    '<div class="tool-head"><span class="ico big">' + icon('settings') + '</span><div><h2>Settings</h2><p>Profile and appearance.</p></div></div>' +
    '<div class="two"><section class="box"><h3>Profile (placeholder)</h3><div class="profile"><span class="avatar">G</span><div><strong>Guest user</strong><p class="note" style="margin:0">No account connected. Sign-in is not available yet.</p></div></div>' +
    '<label class="f">Name<input type="text" value="Guest user" disabled></label><label class="f">Email<input type="email" placeholder="Not available yet" disabled></label></section>' +
    '<section class="box"><h3>Appearance</h3><p class="note" style="margin:0 0 .6rem">Your choice is remembered in this browser only.</p>' +
    '<div class="seg"><button class="cbtn" type="button" data-set-theme="light" aria-pressed="false">Light</button><button class="cbtn" type="button" data-set-theme="dark" aria-pressed="false">Dark</button></div>' +
    '<h3 style="margin-top:1.4rem">About</h3><p class="note" style="margin:0">NEXORA AI dashboard prototype. No AI, accounts, payments or database are connected.</p></section></div>';

  /* ---------- Theme ---------- */
  var themeBtn = $('themeBtn'), meta = document.querySelector('meta[name="theme-color"]');
  function setTheme(t, save) {
    root.dataset.theme = t;
    themeBtn.setAttribute('aria-label', t === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    themeBtn.setAttribute('aria-pressed', String(t === 'dark'));
    meta.setAttribute('content', t === 'dark' ? '#05081a' : '#5b2bd6');
    document.querySelectorAll('[data-set-theme]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.setTheme === t)); });
    if (save) { try { localStorage.setItem('nexora-theme', t); } catch (e) {} }
  }
  themeBtn.addEventListener('click', function () { setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark', true); });
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-set-theme]');
    if (b) setTheme(b.dataset.setTheme, true);
  });
  setTheme(root.dataset.theme === 'dark' ? 'dark' : 'light', false);

  /* ---------- Toast for tools that are not live ---------- */
  var toast = $('toast'), timer;
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-soon]');
    if (!b) return;
    toast.textContent = b.dataset.soon + ' is not connected yet. This is a front-end prototype, so nothing was run or saved.';
    toast.classList.add('show');
    clearTimeout(timer);
    timer = setTimeout(function () { toast.classList.remove('show'); }, 3600);
  });

  /* ---------- Routing by URL hash ---------- */
  function route() {
    var id = (location.hash || '#overview').slice(1);
    var item = NAV.filter(function (n) { return n.id === id; })[0] || NAV[0];
    document.querySelectorAll('.view').forEach(function (v) { v.classList.toggle('on', v.id === 'v-' + item.id); });
    document.querySelectorAll('[data-nav]').forEach(function (a) {
      if (a.dataset.nav === item.id) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
    $('pageTitle').textContent = item.label;
    document.title = item.label + ' | NEXORA AI';
    window.scrollTo(0, 0);
    if (item.id === 'overview') {
      requestAnimationFrame(function () {
        document.querySelectorAll('#usage .bar div').forEach(function (d) { d.style.width = d.dataset.w + '%'; });
      });
    }
  }
  window.addEventListener('hashchange', route);
  route();
})();
