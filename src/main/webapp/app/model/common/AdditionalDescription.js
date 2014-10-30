/**
* 
*/
Ext.define('pf.model.common.AdditionalDescription', {
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
			classname : 'additionalDescription'
		},
		api : {
			read : pf.system.Settings.protocol + pf.system.Settings.port + pf.system.Settings.ns + 'pf.proxy.common.Common.cls'
		}
	}

});