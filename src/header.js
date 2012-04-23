(function () {
function create(window, force) {
  if (!window) {
    force = true;
    window = require('jsdom').jsdom().createWindow();
  }
  
  if (force) {
    window.location = require('location');
    window.navigator = require('navigator');
    window.XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
  }

  // end npm / ender header

