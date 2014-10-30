/**
* Infrastructure
*/
Ext.define('pf.model.common.OtherExternalBuildings', {
	extend : 'pf.model.Abstract',
	fields : [ {
		name : 'buildingId',
		type : 'int'
	}, {
		name : 'code',
		type : 'string'
	}, {
		name : 'buildingName',
		type : 'string'
	} ],
	proxy : {
		type : 'baseAjax',
		extraParams : {
			classname : 'otherExternalBuildings'
		},
		api : {
			read : pf.system.Settings.protocol + pf.system.Settings.port + pf.system.Settings.ns + 'pf.proxy.common.Common.cls'
		}
	}

});
