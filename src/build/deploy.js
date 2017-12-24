const fs = require("fs");
var extract = require('extract-zip');


function replaceInFile(file, from, to) {
    fs.readFile(file, "utf8", (err, content) => {
        fs.writeFile(file, content.replace(from, to), "utf8");
    });
}

const Deploy = {
    doDeploy() {
        var PrototypePackager = require("./prototype-server/prototype-packager.js").PrototypePackager;

        PrototypePackager.packageServer(require("./prototype-server-config"), __dirname + "/../..").then(() => {
            let uploadedPath = process.cwd() + "/example.zip";
            let deployDir = `//Users/quanle/Documents/Workon/Pure-React/sample-realworld-deploy`;
            extract(uploadedPath, {dir: deployDir}, function (err) {
                fs.unlink(uploadedPath);
                fs.unlink(deployDir + "/prototype-server.json");

                replaceInFile(`${deployDir}/index.html`, `<base href="/">`, `<base href="https://quanla.github.io/pure-react-sample-realworld-pages/">`);
            });
        });

    }
};

exports.Deploy = Deploy;
