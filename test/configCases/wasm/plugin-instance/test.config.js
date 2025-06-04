const fs = require("fs");
const url = require("url");
const path = require("path");

module.exports = {
        findBundle() {
                return ["main.js"];
        },
        moduleScope(scope, options) {
                scope.fetch = resource =>
                        new Promise((resolve, reject) => {
                                const file = /^file:/i.test(resource)
                                        ? url.fileURLToPath(resource)
                                        : path.join(options.output.path, path.basename(resource));

                                fs.readFile(file, (err, data) => {
                                        if (err) {
                                                reject(err);
                                                return;
                                        }

                                        return resolve(
                                                new Response(data, {
                                                        headers: { "Content-Type": "application/wasm" }
                                                })
                                        );
                                });
                        });
        }
};
