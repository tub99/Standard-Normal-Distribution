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
            ], {grid:false});
        },
        ceateYAxis = function () {
            yaxis = board.create('axis', [
                [0, 0],
                [0, 1]
            ], {grid: false});
            yaxis.removeAllTicks();
        },
        generateFunctionGraph = function (graphConfigs) {
            var e = Math.E,
                sd = graphConfigs.STANDARD_DEVIATION || 1;
            var functionGraph = board.create('functiongraph', [function (z) {
                fx = (1 / (Math.sqrt(2 * Math.PI) * sd)) * Math.pow(e, (-0.5 * (z * z)));
                return fx;
            }], {
                fillcolor: 'yellow',
                fillopacity: 0.3,
                highlight: false
            });
           
            return functionGraph;
        },
        getScrubberCoords = function (e) {
            var i = 0;
            var cPos = board.getCoordsTopLeftCorner(e, i),
                absPos = JXG.getPosition(e, i),
                dx = absPos[0] - cPos[0],
                dy = absPos[1] - cPos[1];

            return new JXG.Coords(JXG.COORDS_BY_SCREEN, [dx, dy], board);
        },
        attatchEventsToScrubber = function (scrubberPoint) {
            scrubberPoint.on('drag', function (evt) {
                 if(scrubberPoint.position <= -3.5) {
                    // returning false or stop event is not working
                    // hence setting to extreme positions 
                    scrubberPoint.position = -3.5
                 } else if(scrubberPoint.position>=3.5) scrubberPoint.position = 3.5
            })
          },
        getArea = function () {

        },

        generateScrubber = function (curve, scrubberPos) {
            var integralCurve = board.create('integral', [
                [1, 4.0], curve
            ], {
                withLabel: false,
                isDraggable: false,
                curveLeft : {
                    showInfoBox : false
                },
                curveRight : {
                    visible: false
                }
            });
            attatchEventsToScrubber(integralCurve.curveLeft);
            return integralCurve;
        };

    this.renderGraph = function (graphConfigs, axisObj, hasScrubber) {
        // Iniitialize the board on which the graph will be drawn
        initializeBoard(axisObj.axisLimits, false, false, false);
        if (axisObj.hasXAxis) createXAxis();
        if (axisObj.hasYAxis) ceateYAxis();
        var functionGrpah = generateFunctionGraph(graphConfigs);
        if (hasScrubber) {
            generateScrubber(functionGrpah);
        }
    }
    var resize = function () {
        board.resizeContainer(board.containerObj.clientWidth, board.containerObj.clientHeight, true);
        board.fullUpdate();
    };
    window.onresize = resize;
}