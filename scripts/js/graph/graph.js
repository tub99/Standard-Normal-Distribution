function Graph() {
    var board,
        initializeBoard = function (axisLimits, showGrid, isNavigable, isZoomable) {
            board = JXG.JSXGraph.initBoard('box', {
                axis: false,
                boundingbox: [-5, 0.5, 5, -0.1],
                grid: false,
                showCopyright: false,
                showNavigation: false,
                showZoom: false
            });
        },
        createXAxis = function () {
            xaxis = board.create('axis', [
                [0, 0],
                [1, 0]
            ], {
                ticks: {
                    insertTicks: false,
                    ticksDistance: 1
                }
            });
        },
        ceateYAxis = function () {
            yaxis = board.create('axis', [
                [0, 0],
                [0, 1]
            ]);
        },
        generateFunctionGraph = function (graphConfigs) {
            var e = Math.E,
                sd = graphConfigs.STANDARD_DEVIATION || 1;
            var functionGraph = board.create('functiongraph', [function (z) {
                fx = (1 / (Math.sqrt(2 * Math.PI) * sd)) * Math.pow(e, (-0.5 * (z * z)));
                return fx;
            }], {
                fillcolor: 'blue',
                fillopacity: 0.3
            });
            return functionGraph;
        },
        generateScrubber = function (curve, scrubberPos) {
            var scrubber = board.create('integral', [
                [4.0, 4.0], curve
            ], {
                withLabel: false
            });
            return scrubber;
        };

    this.renderGraph = function (graphConfigs, axisObj, hasScrubber) {
        // Iniitialize the board on which the graph will be drawn
        initializeBoard(axisObj.axisLimits, false, false, false);
        if(axisObj.hasXAxis)createXAxis();
        if(axisObj.hasYAxis)ceateYAxis();
        var functionGrpah = generateFunctionGraph(graphConfigs);
        if(hasScrubber){
            generateScrubber(functionGrpah);
        }
    }
}