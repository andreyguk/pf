/**
* Infrastructure
*/
Ext.define('pf.model.common.Infrastructure', {
	extend : 'pf.model.Abstract',
	fields : [ {
		name : 'infrastructureID',
		type : 'int'
	}, {
		name : 'code',
		type : 'string'
	}, {
		name : 'infrastructureName',
		type : 'string'
	} ],
	proxy : {
		type : 'baseAjax',
		extraParams : {
			classname : 'infrastructure'
		},
		api : {
			read : pf.system.Settings.protocol + pf.system.Settings.port + pf.system.Settings.ns + 'pf.proxy.common.Common.cls'
		}
	}

});
