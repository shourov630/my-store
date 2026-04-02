/* ============================================
   AI AGENTS — Tracking Tester & Auto Fix
   ============================================ */

export function initAgents() {
  const terminalBody = document.getElementById('terminalBody');
  const btnRunTest = document.getElementById('btnRunTest');
  const btnAutoFix = document.getElementById('btnAutoFix');
  const cursor = document.getElementById('terminalCursor');

  if (!terminalBody || !btnRunTest || !btnAutoFix) return;

  let isRunning = false;

  // Utility: delay
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  // Utility: append a line to terminal
  function appendLine(html, animDelay = 0) {
    if (cursor) cursor.remove();

    const line = document.createElement('div');
    line.className = 'terminal-line';
    line.style.animationDelay = `${animDelay}s`;
    line.innerHTML = html;
    terminalBody.appendChild(line);

    // Re-add cursor
    terminalBody.appendChild(cursor || createCursor());
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  function createCursor() {
    const c = document.createElement('span');
    c.className = 'cursor';
    c.id = 'terminalCursor';
    return c;
  }

  // Utility: append scan results table
  function appendScanTable(results) {
    if (cursor) cursor.remove();

    const wrapper = document.createElement('div');
    wrapper.className = 'scan-results';

    let tableHTML = `
      <table class="scan-table">
        <thead>
          <tr>
            <th>Event</th>
            <th>Status</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>`;

    results.forEach(r => {
      const badgeClass = r.status === 'OK' ? 'ok' : r.status === 'Warning' ? 'warn' : 'error';
      const icon = r.status === 'OK' ? '✓' : r.status === 'Warning' ? '⚠' : '✗';
      tableHTML += `
          <tr>
            <td>${r.event}</td>
            <td><span class="status-badge ${badgeClass}">${icon} ${r.status}</span></td>
            <td>${r.details}</td>
          </tr>`;
    });

    tableHTML += `</tbody></table>`;
    wrapper.innerHTML = tableHTML;
    terminalBody.appendChild(wrapper);
    terminalBody.appendChild(cursor || createCursor());
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  // Utility: append fix comparison
  function appendFixComparison(fixes) {
    if (cursor) cursor.remove();

    const wrapper = document.createElement('div');
    wrapper.className = 'fix-comparison';

    let html = '';
    fixes.forEach(fix => {
      html += `
        <div class="fix-panel before">
          <div class="fix-panel-label">✗ Before</div>
          <div class="fix-panel-code"><span class="deleted">${fix.before}</span></div>
        </div>
        <div class="fix-panel after">
          <div class="fix-panel-label">✓ After</div>
          <div class="fix-panel-code"><span class="added">${fix.after}</span></div>
        </div>`;
    });

    wrapper.innerHTML = html;
    terminalBody.appendChild(wrapper);
    terminalBody.appendChild(cursor || createCursor());
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  // Append progress bar
  function appendProgress() {
    if (cursor) cursor.remove();

    const progress = document.createElement('div');
    progress.className = 'scan-progress';
    progress.innerHTML = '<div class="scan-progress-bar" id="scanProgressBar"></div>';
    terminalBody.appendChild(progress);
    terminalBody.appendChild(cursor || createCursor());
    return progress.querySelector('.scan-progress-bar');
  }

  // Clear terminal
  function clearTerminal() {
    terminalBody.innerHTML = '';
    terminalBody.appendChild(createCursor());
  }

  // ============ Agent 1: Tracking Tester ============
  async function runTrackingTest() {
    if (isRunning) return;
    isRunning = true;
    btnRunTest.disabled = true;
    btnAutoFix.disabled = true;

    clearTerminal();

    appendLine('<span class="prompt">$ </span><span class="command">tracking-agent scan --mode=full</span>');
    await delay(600);

    appendLine('<span class="info">▸ Initializing Tracking Tester AI v2.4...</span>');
    await delay(500);

    appendLine('<span class="comment">  Loading GTM container: GTM-WK4Q9RD2</span>');
    await delay(400);

    appendLine('<span class="comment">  Loading GA4 property: shourov_25</span>');
    await delay(400);

    appendLine('<span class="info">▸ Scanning event configuration...</span>');
    await delay(300);

    // Progress bar
    const progressBar = appendProgress();
    const events = ['view_item', 'add_to_cart', 'begin_checkout', 'purchase', 'remove_from_cart', 'view_cart', 'page_view', 'user_engagement'];

    for (let i = 0; i < events.length; i++) {
      await delay(250);
      const percent = Math.round(((i + 1) / events.length) * 100);
      progressBar.style.width = percent + '%';
    }

    await delay(400);

    appendLine('<span class="info">▸ Analyzing event parameters &amp; triggers...</span>');
    await delay(600);

    appendLine('<span class="info">▸ Checking funnel integrity...</span>');
    await delay(500);

    appendLine('<span class="info">▸ Verifying data layer variables...</span>');
    await delay(500);

    appendLine('');
    appendLine('<span class="success">━━━ SCAN COMPLETE ━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>');
    await delay(300);

    // Results
    const scanResults = [
      { event: 'page_view', status: 'OK', details: 'Firing correctly on all pages' },
      { event: 'view_item', status: 'OK', details: 'All parameters present' },
      { event: 'add_to_cart', status: 'Warning', details: 'Missing "item_category" param' },
      { event: 'begin_checkout', status: 'OK', details: 'Trigger verified' },
      { event: 'purchase', status: 'Error', details: 'Duplicate event detected' },
      { event: 'remove_from_cart', status: 'Warning', details: 'Event name mismatch: "removeFromCart"' },
      { event: 'view_cart', status: 'OK', details: 'All parameters present' },
      { event: 'user_engagement', status: 'OK', details: 'Auto-tracked' },
    ];

    appendScanTable(scanResults);
    await delay(300);

    const okCount = scanResults.filter(r => r.status === 'OK').length;
    const warnCount = scanResults.filter(r => r.status === 'Warning').length;
    const errCount = scanResults.filter(r => r.status === 'Error').length;

    appendLine('');
    appendLine(`<span class="comment">Summary: </span><span class="success">${okCount} OK</span>  <span class="warning">${warnCount} Warnings</span>  <span class="error">${errCount} Errors</span>`);
    appendLine('');
    appendLine('<span class="warning">⚠ Issues detected. Click "Auto Fix" to resolve.</span>');

    btnAutoFix.disabled = false;
    isRunning = false;
  }

  // ============ Agent 2: Auto Fix ============
  async function runAutoFix() {
    if (isRunning) return;
    isRunning = true;
    btnAutoFix.disabled = true;
    btnRunTest.disabled = true;

    appendLine('');
    appendLine('<span class="prompt">$ </span><span class="command">tracking-agent fix --auto</span>');
    await delay(600);

    appendLine('<span class="info">▸ Initializing Auto Fix AI v2.4...</span>');
    await delay(500);

    appendLine('<span class="info">▸ Analyzing 2 warnings and 1 error...</span>');
    await delay(600);

    // Fix 1: Missing parameter
    appendLine('');
    appendLine('<span class="warning">FIX 1: add_to_cart — Adding missing "item_category" parameter</span>');
    await delay(400);

    appendFixComparison([{
      before: 'event: "add_to_cart"\nparams: { item_id, item_name, value }',
      after: 'event: "add_to_cart"\nparams: { item_id, item_name, value, item_category }'
    }]);
    await delay(500);

    appendLine('<span class="success">  ✓ Parameter "item_category" added to data layer push</span>');
    await delay(400);

    // Fix 2: Duplicate event
    appendLine('');
    appendLine('<span class="error">FIX 2: purchase — Removing duplicate trigger</span>');
    await delay(400);

    appendFixComparison([{
      before: 'Triggers: [purchase Trigger, purchase Trigger (copy)]',
      after: 'Triggers: [purchase Trigger]'
    }]);
    await delay(500);

    appendLine('<span class="success">  ✓ Duplicate trigger removed. Single fire verified.</span>');
    await delay(400);

    // Fix 3: Event naming
    appendLine('');
    appendLine('<span class="warning">FIX 3: remove_from_cart — Fixing event name format</span>');
    await delay(400);

    appendFixComparison([{
      before: 'event: "removeFromCart"  // camelCase',
      after: 'event: "remove_from_cart"  // snake_case (GA4 standard)'
    }]);
    await delay(500);

    appendLine('<span class="success">  ✓ Event name updated to GA4 snake_case convention</span>');
    await delay(600);

    // Summary
    appendLine('');
    appendLine('<span class="success">━━━ ALL FIXES APPLIED ━━━━━━━━━━━━━━━━━━━━━━━</span>');
    await delay(300);

    appendLine('<span class="success">✓ 3/3 issues resolved successfully</span>');
    appendLine('<span class="comment">  • 1 missing parameter added</span>');
    appendLine('<span class="comment">  • 1 duplicate trigger removed</span>');
    appendLine('<span class="comment">  • 1 event name corrected</span>');
    appendLine('');
    appendLine('<span class="success">▸ Tracking system is now optimized and clean! 🎯</span>');
    appendLine('');
    appendLine('<span class="prompt">$ </span><span class="comment">_</span>');

    btnRunTest.disabled = false;
    isRunning = false;
  }

  // Event listeners
  btnRunTest.addEventListener('click', runTrackingTest);
  btnAutoFix.addEventListener('click', runAutoFix);
}
