/**
 * Author: Ken
 * Date: 11/04/2013
 * Time: 22:00
 */
define(['../js/algorithm.js','../js/parsedata.js','../js/loader.js','../js/uihandler.js'],
function (Algorithm,ParseData,Loader,aUIHandler) {
    return {
        RunTests: function () {
            module('Algorithm');
            test('Algorithm - configuration', function () {
                var anAlgorithm = new Algorithm();
                // default configuration
                deepEqual(anAlgorithm.data,null);
                // configuration
                anAlgorithm.config(['1111 2000','1112 2000']);
                deepEqual(anAlgorithm.data,['1111 2000','1112 2000']);
                anAlgorithm.config(['1113 2002','1114 2001']);
                deepEqual(anAlgorithm.data,['1113 2002','1114 2001']);

                // reSet
                anAlgorithm.reset();
                deepEqual(anAlgorithm.data,null);
            });

            test('Algorithm - insertion', function () {
                var anAlgorithm = new Algorithm();
                // ordered
                anAlgorithm.config([100,200,300,400,400,500]);
                deepEqual(anAlgorithm.insertionSort(),[100,200,300,400,400,500]);
                anAlgorithm.config([100,200,300,400,500]);
                deepEqual(anAlgorithm.insertionSort(),[100,200,300,400,500]);

                // reserved
                anAlgorithm.config([10000,2000,300,40,4,0.5]);
                deepEqual(anAlgorithm.insertionSort(),[0.5,4,40,300,2000,10000]);

                anAlgorithm.config([10000,2000,2000,40,4,0.5]);
                deepEqual(anAlgorithm.insertionSort(),[0.5,4,40,2000,2000,10000]);

                // all the same
                anAlgorithm.config([1,1,1,1,1,1]);
                deepEqual(anAlgorithm.insertionSort(),[1,1,1,1,1,1]);

                // random
                anAlgorithm.config([2,6,3,1,4,5]);
                deepEqual(anAlgorithm.insertionSort(),[1,2,3,4,5,6]);
                anAlgorithm.config([21,62,33,14,45,56,12,9,0,99]);
                deepEqual(anAlgorithm.insertionSort(),[0,9,12,14,21,33,45,56,62,99]);

                // string
                anAlgorithm.config(['2','6','3','1','44','5']);
                deepEqual(anAlgorithm.insertionSort(),[1,2,3,5,6,44]);

                anAlgorithm.config(['2','6','3','1','44','5',44]);
                deepEqual(anAlgorithm.insertionSort(),[1,2,3,5,6,44,44]);

            });

            test('Remove Duplicate - self.removeDuplicate - should return an array without duplicate element',function(){
                var anAlgorithm = new Algorithm();

                anAlgorithm.config([100,200,300,400,400,500]);
                deepEqual(anAlgorithm.insertionSort(),[100,200,300,400,400,500]);
                deepEqual(anAlgorithm.removeDuplicate(),[100,200,300,400,500]);
                deepEqual(anAlgorithm.uniqueSortedData,[100,200,300,400,500]);

                // reserved
                anAlgorithm.config([10000,10000,10000,2000,300,40,4,0.5,0.5,0.5]);
                deepEqual(anAlgorithm.insertionSort(),[0.5,0.5,0.5,4,40,300,2000,10000,10000,10000]);
                deepEqual(anAlgorithm.removeDuplicate(),[0.5,4,40,300,2000,10000]);
                deepEqual(anAlgorithm.uniqueSortedData,[0.5,4,40,300,2000,10000]);

                // all the same
                anAlgorithm.config([1,1,1,1,1,1]);
                deepEqual(anAlgorithm.insertionSort(),[1,1,1,1,1,1]);
                deepEqual(anAlgorithm.removeDuplicate(),[1]);
                deepEqual(anAlgorithm.uniqueSortedData,[1]);

                // random
                anAlgorithm.config([2,6,3,3,1,1,4,4,5,5]);
                deepEqual(anAlgorithm.insertionSort(),[1,1,2,3,3,4,4,5,5,6]);
                deepEqual(anAlgorithm.removeDuplicate(),[1,2,3,4,5,6]);
                deepEqual(anAlgorithm.uniqueSortedData,[1,2,3,4,5,6]);

                // string
                anAlgorithm.config(['2','6','3','1','4','5']);
                deepEqual(anAlgorithm.insertionSort(),[1,2,3,4,5,6]);
                deepEqual(anAlgorithm.uniqueSortedData,[1,2,3,4,5,6]);

                anAlgorithm.config(['21','0','33','62','33','33','99','14','99','45','56','12','9','0','99']);
                deepEqual(anAlgorithm.insertionSort(),[0,0,9,12,14,21,33,33,33,45,56,62,99,99,99]);
                deepEqual(anAlgorithm.removeDuplicate(),[0,9,12,14,21,33,45,56,62,99]);
                deepEqual(anAlgorithm.uniqueSortedData,[0,9,12,14,21,33,45,56,62,99]);

                anAlgorithm.config(['21',0,'33','62','33','33','99','14','99','45','56','12','9','0','99']);
                deepEqual(anAlgorithm.insertionSort(),[0,0,9,12,14,21,33,33,33,45,56,62,99,99,99]);
                deepEqual(anAlgorithm.removeDuplicate(),[0,9,12,14,21,33,45,56,62,99]);
                deepEqual(anAlgorithm.uniqueSortedData,[0,9,12,14,21,33,45,56,62,99]);
            });

            test('Algorithm - comparison', function () {
                var anAlgorithm = new Algorithm();

                // ----- insertion and sorting 1 ----- A greater B
                anAlgorithm.config([100,200,300,400,400,500,600]);
                deepEqual(anAlgorithm.insertionSort(),[100,200,300,400,400,500,600]); // A : 6 (7)
                deepEqual(anAlgorithm.sortedData,[100,200,300,400,400,500,600]);

                // before comparison, for each sort, you need to run remove duplicated
                anAlgorithm.removeDuplicate();

                anAlgorithm.config([10000,2000,300,4,0.5]);
                deepEqual(anAlgorithm.insertionSort(),[0.5,4,300,2000,10000]); // B : 5
                deepEqual(anAlgorithm.sortedData,[0.5,4,300,2000,10000]);

                // before comparison, for each sort, you need to run remove duplicated
                anAlgorithm.removeDuplicate();
                deepEqual(anAlgorithm.resultSet.length,2);

                // comparison
                deepEqual(anAlgorithm.lengthComparison(),[0.5,4,300,2000,10000]);

                // reSet
                anAlgorithm.reset();
                deepEqual(anAlgorithm.data,null);
                deepEqual(anAlgorithm.resultSet.length,0);

                // ----- insertion and soring 2 ----- equal
                anAlgorithm.config([100,200,300,400,400,500]);
                deepEqual(anAlgorithm.insertionSort(),[100,200,300,400,400,500]); // A : 5 (6)
                deepEqual(anAlgorithm.sortedData,[100,200,300,400,400,500]);

                // before comparison, for each sort, you need to run remove duplicated
                anAlgorithm.removeDuplicate();

                anAlgorithm.config([10000,2000,300,4,0.5]);
                deepEqual(anAlgorithm.insertionSort(),[0.5,4,300,2000,10000]); // B : 5
                deepEqual(anAlgorithm.sortedData,[0.5,4,300,2000,10000]);

                // before comparison, for each sort, you need to run remove duplicated
                anAlgorithm.removeDuplicate();
                deepEqual(anAlgorithm.resultSet.length,2);

                // comparison
                deepEqual(anAlgorithm.lengthComparison(),[100,200,300,400,500]);

                // reSet
                anAlgorithm.reset();
                deepEqual(anAlgorithm.data,null);
                deepEqual(anAlgorithm.resultSet.length,0);

                // ----- insertion and soring 3 ----- A less than B
                anAlgorithm.config([100,200,300,400,400]);
                deepEqual(anAlgorithm.insertionSort(),[100,200,300,400,400]); // A : 5

                // before comparison, for each sort, you need to run remove duplicated
                anAlgorithm.removeDuplicate();

                anAlgorithm.config([10000,2000,300,40, 4,0.5]);
                deepEqual(anAlgorithm.insertionSort(),[0.5,4,40,300,2000,10000]); // B : 6

                // before comparison, for each sort, you need to run remove duplicated
                anAlgorithm.removeDuplicate();
                deepEqual(anAlgorithm.resultSet.length,2);

                deepEqual(anAlgorithm.lengthComparison(),[100,200,300,400]);

                // ----- insertion and soring 4 ----- no reset
                anAlgorithm.config([2,6,3,1,4,5])
                deepEqual(anAlgorithm.insertionSort(),[1,2,3,4,5,6]);
                // before comparison, for each sort, you need to run remove duplicated
                anAlgorithm.removeDuplicate();
                deepEqual(anAlgorithm.resultSet.length,3);
                deepEqual(anAlgorithm.lengthComparison(),null);

                // reSet
                anAlgorithm.reset();
                deepEqual(anAlgorithm.data,null);
                deepEqual(anAlgorithm.resultSet.length,0);
            });

            test('Reset - self.reset - should reset all properties of Algorithm',function(){
                var anAlgorithm = new Algorithm();

                anAlgorithm.config([100,200,300,400,400,500]);
                deepEqual(anAlgorithm.insertionSort(),[100,200,300,400,400,500]);
                deepEqual(anAlgorithm.removeDuplicate(),[100,200,300,400,500]);

                // reserved
                anAlgorithm.config([10000,10000,10000,2000,300,40,4,0.5,0.5,0.5]);
                deepEqual(anAlgorithm.insertionSort(),[0.5,0.5,0.5,4,40,300,2000,10000,10000,10000]);
                deepEqual(anAlgorithm.removeDuplicate(),[0.5,4,40,300,2000,10000]);

                anAlgorithm.reset();
                deepEqual(anAlgorithm.data,null);
                deepEqual(anAlgorithm.resultSet.length,0);
                deepEqual(anAlgorithm.sortedData,null);
                deepEqual(anAlgorithm.uniqueSortedData,null);

                // all the same
                anAlgorithm.config([1,1,1,1,1,1]);
                deepEqual(anAlgorithm.insertionSort(),[1,1,1,1,1,1]);
                deepEqual(anAlgorithm.removeDuplicate(),[1]);

                // random
                anAlgorithm.config([2,6,3,3,1,1,4,4,5,5]);
                deepEqual(anAlgorithm.insertionSort(),[1,1,2,3,3,4,4,5,5,6]);
                deepEqual(anAlgorithm.removeDuplicate(),[1,2,3,4,5,6]);

                anAlgorithm.reset();
                deepEqual(anAlgorithm.data,null);
                deepEqual(anAlgorithm.resultSet.length,0);
                deepEqual(anAlgorithm.sortedData,null);
                deepEqual(anAlgorithm.uniqueSortedData,null);

                // string
                anAlgorithm.config(['2','6','3','1','4','5']);
                deepEqual(anAlgorithm.insertionSort(),[1,2,3,4,5,6]);

                anAlgorithm.config(['21','0','33','62','33','33','99','14','99','45','56','12','9','0','99']);
                deepEqual(anAlgorithm.insertionSort(),[0,0,9,12,14,21,33,33,33,45,56,62,99,99,99]);
                deepEqual(anAlgorithm.removeDuplicate(),[0,9,12,14,21,33,45,56,62,99]);

                anAlgorithm.config(['21',0,'33','62','33','33','99','14','99','45','56','12','9','0','99']);
                deepEqual(anAlgorithm.insertionSort(),[0,0,9,12,14,21,33,33,33,45,56,62,99,99,99]);
                deepEqual(anAlgorithm.removeDuplicate(),[0,9,12,14,21,33,45,56,62,99]);

                anAlgorithm.reset();
                deepEqual(anAlgorithm.data,null);
                deepEqual(anAlgorithm.resultSet.length,0);
                deepEqual(anAlgorithm.sortedData,null);
                deepEqual(anAlgorithm.uniqueSortedData,null);
            });

            module('ParseData');
            test('ParseData - initial',function(){
                var aParseData = new ParseData();
                aParseData.config(["1009 2000", "1009 2001", "1002 2002", "1003 2002"]);
                deepEqual(aParseData.dataToParse,["1009 2000", "1009 2001", "1002 2002", "1003 2002"]);

                aParseData.config(["1111 2002", "1004 2301", "1006 2007", "1043 2702"]);
                deepEqual(aParseData.dataToParse,["1111 2002", "1004 2301", "1006 2007", "1043 2702"]);
            });

            test('ParseData - parsing data - self.parse',function(){
                var aParseData = new ParseData();
                aParseData.config(["1009 2000", "1009 2001", "1002 2002", "1003 2002"]);
                deepEqual(aParseData.dataToParse,["1009 2000", "1009 2001", "1002 2002", "1003 2002"]);
                deepEqual(aParseData.parse(),[[1009,1009,1002,1003],[2000,2001,2002,2002]]);
                deepEqual(aParseData.sData,[
                    {1009:1009,2000:2000,isTicked: false},
                    {1009:1009,2001:2001,isTicked: false},
                    {1002:1002,2002:2002,isTicked: false},
                    {1003:1003,2002:2002,isTicked: false}
                ]);
            });

            module('Give Final Result');
            test('1: parse data->Sort->remove duplicate->comparison->give result',function(){
                var aParseData = new ParseData();
                var anAlgorithm = new Algorithm();

                // parse data
                aParseData.config(["1009 2000", "1009 2001", "1002 2002", "1003 2002","1009 2003"]);
                // an array of two arrays
                var parsedData = aParseData.parse();
                var sData = aParseData.sData;

                // sort and remove duplicate
                for (var i = 0; i < parsedData.length;i++){
                    anAlgorithm.config(parsedData[i],sData);
                    anAlgorithm.insertionSort();
                    anAlgorithm.removeDuplicate();
                }
                deepEqual(anAlgorithm.resultSet.length,2);

                // comparison
                var finalResult = anAlgorithm.lengthComparison();
                deepEqual(finalResult,[1009,2002]);

                anAlgorithm.reset();
                deepEqual(anAlgorithm.data,null);
                deepEqual(anAlgorithm.resultSet.length,0);
                deepEqual(anAlgorithm.sortedData,null);
                deepEqual(anAlgorithm.uniqueSortedData,null);
                deepEqual(anAlgorithm.lengthOfInput,0);
                deepEqual(anAlgorithm.duplicate,{});
                deepEqual(anAlgorithm.sData,null);
            });

            test('2: parse data->Sort->remove duplicate->comparison->give result',function(){
                var aParseData = new ParseData();
                var anAlgorithm = new Algorithm();

                // parse data
                aParseData.config(["1000 2011", "1002 2012", "1003 2013", "1003 2013","1005 2015"]);
                // an array of two arrays
                var parsedData = aParseData.parse();
                var sData = aParseData.sData;

                // sort and remove duplicate
                for (var i = 0; i < parsedData.length;i++){
                    anAlgorithm.config(parsedData[i],sData);
                    anAlgorithm.insertionSort();
                    anAlgorithm.removeDuplicate();
                }
                deepEqual(anAlgorithm.resultSet.length,2);

                // comparison
                var finalResult = anAlgorithm.lengthComparison();
                deepEqual(finalResult,[1000,1002,1003,1005]);

                anAlgorithm.reset();
                deepEqual(anAlgorithm.data,null);
                deepEqual(anAlgorithm.resultSet.length,0);
                deepEqual(anAlgorithm.sortedData,null);
                deepEqual(anAlgorithm.uniqueSortedData,null);
                deepEqual(anAlgorithm.lengthOfInput,0);
                deepEqual(anAlgorithm.duplicate,{});
                deepEqual(anAlgorithm.sData,null);
            })

            test('3:parse data->Sort->remove duplicate->comparison->give result',function(){
                var aParseData = new ParseData();
                var anAlgorithm = new Algorithm();

                // parse data
                aParseData.config(["1000 2011", "1002 2012", "1003 2013", "1003 2013","1003 2015"]);
                // an array of two arrays
                var parsedData = aParseData.parse();
                var sData = aParseData.sData;

                // sort and remove duplicate
                for (var i = 0; i < parsedData.length;i++){
                    anAlgorithm.config(parsedData[i],sData);
                    anAlgorithm.insertionSort();
                    anAlgorithm.removeDuplicate();
                }
                deepEqual(anAlgorithm.resultSet.length,2);

                // comparison
                var finalResult = anAlgorithm.lengthComparison();
                deepEqual(finalResult,[1000,1002,1003]);

                anAlgorithm.reset();
                deepEqual(anAlgorithm.data,null);
                deepEqual(anAlgorithm.resultSet.length,0);
                deepEqual(anAlgorithm.sortedData,null);
                deepEqual(anAlgorithm.uniqueSortedData,null);
                deepEqual(anAlgorithm.lengthOfInput,0);
                deepEqual(anAlgorithm.duplicate,{});
                deepEqual(anAlgorithm.sData,null);
            });

            test('4:parse data->Sort->remove duplicate->comparison->give result',function(){
                var aParseData = new ParseData();
                var anAlgorithm = new Algorithm();

                // parse data
                aParseData.config(["1000 2011", "1002 2012", "1003 2013", "1003 2013","1005 2013"]);
                // an array of two arrays
                var parsedData = aParseData.parse();
                var sData = aParseData.sData;

                // sort and remove duplicate
                for (var i = 0; i < parsedData.length;i++){
                    anAlgorithm.config(parsedData[i],sData);
                    anAlgorithm.insertionSort();
                    anAlgorithm.removeDuplicate();
                }
                deepEqual(anAlgorithm.resultSet.length,2);

                // comparison
                var finalResult = anAlgorithm.lengthComparison();
                deepEqual(finalResult,[2011,2012,2013]);

                anAlgorithm.reset();
                deepEqual(anAlgorithm.data,null);
                deepEqual(anAlgorithm.resultSet.length,0);
                deepEqual(anAlgorithm.sortedData,null);
                deepEqual(anAlgorithm.uniqueSortedData,null);
                deepEqual(anAlgorithm.lengthOfInput,0);
                deepEqual(anAlgorithm.duplicate,{});
                deepEqual(anAlgorithm.sData,null);
            });

            test('5:parse data->Sort->remove duplicate->comparison->give result',function(){
                var aParseData = new ParseData();
                var anAlgorithm = new Algorithm();

                // parse data
                aParseData.config(["1000 2011", "1002 2013", "1003 2013", "1004 2016", "1003 2013","1003 2015"]);
                // an array of two arrays
                var parsedData = aParseData.parse();
                var sData = aParseData.sData;

                // sort and remove duplicate
                for (var i = 0; i < parsedData.length;i++){
                    anAlgorithm.config(parsedData[i],sData);
                    anAlgorithm.insertionSort();
                    anAlgorithm.removeDuplicate();
                }
                deepEqual(anAlgorithm.resultSet.length,2);

                // comparison
                var finalResult = anAlgorithm.lengthComparison();
                deepEqual(finalResult,[1000,1002,1003,1004]);

                anAlgorithm.reset();
                deepEqual(anAlgorithm.data,null);
                deepEqual(anAlgorithm.resultSet.length,0);
                deepEqual(anAlgorithm.sortedData,null);
                deepEqual(anAlgorithm.uniqueSortedData,null);
                deepEqual(anAlgorithm.lengthOfInput,0);
                deepEqual(anAlgorithm.duplicate,{});
                deepEqual(anAlgorithm.sData,null);
            });

            test('6:parse data->Sort->remove duplicate->comparison->give result',function(){
                var aParseData = new ParseData();
                var anAlgorithm = new Algorithm();

                // parse data
                aParseData.config(["1003 2018","1004 2011", "1004 2012", "1004 2018", "1007 2009", "1008 2009", "1019 2015", "1019 2016"]);
                // an array of two arrays
                var parsedData = aParseData.parse();
                var sData = aParseData.sData;

                // sort and remove duplicate
                for (var i = 0; i < parsedData.length;i++){
                    anAlgorithm.config(parsedData[i],sData);
                    anAlgorithm.insertionSort();
                    anAlgorithm.removeDuplicate();
                }
                deepEqual(anAlgorithm.resultSet.length,2);

                // comparison
                var finalResult = anAlgorithm.lengthComparison();
                deepEqual(finalResult,[1004,1019,2009,2018]);

                anAlgorithm.reset();
                deepEqual(anAlgorithm.data,null);
                deepEqual(anAlgorithm.resultSet.length,0);
                deepEqual(anAlgorithm.sortedData,null);
                deepEqual(anAlgorithm.uniqueSortedData,null);
                deepEqual(anAlgorithm.lengthOfInput,0);
                deepEqual(anAlgorithm.duplicate,{});
                deepEqual(anAlgorithm.sData,null);
            });

            test('7:parse data->Sort->remove duplicate->comparison->give result',function(){
                var aParseData = new ParseData();
                var anAlgorithm = new Algorithm();

                // parse data
                aParseData.config(["1911 2911","1911 2912", "1933 2913", "1944 2913", "1955 2915", "1955 2916", "1977 2917", "1988 2917"]);
                // an array of two arrays
                var parsedData = aParseData.parse();
                var sData = aParseData.sData;

                // sort and remove duplicate
                for (var i = 0; i < parsedData.length;i++){
                    anAlgorithm.config(parsedData[i],sData);
                    anAlgorithm.insertionSort();
                    anAlgorithm.removeDuplicate();
                }
                deepEqual(anAlgorithm.resultSet.length,2);

                // comparison
                var finalResult = anAlgorithm.lengthComparison();
                deepEqual(finalResult,[1911,1955,2913,2917]);

                anAlgorithm.reset();
                deepEqual(anAlgorithm.data,null);
                deepEqual(anAlgorithm.resultSet.length,0);
                deepEqual(anAlgorithm.sortedData,null);
                deepEqual(anAlgorithm.uniqueSortedData,null);
                deepEqual(anAlgorithm.lengthOfInput,0);
                deepEqual(anAlgorithm.duplicate,{});
                deepEqual(anAlgorithm.sData,null);
            });

            module('Loader');
            asyncTest('the file should be loaded',function(){
                var aLoader = new Loader();

                function successCB(data) {
                    console.log(data);
                    equal(typeof data[0],'string');
                    start();
                }

                aLoader.loadData(successCB);
            });
        }
    };
});