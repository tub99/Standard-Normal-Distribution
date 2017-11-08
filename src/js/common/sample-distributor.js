/**
 * This class will be containing the necessary formulas
 * for sample distribution like getMean/Standard Deviation,etc
 */

function SampleDistributor(dataSet) {
    var data = dataSet.data,
        getIndividualStandardDeviation = function (observedVal, mean) {

        },
        getIndividualVariance = function (observedVal, mean) {
            return Math.pow((observedVal - mean), 2) / data.length;
        };
    this.getMean = function () {
        var sum = data.reduce(function (a, b) {
            return a + b;
        });
        return sum / data.length;
    };
    this.getTotalVariance = function () {
        var mean = this.getMean(),
            sum = 0;
        for (var i of data) {
           sum += getIndividualVariance(data[i], mean);
        }
        return Math.sqrt(sum)
    };
    this.getStandardDeviation = function () {

    };
    this.generateProbablisticValue = function (observedVal) {

    }
}