(function () {
function create(window) {
  if (!window) {
    window = require('jsdom').jsdom().createWindow();
    
    // jsdom includes incomplete version of XHR
    window.XMLHttpRequest('xmlhtprequest').XMLHttpRequest;
    // trick jQuery into CORS support
    window.XMLHttpRequest.prototype.withCredentials = false;
  }
  var location = window.location,
      navigator = window.navigator,
      XMLHttpRequest = window.XMLHttpRequest;

  //JQUERY_SOURCE

  window.jQuery.noConflict();
  return window.jQuery;
}
module.exports = create('undefined' === typeof window ? undefined : window);
module.exports.create = create;
}());
