function Graph() {
    var board,
        pol1,
        pol2,

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
        createTicks = function (xAxis) {
            var ticks = board.create('ticks', [xAxis], {
                insertTicks: true,
                ticksDistance: 5,
                drawZero: true,
                drawLabels: true,
                minorTicks: 0,
                label: {
                    offset: [0, -15]
                }
            });

        },
        createXAxis = function () {
            xaxis = board.create('axis', [
                [0, 0],
                [1, 0]
            ], {
                grid: false,
                highlight: false
            });
            xaxis.removeAllTicks();
            createTicks(xaxis);
        },

        ceateYAxis = function () {
            yaxis = board.create('axis', [
                [0, 0],
                [0, 1]
            ], {
                grid: false,
                ticks: {
                    drawZero: true
                },
                highlight: false
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
        addClassToJSXElement = function (element, classname) {
            setTimeout(function () {
                var el = document.getElementById(`box_${element.id}Label`);
                el.className += (' ' + classname);
            }, 0)

        },
        generateLabels = function (labelObj, scrubberConfig) {
            var xSpace = scrubberConfig.gapX,
                ySpace = scrubberConfig.posY,
                x = +(labelObj.presentValue),
                labelProps = {
                    highlight: false
                },
                leftAreaLabel = board.create('text', [x - xSpace[0], ySpace[0], ''], labelProps),
                rightAreaLabel = board.create('text', [x + xSpace[1], ySpace[1], ''], labelProps),
                xLabel = board.create('text', [x - xSpace[2], ySpace[2], ''], labelProps);

            // add custom classes    
            addClassToJSXElement(leftAreaLabel, "JXGtextleft");
            addClassToJSXElement(rightAreaLabel, "JXGtextright");
            addClassToJSXElement(xLabel, "JXGtextbottom");
            leftAreaLabel.setLabel(labelObj.leftArea.toString());
            rightAreaLabel.setLabel(labelObj.rightArea.toString());
            xLabel.setLabel(labelObj.presentValue.toString());

            return {
                leftLabel: leftAreaLabel,
                rightLabel: rightAreaLabel,
                xLabel: xLabel
            };

        },
        setScrubberPolygon = function (arrowObj, refGliderPos, extremeties) {

            var arrLeft = arrowObj.arrowLeft,
                arrRt = arrowObj.arrowRt;
            arrLeft.vertices[0].setPosition(JXG.COORDS_BY_USER, [refGliderPos - 0.4, arrLeft.vertices[0].Y()])
            arrLeft.vertices[1].setPosition(JXG.COORDS_BY_USER, [refGliderPos - 0.1, arrLeft.vertices[1].Y()])
            arrLeft.vertices[2].setPosition(JXG.COORDS_BY_USER, [refGliderPos - 0.1, arrLeft.vertices[2].Y()])
            arrRt.vertices[0].setPosition(JXG.COORDS_BY_USER, [refGliderPos + 0.4, arrRt.vertices[0].Y()])
            arrRt.vertices[1].setPosition(JXG.COORDS_BY_USER, [refGliderPos + 0.1, arrRt.vertices[1].Y()])
            arrRt.vertices[2].setPosition(JXG.COORDS_BY_USER, [refGliderPos + 0.1, arrRt.vertices[2].Y()]);
            // Checking the extremities and setting position accordingly
            if (extremeties && refGliderPos >= 3.5) {
                arrLeft.vertices[0].setPosition(JXG.COORDS_BY_USER, [extremeties[1] - 0.4, arrLeft.vertices[0].Y()])
                arrLeft.vertices[1].setPosition(JXG.COORDS_BY_USER, [extremeties[1] - 0.1, arrLeft.vertices[1].Y()])
                arrLeft.vertices[2].setPosition(JXG.COORDS_BY_USER, [extremeties[1] - 0.1, arrLeft.vertices[2].Y()])
                arrRt.vertices[0].setPosition(JXG.COORDS_BY_USER, [extremeties[1] + 0.4, arrRt.vertices[0].Y()])
                arrRt.vertices[1].setPosition(JXG.COORDS_BY_USER, [extremeties[1] + 0.1, arrRt.vertices[1].Y()])
                arrRt.vertices[2].setPosition(JXG.COORDS_BY_USER, [extremeties[1] + 0.1, arrRt.vertices[2].Y()]);
            } else if (extremeties && refGliderPos <= -3.5) {
                arrLeft.vertices[0].setPosition(JXG.COORDS_BY_USER, [extremeties[0] - 0.4, arrLeft.vertices[0].Y()])
                arrLeft.vertices[1].setPosition(JXG.COORDS_BY_USER, [extremeties[0] - 0.1, arrLeft.vertices[1].Y()])
                arrLeft.vertices[2].setPosition(JXG.COORDS_BY_USER, [extremeties[0] - 0.1, arrLeft.vertices[2].Y()])
                arrRt.vertices[0].setPosition(JXG.COORDS_BY_USER, [extremeties[0] + 0.4, arrRt.vertices[0].Y()])
                arrRt.vertices[1].setPosition(JXG.COORDS_BY_USER, [extremeties[0] + 0.1, arrRt.vertices[1].Y()])
                arrRt.vertices[2].setPosition(JXG.COORDS_BY_USER, [extremeties[0] + 0.1, arrRt.vertices[2].Y()]);
            }

        },
        adjustLabelCoordinates = function (refGlider2, endCoords, labels, area, xSpace, ySpace) {
            var rtAreaLabelPos = refGlider2.position + xSpace[1];
            if (refGlider2.position >= endCoords) {
                labels.leftLabel.setPosition(JXG.COORDS_BY_USER, [refGlider2.position - xSpace[0], labels.leftLabel.Y()]);
                //labels.leftLabel.setLabel(area.leftArea.toString());
                labels.rightLabel.setPosition(JXG.COORDS_BY_USER, [rtAreaLabelPos, labels.rightLabel.Y()]);
                //labels.rightLabel.setLabel(area.rightArea.toString());
                labels.xLabel.setPosition(JXG.COORDS_BY_USER, [refGlider2.position - xSpace[2], ySpace[2]]);
            }
        },
        generateScrubberPolygon = function (arrow) {
            var arrowProps = {
                name: 'pol1',
                withLabel: false,
                fillColor: arrow.left.color,
                highlight: false,
                strokecolor: arrow.left.color,
                fillopacity: 1.0,
                vertices: {
                    layer: 0,
                    visible: false,
                    fixed: true
                }
            };
            pol1 = board.create('polygon', arrow.left.pointsArray, arrowProps);
            arrowProps.name = 'pol2';
            arrowProps.fillColor = arrow.right.color;
            arrowProps.strokecolor = arrow.right.color;
            pol2 = board.create('polygon', arrow.right.pointsArray, arrowProps);
        },
        getArea = function (x) {
            // TODO: get val from configs   
            var sd = 1;
            var areaFirstHalf = (1 / (Math.sqrt(2 * Math.PI) * sd)) * Math.pow(Math.E, (-0.5 * (x * x))),
                areaSecondHalf = 1 - areaFirstHalf;
            return {
                presentValue: x.toFixed(2),
                leftArea: x < 0 ? areaFirstHalf.toFixed(4) : areaSecondHalf.toFixed(4),
                rightArea: x < 0 ? areaSecondHalf.toFixed(4) : areaFirstHalf.toFixed(4)
            };
        },
        attatchEventsToScrubber = function (scrubberPoint, refGlider2, scrubber, labels, scrubberLine) {

            refGlider2.on('drag', function (evt) {
                var extremeties = scrubber.extremeties,
                    xSpace = scrubber.gapX,
                    ySpace = scrubber.posY;

                scrubberPoint.position = refGlider2.position;
                var area = getArea(scrubberPoint.position),
                    rtAreaLabelPos = refGlider2.position + xSpace[1];
                // Update Scrubber Handle
                scrubberLine.point1.setPosition(JXG.COORDS_BY_USER, [refGlider2.position, scrubberLine.point1.Y()]);
                scrubberLine.point2.setPosition(JXG.COORDS_BY_USER, [refGlider2.position, scrubberLine.point2.Y()]);
                // Updating polygon arrow
                setScrubberPolygon({
                    arrowLeft: pol1,
                    arrowRt: pol2
                }, refGlider2.position, extremeties);
                // Updating Labels with drag
                labels.leftLabel.setPosition(JXG.COORDS_BY_USER, [refGlider2.position - xSpace[0], labels.leftLabel.Y()]);
                labels.leftLabel.setLabel(area.leftArea.toString());
                labels.rightLabel.setPosition(JXG.COORDS_BY_USER, [rtAreaLabelPos, labels.rightLabel.Y()]);
                labels.rightLabel.setLabel(area.rightArea.toString());
                labels.xLabel.setPosition(JXG.COORDS_BY_USER, [refGlider2.position - xSpace[2], ySpace[2]]);
                labels.xLabel.setLabel(refGlider2.position.toFixed(2).toString());
                // adjust Rt area labelPositioon
                //adjustLabelCoordinates(refGlider2,3.4,labels,area, xSpace, ySpace);
                // Restricting user drag beyond extremes
                if (refGlider2.position <= extremeties[0]) {
                    // returning false or stop event is not working
                    // hence setting to extreme positions 
                    refGlider2.position = scrubberPoint.position = extremeties[0];
                    //Update Scrubber Handler
                    scrubberLine.point1.setPosition(JXG.COORDS_BY_USER, [refGlider2.position, scrubberLine.point1.Y()]);
                    scrubberLine.point2.setPosition(JXG.COORDS_BY_USER, [refGlider2.position, scrubberLine.point2.Y()]);
                    //Update Labels Position
                    labels.xLabel.setPosition(JXG.COORDS_BY_USER, [extremeties[0], -0.05]);
                    labels.rightLabel.setPosition(JXG.COORDS_BY_USER, [extremeties[0], labels.rightLabel.Y()]);
                    labels.leftLabel.setPosition(JXG.COORDS_BY_USER, [extremeties[0] - 1.5, labels.rightLabel.Y()]);
                    labels.xLabel.setLabel(extremeties[0].toString());
                    // updating extreme area value // TODO: move to config
                    labels.leftLabel.setLabel('0.0000');
                    labels.rightLabel.setLabel('1.0000');
                } else if (refGlider2.position >= extremeties[1]) {
                    refGlider2.position = scrubberPoint.position = extremeties[1];
                    //Update Scrubber Handler
                    scrubberLine.point1.setPosition(JXG.COORDS_BY_USER, [refGlider2.position, scrubberLine.point1.Y()]);
                    scrubberLine.point2.setPosition(JXG.COORDS_BY_USER, [refGlider2.position, scrubberLine.point2.Y()]);
                    //Update Labels Position
                    labels.xLabel.setPosition(JXG.COORDS_BY_USER, [extremeties[1], -0.05]);
                    labels.rightLabel.setPosition(JXG.COORDS_BY_USER, [extremeties[1] - 0.05, labels.rightLabel.Y()]);
                    labels.leftLabel.setPosition(JXG.COORDS_BY_USER, [extremeties[1] - 1.5, labels.rightLabel.Y()]);
                    labels.xLabel.setLabel(extremeties[1].toString());
                    // updating extreme area value // TODO: move to config
                    labels.leftLabel.setLabel('1.0000');
                    labels.rightLabel.setLabel('0.0000');
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
                    highlight: false,
                    color: '#a86500',
                    curveLeft: {
                        showInfoBox: false,
                        visible: false
                    },
                    curveRight: {
                        visible: false
                    }

                });
            integralCurve.isDraggable = false;
            // TODO : draw referrence scrubber
            var scrubberRefLine = BOARD.create('functiongraph', [function (x) {
                return scrubber.scrubberYPos;
            }], {
                visible: false
            });
            var refGlider = BOARD.create('glider', [limits[0], limits[1], scrubberRefLine], {
                showInfoBox: false,
                highlight: false,
                withLabel: false,
                size: 16,
                fillopacity: 0.0,
                strokeOpacity: 0.0
            });
            var initX = integralCurve.curveLeft.position,
                scrubberLine = BOARD.create('line', [
                    [initX, scrubber.scrubberY1],
                    [initX, scrubber.scrubberY2]
                ], {
                    straightFirst: false,
                    straightLast: false,
                    strokeWidth: scrubber.scrubberWidth,
                    color: scrubber.scrubberColor,
                    highlight: false,
                    isDraggable: false
                }),
                areaInfo = getArea(initX),
                labels = generateLabels(areaInfo, scrubber);
            // stopping drag on scrubber Line
            scrubberLine.isDraggable = false;
            generateScrubberPolygon(scrubber.arrow);
            attatchEventsToScrubber(integralCurve.curveLeft, refGlider, scrubber, labels, scrubberLine);
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