function Graph() {

    
    this.renderGraph = function () {
        var board = JXG.JSXGraph.initBoard('box', {
            axis: false,
            boundingbox: [-5, 0.5, 5, -0.5],
            grid: false
        });

        xaxis = board.create('axis', [
            [0, 0],
            [1, 0]
        ], {
            ticks: {
                insertTicks: false,
                ticksDistance: 1
            }
        });
        yaxis = board.create('axis', [
            [0, 0],
            [0, 1]
        ]);
        var e = Math.E,
            sd = 1;

        var c1 = board.create('functiongraph', [function (z) {
            var g = Math.pow(e, (-0.5 * (z * z))),
                fx = (1 / (Math.sqrt(2 * Math.PI) * sd)) * Math.pow(e, (-0.5 * (z * z)));
            return fx;
        }], {
            fillcolor: 'yellow',
            fillopacity: 0.3
        });
        var i1 = board.create('integral', [
            [-1.0, 4.0], c1
        ]);
    }
}