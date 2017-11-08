var path = require('path');

module.exports = {

    //  Defines the entrypoint of our application.
    entry: path.resolve(__dirname, './scripts/js/**/*.js*'),

    //  Bundle to a ./build/bundle.js file.
    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'sample-distributon-graph.js'
    },

    //  Use babel for anything that is *.js or *.jsx.
    module: {
    }
};