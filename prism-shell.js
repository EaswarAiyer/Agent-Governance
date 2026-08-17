(function () {
  "use strict";

  function brandMarkup() {
    return '<span class="prism-brand-mark" aria-hidden="true"><span></span><span></span><span></span><span></span></span>' +
      '<span class="prism-brand-copy"><strong>Endpoint Central</strong><small>Security Edition</small></span>';
  }

  function enhanceHeader() {
    var header = document.querySelector('body > .top, body > .topbar');
    if (!header) return;

    if (header.querySelector('.topbar-nav')) document.body.classList.add('prism-complex-shell');

    var existingBrand = header.querySelector('.brand');
    if (existingBrand) {
      existingBrand.innerHTML = brandMarkup();
      existingBrand.classList.add('prism-brand');
      return;
    }

    header.innerHTML = '<div class="prism-brand">' + brandMarkup() + '</div>' +
      '<div class="prism-header-context">Software Asset Management <span>/</span> AI Governance</div>' +
      '<div class="prism-header-actions">' +
        '<span class="prism-icon-button" title="Help"><i class="fa fa-question-circle"></i></span>' +
        '<span class="prism-icon-button" title="Settings"><i class="fa fa-gear"></i></span>' +
        '<span class="prism-avatar" title="easwar">EA</span>' +
      '</div>';
  }

  function enhanceSidebar() {
    var sidebar = document.querySelector('aside.side, aside.sidebar');
    if (!sidebar || sidebar.querySelector('.prism-side-heading')) return;
    var heading = document.createElement('div');
    heading.className = 'prism-side-heading';
    heading.innerHTML = '<strong>AI Governance</strong><small>Discover, control and observe</small>';
    sidebar.insertBefore(heading, sidebar.firstChild);

    var current = location.pathname.split('/').pop() || 'overview.html';
    sidebar.querySelectorAll('a[href]').forEach(function (link) {
      var href = link.getAttribute('href').split('?')[0];
      var matches = href === current ||
        (current === 'agent-details.html' && (href === 'overview.html' || href === 'ai-discovery.html')) ||
        (current === 'endpoint-details.html' && href === 'endpoints.html') ||
        (current === 'policy-details.html' && href === 'privilege-control.html') ||
        (current === 'deployment-details.html' && href === 'deployment.html') ||
        (current === 'prompt-details.html' && href === 'data-access-audit.html');
      if (matches) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      }
    });
  }

  function enhanceTables() {
    document.querySelectorAll('table').forEach(function (table) {
      if (!table.closest('.table-wrap')) {
        var wrapper = document.createElement('div');
        wrapper.className = 'table-wrap';
        table.parentNode.insertBefore(wrapper, table);
        wrapper.appendChild(table);
      }
    });
  }

  function initialize() {
    document.body.classList.add('prism-ui');
    document.body.dataset.prismPage = location.pathname.split('/').pop() || 'overview.html';
    enhanceHeader();
    enhanceSidebar();
    enhanceTables();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialize);
  else initialize();
})();
