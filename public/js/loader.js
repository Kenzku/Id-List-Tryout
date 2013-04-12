/**
 * Author: Ken
 * Date: 12/04/2013
 * Time: 15:21
 */
define(function() {
    return Loader;
});
/**
 * Load Data from /data/employees.json
 * @constructor
 */
function Loader() {
    var self = this;

    self.loadData = function (successCallback) {
        var xhr = new XMLHttpRequest();

        try {
            xhr.open('GET','/data/employees.json');
            xhr.setRequestHeader("Content-type","application/json");
            xhr.send();
        } catch (e) {
            throw e;
        }

        xhr.onreadystatechange = function()
        {
            // on success, for status referencing, please check http://www.w3.org/TR/2006/WD-XMLHttpRequest-20060405/
            if (xhr.readyState==4 && xhr.status==200)
            {
                if (successCallback && typeof successCallback === 'function'){
                    successCallback(xhr.responseText);
                }
            }
        }
    }
}
