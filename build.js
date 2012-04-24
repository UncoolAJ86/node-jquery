var fs = require("fs"),
    path = require("path"),
    http = require("http");

var location = "http://code.jquery.com/jquery-1.7.2.js";
var distDir = path.join(process.cwd(), "dist");

var data = {};
var onDone = function() {
    if (!data["header"] || !data["main"] || !data["footer"]) {
        return;
    }

    var distPart = [];
    while (!path.existsSync(distDir)) {
        distPart.unshift(path.basename(distDir));
        distDir = path.dirname(distDir);
    }
    
    while (distPart.length) {
        distDir = path.join(distDir, distPart.shift());
        console.log("creating directory %s...", distDir);
        fs.mkdirSync(distDir);
    }
    
    var distFile = path.join(distDir, "node-jquery.js");
    var output = fs.createWriteStream(distFile);
    console.log("writing file %s", distFile);
    output.write(data["header"]);
    output.write(data["main"]);
    output.write(data["footer"]);
    output.end();
};
var monitor = function(name, src) {
    var buffer = "";
    src.on("data", function(d) { buffer += d; });
    src.on("end", function() { data[name] = buffer; onDone(); });
};

console.log("getting main contents via %s...", location);
http.get(require("url").parse(location), function(res) {
    monitor("main", res);
}).on("error", function(err) {
    throw err;
});

console.log("reading local sources...");
monitor("header", fs.createReadStream("src/header.js"));
monitor("footer", fs.createReadStream("src/footer.js"));
