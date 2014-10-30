/**
 * Тип приміщення
 */
Ext.define('pf.model.common.CostType', {
	extend : 'pf.model.Abstract',
	fields : [ {
		name : 'id',
		type : 'string'
	}, {
		name : 'code',
		type : 'string'
	}, {
		name : 'name',
		type : 'string'
	}, {
		name : 'description',
		type : 'string'
	} ],
	proxy : {
		type : 'baseAjax',
		extraParams : {
			classname : 'costType'
		},
		api : {
			read : pf.system.Settings.protocol + pf.system.Settings.port + pf.system.Settings.ns + 'pf.proxy.common.Common.cls'
		}
	}

});