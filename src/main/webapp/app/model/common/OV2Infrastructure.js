/**
 * Infrastructure
 */
Ext.define('pf.model.common.OV2Infrastructure', {
	extend : 'Ext.data.Model',
	fields : [ {
		name : 'id',
		type : 'string'
	}, /*
		 * { name : 'objectValuationId', type : 'string' },
		 */{
		name : 'infrastructureId',
		type : 'string'
	}, {
		name : 'code',
		type : 'string'
	}, {
		name : 'name',
		type : 'string'
	} ],
	// belongsTo : 'pf.model.ObjectValuation',
	proxy : {
		type : 'baseAjax',
		extraParams : {
			classname : 'OV2Infrastructure'
		},
		api : {
			read : pf.system.Settings.protocol + pf.system.Settings.port + pf.system.Settings.ns + 'pf.proxy.common.Common.cls'
		}
	}
});
