/**
 * An abstraction over the graph class which communicates with client data
 * and parser. Main class from where all necessary calls are made.
 */
function GraphManager() {
    this.parser = new DataParser();
}
GraphManager.prototype.createGraph = function () {
    var graphConfiguration = this.parser.generateDefaultGraphConfigs(),
        graph = new Graph(),

        /**
         * Rendering the graph based on user selection of mean and standard deviation
         *  */
        hasScrubber = $('#contactChoice2').is(':checked');
    $(".meanRadio").off('click').on('click', function () {
        hasScrubber = $('#contactChoice2').is(':checked');
        graph.renderGraph(graphConfiguration, graphConfiguration.axis, hasScrubber);
    });
    graph.renderGraph(graphConfiguration, graphConfiguration.axis, hasScrubber);
}
var gm = new GraphManager();
gm.createGraph();