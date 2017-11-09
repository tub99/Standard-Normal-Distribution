/**
 * An abstraction over the graph class which communicates with client data
 * and parser. Main class from where all necessary calls are made.
 */
function GraphManager() {
    this.parser = new DataParser();
}
GraphManager.prototype.createGraph = function () {
    var graphConfiguration = this.parser.generateDefaultGraphConfigs(),
        graph = new Graph();
    $(".meanRadio").click(function () {
        var checked = $(this).attr('checked', true);
        if (checked) {
            $(this).attr('checked', false);
        } else {
            $(this).attr('checked', true);
        }
    });
    var hasScrubber = $('#contactChoice1').is('checked');
    console.log(hasScrubber);

    graph.renderGraph(graphConfiguration, graphConfiguration.axis, true);
}

var gm = new GraphManager();
gm.createGraph();