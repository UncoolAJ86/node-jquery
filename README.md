node-jQuery
====

A stupid-simple wrapper over jQuery for Node.JS. Currently for jQuery version 1.7.2.

Installing
---
    npm install git://github.com/linuxwolf/node-jquery

NOTE: This version is not published!

Building and Testing
---

    git clone https://github.com/linuxwolf/node-jquery
    cd node-query
    npm install -d
    npm test

Examples
---

    $("<h1>test passes</h1>").appendTo("body");
    console.log($("body").html());

Output:

    <h1>test passes</h1>

You may also create separate window instances

    var jsdom = require('jsdom').jsdom
      , myWindow = jsdom().createWindow()
      , $ = require('jQuery')
      , jq = require('jQuery').create()
      , jQuery = require('jQuery').create(myWindow)
      ;

    $("<h1>test passes</h1>").appendTo("body");
    console.log($("body").html());

    jq("<h2>other test passes</h2>").appendTo("body");
    console.log(jq("body").html());

    jQuery("<h3>third test passes</h3>").appendTo("body");
    console.log(jQuery("body").html());

Output:

    <h1>test passes</h1>
    <h2>other test passes</h2>
    <h3>third test passes</h3>
