/**
 * Author: Ken
 * Date: 11/04/2013
 * Time: 21:54
 */
QUnit.config.autostart = false;
require(['/test/testmodule.js'], function (testconfig) {
    QUnit.start();
    testconfig.RunTests();
}
);
