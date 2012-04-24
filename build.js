var fs = require("fs"),
    path = require("path");

console.log("reading sources...");
var content = [
    fs.readFileSync("src/header.js"),
    fs.readFileSync("deps/jquery.js"),
    fs.readFileSync("src/footer.js")
];


var distDir = path.join(process.cwd(), "dist");

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
console.log("writing file %s", distFile);
fs.writeFileSync(distFile, content.join(""));
