/**
 * 
 */
Ext.define('pf.model.OV2ExtBuildings', {
	extend : 'pf.model.Abstract',
	fields : [ {
		name : 'id',
		type : 'string'
	}, {
		name : 'objectValuation',
		type : 'int'
	}, {
		name : 'buildingId',
		type : 'int'
	}, {
		name : 'buildingName',
		type : 'string'
	} ],

	proxy : {
		type : 'baseAjax',
		extraParams : {
			classname : 'OV2ExtBuildings'
		},
		api : {
			read : pf.system.Settings.protocol + pf.system.Settings.port + pf.system.Settings.ns + 'pf.proxy.manager.Read.cls'
		}
	}
});
