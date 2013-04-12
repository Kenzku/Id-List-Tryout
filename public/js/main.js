/**
 * Author: Ken
 * Date: 11/04/2013
 * Time: 14:30
 */
require(["algorithm","parsedata","loader","uihandler"], function(Algorithm, ParseData, Loader, UIHandler) {

    var aLoader = new Loader();
    aLoader.loadData(successCallback);

    var aUIHandler = new UIHandler();

    function successCallback(data){
        var aParseData = new ParseData();
        var anAlgorithm = new Algorithm();

        // parse data
        aParseData.config(JSON.parse(data));
        // an array of two arrays
        var parsedData = aParseData.parse();
        var sData = aParseData.sData;

        // sort and remove duplicate
        for (var i = 0; i < parsedData.length;i++){
            anAlgorithm.config(parsedData[i],sData);
            anAlgorithm.insertionSort();
            anAlgorithm.removeDuplicate();
        }

        // comparison
        var finalResult = anAlgorithm.lengthComparison();

        var sentData = {};
        sentData.finalResult = finalResult;
        sentData.anAlgorithm = anAlgorithm;

        aUIHandler.run(sentData, buttonClickEvent);
    }

    function buttonClickEvent(data){
        if (!data) return;
        var list = document.getElementById('selectees');
        for (var i = 0; i < data.finalResult.length; i++){
            var li = document.createElement('li');
            var text = document.createTextNode(data.finalResult[i]);
            li.appendChild(text);
            list.appendChild(li);
        }
        data.anAlgorithm.reset();
    }

});