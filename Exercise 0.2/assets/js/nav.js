// nav.js
// Handles the responsive mobile navigation toggle and writes the current
// year into the footer. Shared by every page.

document.addEventListener('DOMContentLoaded', function () {
  // mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');

  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var isOpen = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // close the mobile menu after a link is chosen
    links.addEventListener('click', function (event) {
      if (event.target.tagName === 'A') {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // footer year
  var yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
