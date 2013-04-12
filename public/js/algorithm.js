/**
 * Author: Ken
 * Date: 11/04/2013
 * Time: 21:47
 */
define(function() {
    return Algorithm;
});
/**
 * core Algorithm
 * how to use:
 * 1, configuration
 * 2, do insertionSort
 * 3, do removeDuplicate
 * 4, do lengthComparison, which will give the final result;
 * parse data->Sort->remove duplicate->comparison->give result
 * @constructor
 */
function Algorithm(){
    var self = this;

    self.data = null;
    self.sData = null;
    self.resultSet = [];

    self.sortedData = null;
    self.uniqueSortedData = null;

    self.lengthOfInput = 0;

    self.duplicate = {
        length : 0
    };

    self.specialResult = [];

    /**
     * configure the algorithm
     * @param data {Array} an array that return by `ParseData`
     * this is used for sorting
     * @param sData {[Object]} an array of Object that return by `ParseData`
     * this is used for special case
     */
    self.config = function (data,sData) {
        if (data){
            self.data = data;
            self.lengthOfInput = data.length;
        }
        if(!self.sData) self.sData = sData ? sData : null;
    }
    /**
     * return a sorted array
     * which will also be stored in `sortedData` in the Algorithm
     * @returns {Array}
     */
    self.insertionSort = function (){
        var result = self.data;
        self.sortedData = [];

        // length of the array
        var length = result.length;
        //the key to compare and temp value
        var key;

        for (var i=0; i < length; i++) {
            key = parseFloat(result[i]);
            for (var j=i-1; j > -1 && parseFloat(result[j]) > key; j--) {
                result[j+1] = parseFloat(result[j]);
            }
            result[j+1] = key;
        }
        self.sortedData = result;
    return result;
    }
    /**
     * remove duplicated elements from the result of the `insertionSort`
     * the returned data will also stored in `uniqueSortedData`
     * this function will also mark `isTicked` in `sData`
     * @returns {Array}
     */
    self.removeDuplicate = function () {
        var result = self.sortedData;

        self.uniqueSortedData = [];
        for (var i = 0; i < result.length - 1;) {
            if (result[i + 1] == result[i]) {
                // find duplicate
                if (self.duplicate[result[i]]){
                    // mark is ticked, which is used for special case
                    if(self.sData) {
                        for (var j = 0; j < self.sData.length; j++){
                            if (self.sData[j][result[i]] == [result[i]]){
                                self.sData[j].isTicked = true;
                            }
                        }
                    }
                }
                else {
                    // the first time to meet duplicate
                    self.duplicate[result[i]] = 1;
                    self.specialResult.push(result[i]);
                    if(self.sData) {
                        for (var j = 0; j < self.sData.length; j++){
                            if (self.sData[j][result[i]] == [result[i]]){
                                self.sData[j].isTicked = true;
                            }
                        }
                    }
                }
                // remove duplicated
                result.splice(i+1,1);
            }else{
                // no duplicate
                i++;
            }
        }

        self.uniqueSortedData = result;
        self.resultSet.push(result);
        return result;
    }
    /**
     * return true if the case is not covered by `lengthComparison`
     * @returns {boolean}
     */
    self.isSpecialCase = function(){
        var countTicked = 0;
        var sDataLength = self.sData.length;
        for (var i = 0; i < self.sData.length; i++){
            if(self.sData[i].isTicked) countTicked++;
        }
        if (sDataLength == countTicked){
            return true;
        }
        else return false;
    }
    /**
     * return Final array
     * my friend 1009 will have higher priority,
     * if the output array is the shortest at the same time.
     * @returns {Array}
     */
    self.lengthComparison = function (){
        if(self.resultSet.length != 2) return null;

        if (self.sData && self.isSpecialCase()) {
            return self.specialResult;
        }

        var helsinki = self.resultSet[0];
        var newYork = self.resultSet[1];

        if (helsinki.length > newYork.length){
            return newYork;
        }else if (helsinki.length < newYork.length){
            return helsinki;
        }else {
            // my friend is 1009 in helsinki
            return helsinki;
        }
    }

    /**
     * reset the data in Algorithm
     * this will guarantee that its function works fine
     */
    self.reset = function (){
        self.data = null;
        self.resultSet = [];
        self.sortedData = null;
        self.uniqueSortedData = null;
        self.duplicate = {};
        self.lengthOfInput = 0;
        self.sData = null;
    }
}