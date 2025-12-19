/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"nsrdos/uiportalprov_qas/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
