/**
 * Author: Ken
 * Date: 12/04/2013
 * Time: 15:28
 */
define(function() {
    return UIHandler;
});
/**
 * Handle Run Event
 * @constructor
 */
function UIHandler(){
    var self = this;

    self.run = function (data, callback){
        var run = document.getElementById('run');
        run.onclick = onClick;

        function onClick(){
            if (callback && typeof callback === 'function'){
                callback(data);
            }
        };
    }
}