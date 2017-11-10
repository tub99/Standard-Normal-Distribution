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
        hasScrubber = false;
    $(".meanRadio").click(function () {
        var checked = $(this).attr('checked', true);
        if (checked) {
            hasScrubber= !hasScrubber;
            $(this).attr('checked', false);
        } else {
            hasScrubber=true;
            $(this).attr('checked', true);
        }
         graph.renderGraph(graphConfiguration, graphConfiguration.axis, hasScrubber);
    });
    //var hasScrubber = $('#contactChoice1').is('checked');
    // console.log(hasScrubber);
     graph.renderGraph(graphConfiguration, graphConfiguration.axis, hasScrubber);
   
}

var gm = new GraphManager();
gm.createGraph();