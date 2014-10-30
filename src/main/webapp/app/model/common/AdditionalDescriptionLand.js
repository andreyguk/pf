/**
* 
*/
Ext.define('pf.model.common.AdditionalDescriptionLand', {
	extend : 'pf.model.Abstract',
	fields : [ {
		name : 'addDescriptionID',
		type : 'int'
	}, {
		name : 'code',
		type : 'string'
	}, {
		name : 'addDescriptionName',
		type : 'string'
	} ],
	proxy : {
		type : 'baseAjax',
		extraParams : {
			classname : 'additionalDescriptionLand'
		},
		api : {
			read : pf.system.Settings.protocol + pf.system.Settings.port + pf.system.Settings.ns + 'pf.proxy.common.Common.cls'
		}
	}

});