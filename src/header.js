(function () {
function create(window) {
  if (!window) {
    window = require('jsdom').jsdom().createWindow();
    window.location = require('location');
    window.navigator = require('navigator');
    window.XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
  }

  // end npm / ender header

