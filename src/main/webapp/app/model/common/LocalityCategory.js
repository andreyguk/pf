/**
* Структура населенного пункту
*/
Ext.define('pf.model.common.LocalityCategory', {
	extend : 'pf.model.Abstract',
	fields : [ {
		name : 'string',
		type : 'int'
	}, {
		name : 'code',
		type : 'string'
	}, {
		name : 'name',
		type : 'string'
	} ],
	proxy : {
		type : 'baseAjax',
		extraParams : {
			classname : 'localityCategory'
		},
		api : {
			read : pf.system.Settings.protocol + pf.system.Settings.port + pf.system.Settings.ns + 'pf.proxy.common.Common.cls'
		}
	}

});