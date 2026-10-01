// calculator.js
// Interactive Appliance Energy Calculator.
// Demonstrates: event handling, reading values from the DOM, calculations
// with variables/functions, and dynamically updating existing DOM nodes.

(function () {
  'use strict';

  // Placeholder wattage data
  var APPLIANCES = [
    { id: 'custom', name: 'Custom appliance (enter watts)', watts: null },
    { id: 'tv-led-43', name: 'LED TV - 43"', watts: 65 },
    { id: 'tv-oled-55', name: 'OLED TV - 55"', watts: 110 },
    { id: 'tv-qled-65', name: 'QLED TV - 65"', watts: 150 },
    { id: 'fridge', name: 'Refrigerator (frost-free)', watts: 150 },
    { id: 'aircon', name: 'Split system air conditioner', watts: 1200 },
    { id: 'washer', name: 'Washing machine (per cycle avg)', watts: 500 },
    { id: 'kettle', name: 'Electric kettle', watts: 2000 },
    { id: 'laptop', name: 'Laptop computer', watts: 50 }
  ];

  var STORAGE_KEY = 'aec-calculator-inputs';

  var form, applianceSelect, wattsField, hoursField, priceField, resultsPanel, statusEl;

  document.addEventListener('DOMContentLoaded', init);

  function init() {
    form = document.getElementById('calculator-form');
    if (!form) return; // calculator markup isn't on this page

    applianceSelect = document.getElementById('calc-appliance');
    wattsField = document.getElementById('calc-watts');
    hoursField = document.getElementById('calc-hours');
    priceField = document.getElementById('calc-price');
    resultsPanel = document.getElementById('calc-results-body');
    statusEl = document.getElementById('calc-status');

    populateApplianceOptions();
    restoreSavedInputs();

    applianceSelect.addEventListener('change', handleApplianceChange);
    form.addEventListener('input', handleFormChange);
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      handleFormChange();
    });

    // run once on load so the results panel is populated immediately
    handleFormChange();
  }

  function populateApplianceOptions() {
    APPLIANCES.forEach(function (appliance) {
      var option = document.createElement('option');
      option.value = appliance.id;
      option.textContent = appliance.watts
        ? appliance.name + ' (~' + appliance.watts + ' W)'
        : appliance.name;
      applianceSelect.appendChild(option);
    });
  }

  function handleApplianceChange() {
    var chosen = findAppliance(applianceSelect.value);
    if (chosen && chosen.watts !== null) {
      wattsField.value = chosen.watts;
      wattsField.readOnly = true;
    } else {
      wattsField.readOnly = false;
      wattsField.focus();
    }
    handleFormChange();
  }

  function findAppliance(id) {
    for (var i = 0; i < APPLIANCES.length; i++) {
      if (APPLIANCES[i].id === id) return APPLIANCES[i];
    }
    return null;
  }

  // validation

  function validateField(input, min, max, message) {
    var wrapper = input.closest('.calc-field');
    var errorEl = wrapper.querySelector('.calc-error');
    var value = parseFloat(input.value);
    var valid = input.value.trim() !== '' && !isNaN(value) && value >= min && value <= max;

    wrapper.classList.toggle('has-error', !valid);
    errorEl.textContent = valid ? '' : message;

    return valid ? value : null;
  }

  // main calculation

  function handleFormChange() {
    var watts = validateField(wattsField, 1, 20000, 'Enter a wattage between 1 and 20,000 W.');
    var hours = validateField(hoursField, 0, 24, 'Enter hours used per day, from 0 to 24.');
    var price = validateField(priceField, 1, 200, 'Enter a price between 1 and 200 cents/kWh.');

    if (watts === null || hours === null || price === null) {
      statusEl.textContent = 'Fix the highlighted field(s) to see results.';
      clearResults();
      return;
    }

    var dailyKwh = (watts * hours) / 1000;
    var monthlyKwh = dailyKwh * 30;
    var yearlyKwh = dailyKwh * 365;
    var yearlyCost = (yearlyKwh * price) / 100; // cents -> dollars
    var monthlyCost = (monthlyKwh * price) / 100;

    renderResults({
      dailyKwh: dailyKwh,
      monthlyKwh: monthlyKwh,
      yearlyKwh: yearlyKwh,
      monthlyCost: monthlyCost,
      yearlyCost: yearlyCost
    });

    statusEl.textContent = 'Updated ' + new Date().toLocaleTimeString();
    saveInputs();
  }

  function clearResults() {
    resultsPanel.querySelectorAll('.result-value').forEach(function (el) {
      el.textContent = '—';
    });
  }

  function renderResults(r) {
    // updates existing DOM elements rather than duplicating them
    setResult('result-daily-kwh', r.dailyKwh.toFixed(2) + ' kWh');
    setResult('result-monthly-kwh', r.monthlyKwh.toFixed(1) + ' kWh');
    setResult('result-yearly-kwh', r.yearlyKwh.toFixed(0) + ' kWh');
    setResult('result-monthly-cost', '$' + r.monthlyCost.toFixed(2));
    setResult('result-yearly-cost', '$' + r.yearlyCost.toFixed(2));
  }

  function setResult(id, text) {
    var el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  // persistence so the calculator survives a refresh
  function saveInputs() {
    var data = {
      appliance: applianceSelect.value,
      watts: wattsField.value,
      hours: hoursField.value,
      price: priceField.value
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      // localStorage may be unavailable (e.g. private browsing) - fail silently
    }
  }

  function restoreSavedInputs() {
    var raw;
    try {
      raw = localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return;
    }
    if (!raw) return;

    try {
      var data = JSON.parse(raw);
      if (data.appliance) applianceSelect.value = data.appliance;
      var chosen = findAppliance(applianceSelect.value);
      wattsField.readOnly = !!(chosen && chosen.watts !== null);
      if (data.watts) wattsField.value = data.watts;
      if (data.hours) hoursField.value = data.hours;
      if (data.price) priceField.value = data.price;
    } catch (e) {
      // ignore malformed saved data
    }
  }
})();
