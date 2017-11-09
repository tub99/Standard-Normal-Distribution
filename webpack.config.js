var path = require('path');
var glob = require("glob");
const fs = require('fs');
var fileList = [
    './scripts/js/common/ui-handler.js',
    './scripts/js/common/sample-distributor.js',
    './scripts/js/parser/data-parser.js',
    './scripts/js/graph/graph.js',
    './scripts/js/graph/graph-manager.js'
];

function getEntries() {
    return fs.readdirSync('./scripts/js/')
        .filter(
            (file) => file.match(/.*\.js$/)
        )
        .map((file) => {
            console.log(file);
            return {
                name: file.substring(0, file.length - 3),
                path: './pages/' + file
            }
        }).reduce((memo, file) => {
            memo[file.name] = file.path
            return memo;
        }, {})
}
module.exports = {

    //  Defines the entrypoint of our application.
    entry: fileList,

    //  Bundle to a ./build/bundle.js file.
    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'sample-distributon-graph.js'
    }
};