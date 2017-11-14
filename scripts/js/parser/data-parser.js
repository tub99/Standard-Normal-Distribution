/**
 * This class moulds the client data so that graph class can render it. 
 */
function DataParser() {
    var parsedData = {};
    this.generateDefaultGraphConfigs = function () {
        return {
            STANDARD_DEVIATION: 1,
            MEAN: 0,

            axis: {
                axisLimits: [-5, 0.5, 5, -0.1],
                hasXAxis: true,
                hasYAxis: true
            },
            graph: {
                cosmetics: {
                    opacity: 0.3,
                    color: '#28509f'


                },
                type: 'normal',
                area: {
                    spacing: 0.2,
                    dualColor: '#a86500',
                    color: '',
                    scrubberColor: '',
                    scrubber: {
                        leftAreaColor:'',
                        rightAreaColor: '#a86500',
                        extremeties: [-3.5, 3.5],
                        scrubberLimits: [1, 4.0],
                        scrubberYPos: 0.3,
                        scrubberY1: 0.45,
                        scrubberY2: -0.08,
                        scrubberWidth: 2,
                        scrubberColor: '#f99902',
                        gapX: [1.5, 0.1, -0.1],
                        posY: [0.1, 0.1, -0.08],
                        arrow: {
                            left: {
                                color: '#3366CC',
                                opacity: 1.0,
                                pointsArray: [
                                    [0.60, 0.30],
                                    [0.9, 0.32],
                                    [0.9, 0.28]
                                ]
                            },
                            right: {
                                color: '#FF9900',
                                opacity: 1.0,
                                pointsArray: [
                                    [1.4, 0.30],
                                    [1.1, 0.32],
                                    [1.1, 0.28]
                                ]

                            }

                        }
                    },
                    extremetiesArea: [0.0000, 1.000]

                }

            },


        }
    };

    this.getDataAsync = function (url) {
        var jqxhr = $.ajax(url)
            .done(function () {
                // if data available
                // parse data else generateDefault configs
            })
            .fail(function () {


            })
            .always(function () {

            });

    }
}