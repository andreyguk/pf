/**
* Довідник територій
*/
Ext.define('pf.model.common.Territory', {
	extend : 'pf.model.Abstract',
	fields : [ {
		name : 'id',
		type : 'string'
	}, {
		name : 'fullName',
		type : 'string'
	}],
	proxy : {
		type : 'baseAjax',
		extraParams : {
			classname : 'territory'
		},
		api : {
			read : pf.system.Settings.protocol + pf.system.Settings.port + pf.system.Settings.ns + 'pf.proxy.common.Common.cls'
		}
	}

});