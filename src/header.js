(function () {
function create(window) {
  var location, navigator, XMLHttpRequest;

  window = window || require('jsdom').jsdom().createWindow();
  window.location = window.location || require('location');
  window.navigator = window.navigator || require('navigator');

  if (!window.XMLHttpRequest && 'function' !== typeof window.ActiveXObject) {
    window.XMLHttpRequest = require('xmlhttprequest'); // require('XMLHttpRequest');
    // TODO repackage XMLHttpRequest
  }

  // end npm / ender header

