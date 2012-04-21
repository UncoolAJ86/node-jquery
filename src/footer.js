
  // begin npm / ender footer
  window.jQuery.noConflict();
  return window.jQuery;
}
var jQuery = module.exports = create('undefined' === typeof window ? undefined : window);
module.exports.create = create;

// since we'll always be cross-origin, set the flag
jQuery.support.cors = true;
}());

