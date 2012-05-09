(function () {
function create(window) {
  if (!window) {
    window = require('jsdom').jsdom().createWindow();
    
    // jsdom includes incomplete versions of XHR, location, and navigator;
    //   delete from window to fall through
    window.XMLHttpRequest = require('XMLHttpRequest').XMLHttpRequest;
    
    // node.js is inherently cross-origin (since there is no origin!)
    // flag to convince jQuery CORS is supported
    window.XMLHttpRequest.prototype.withCredentials = false;
  }
  
  var location = window.location,
      navigator = window.navigator,
      XMLHttpRequest = window.XMLHttpRequest;

  //JQUERY_SOURCE

  window.jQuery.noConflict();
  
  // just assume every request is cross-origin
  // window.jQuery.support.cors = true;
  return window.jQuery;
}
module.exports = create('undefined' === typeof window ? undefined : window);
module.exports.create = create;
}());
