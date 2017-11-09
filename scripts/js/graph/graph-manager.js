/**
 * An abstraction over the graph class which communicates with client data
 * and parser. Main class from where all necessary calls are made.
 */
function GraphManager() {
    this.parser = new DataParser();
}
GraphManager.prototype.createGraph = function() {
    var graphConfiguration = this.parser.generateDefaultGraphConfigs(),
        graph = new Graph();
        graph.renderGraph(graphConfiguration, graphConfiguration.axis, true);
}

var gm = new GraphManager(); 
gm.createGraph();