/**
 * Author: Ken
 * Date: 12/04/2013
 * Time: 00:00
 */
define(function() {
    return ParseData;
});
/**
 * Parse data from input,
 * the input has to be the format exactly,
 * ['1113 2002','1114 2001']
 * @constructor
 */
function ParseData(){
    var self = this;
    self.dataToParse = null;

    self.sData = [];
    /**
     * configuration
     * @param dataToParse
     */
    self.config = function (dataToParse){
        self.dataToParse = dataToParse ? dataToParse : null;
    }
    /**
     * return an array combined with two elements,
     * each of the elements is an array of number
     * Moreover, it sets its sData, which is an array
     * of JSON, the format is e.g
     * [{1009:1009,2000:2000,isTicked: false}]
     * where the numbers are exactly the same as input
     * but type is {number}
     * @returns {Array}
     */
    self.parse = function () {
        var helsinki = [];
        var newYork = [];
        var resultSet = [];

        for (var i = 0; i < self.dataToParse.length; i++){
            var a = parseFloat(self.dataToParse[i].match(/1\d{3}/).shift());
            var b = parseFloat(self.dataToParse[i].match(/2\d{3}/).shift());
            helsinki.push(a);
            newYork.push(b);
            var o = {isTicked:false};
            o[a] = a;
            o[b] = b;
            self.sData.push(o);
        }
        resultSet.push(helsinki);
        resultSet.push(newYork);

        // [helsinki, newYork]
        return resultSet;
    }
}