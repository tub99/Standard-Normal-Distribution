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
                    color: 'yellow',
                    dualColor: ''

                },
                type: 'normal',
                area: {

                    color: '',
                    scrubberColor: '',
                    scrubber: {
                        extremeties: [-3.5, 3.5],
                        scrubberLimits: [1, 4.0],
                        scrubberYPos: 0.3
                    }

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