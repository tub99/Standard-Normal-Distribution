function Graph() {
    var board,
        initializeBoard = function (axisLimits, showGrid, isNavigable, isZoomable) {
            board = JXG.JSXGraph.initBoard('box', {
                axis: false,
                boundingbox: axisLimits,
                grid: showGrid,
                showCopyright: false,
                showNavigation: isNavigable,
                showZoom: isZoomable
            });
        },
        createXAxis = function () {
            xaxis = board.create('axis', [
                [0, 0],
                [1, 0]
            ], {
                grid: false
            });
        },
        ceateYAxis = function () {
            yaxis = board.create('axis', [
                [0, 0],
                [0, 1]
            ], {
                grid: false
            });
            yaxis.removeAllTicks();
        },
        generateFunctionGraph = function (graphConfigs) {
            var e = Math.E,
                sd = graphConfigs.STANDARD_DEVIATION || 1,
                functionGraph = board.create('functiongraph', [function (z) {
                    fx = (1 / (Math.sqrt(2 * Math.PI) * sd)) * Math.pow(e, (-0.5 * (z * z)));
                    return fx;
                }], {
                    fillcolor: graphConfigs.graph.cosmetics.color,
                    fillopacity: graphConfigs.graph.cosmetics.opacity,
                    highlight: false
                });

            return functionGraph;
        },
        getScrubberCoords = function (e) {
            var i = 0,
                cPos = board.getCoordsTopLeftCorner(e, i),
                absPos = JXG.getPosition(e, i),
                dx = absPos[0] - cPos[0],
                dy = absPos[1] - cPos[1];

            return new JXG.Coords(JXG.COORDS_BY_SCREEN, [dx, dy], board);
        },
        getArea = function (x) {
            // TODO: get val from configs
            var sd = 1;
            var areaFirstHalf = (1 / (Math.sqrt(2 * Math.PI) * sd)) * Math.pow(Math.E, (-0.5 * (x * x))),
                areaSecondHalf = 1 - areaFirstHalf;
            return {
                presentValue: x,
                leftArea: areaFirstHalf,
                rightArea: areaSecondHalf
            };
        },
        attatchEventsToScrubber = function (scrubberPoint, refGlider2,  extremeties) {
            refGlider2.on('drag', function (evt) {
                scrubberPoint.position = refGlider2.position;
                let area = getArea(scrubberPoint.position);
                //console.log(area);
                if (refGlider2.position <=  extremeties[0]) {
                    // returning false or stop event is not working
                    // hence setting to extreme positions 
                    refGlider2.position = scrubberPoint.position =  extremeties[0];
                } else if (refGlider2.position >=  extremeties[1]) {
                     refGlider2.position = scrubberPoint.position =  extremeties[1];
                }
                   
            })
        },


        generateScrubber = function (curve, scrubber) {
            var limits = scrubber.scrubberLimits,
                integralCurve = board.create('integral', [
                    scrubber.scrubberLimits, curve
                ], {
                    withLabel: false,
                    isDraggable: false,
                    curveLeft: {
                        showInfoBox: false
                    },
                    curveRight: {
                        visible: false
                    }

                });

            // TODO : draw referrence scrubber
            var scrubberRefLine = BOARD.create('functiongraph', [function (x) {
                return scrubber.scrubberYPos;
            }]);
            var refGlider = BOARD.create('glider', [limits[0], limits[1], scrubberRefLine]);
            //Draw scrubber Line
            var line2 = BOARD.create("line", [integralCurve.curveLeft, [function(){
                return integralCurve.curveLeft.X()}, function(){return integralCurve.curveLeft.Y()+0.4}]], {color: 'orange'});
            attatchEventsToScrubber(integralCurve.curveLeft, refGlider, scrubber.extremeties);
            window.integral = integralCurve;
            return integralCurve;
        };
    this.getBoard = function () {
        return board;
    }
    this.renderGraph = function (graphConfigs, axisObj, hasScrubber) {
        // Iniitialize the board on which the graph will be drawn
        initializeBoard(axisObj.axisLimits, false, false, false);
        // TODO : REMOVE
        window.BOARD = this.getBoard();
        if (axisObj.hasXAxis) createXAxis();
        if (axisObj.hasYAxis) ceateYAxis();
        var functionGrpah = generateFunctionGraph(graphConfigs);
        if (hasScrubber) {
            generateScrubber(functionGrpah, graphConfigs.graph.area.scrubber);
        }
    }
    var resize = function () {
        board.resizeContainer(board.containerObj.clientWidth, board.containerObj.clientHeight, true);
        board.fullUpdate();
    };
    window.onresize = resize;
}