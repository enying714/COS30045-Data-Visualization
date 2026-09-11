// faq.js
// Simple accordion behaviour for the Home page FAQ section
document.addEventListener('DOMContentLoaded', function () {
  var questions = document.querySelectorAll('.faq-question');

  questions.forEach(function (button) {
    button.addEventListener('click', function () {
      var expanded = button.getAttribute('aria-expanded') === 'true';
      var answer = document.getElementById(button.getAttribute('aria-controls'));

      // toggle this item
      button.setAttribute('aria-expanded', String(!expanded));

      if (!expanded) {
        // opening: expand to the answer's natural height
        answer.style.maxHeight = answer.scrollHeight + 'px';
      } else {
        // closing: collapse back to 0
        answer.style.maxHeight = '0px';
      }
    });
  });
});
