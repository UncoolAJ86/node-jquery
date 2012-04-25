var fs = require("fs"),
    path = require("path"),
    http = require("http");

var location = "http://code.jquery.com/jquery-" + process.env.npm_package_version + ".js";
var distDir = path.join(process.cwd(), "dist");
var distFile = path.join(distDir, "node-jquery.js");
if (path.existsSync(distFile)) {
    process.exit(0);
}

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
