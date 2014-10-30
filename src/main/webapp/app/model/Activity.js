/**
 * Об'єкт оцінки - Дані правовстановлюючих документів
 */
Ext.define('pf.model.Activity', {
	extend : 'pf.model.Abstract',
	fields : [ {
		name : 'actionDate',
		type : 'date',
		dateFormat : 'Y-m-d H:i:s'
	}, {
		name : 'actionType',
		type : 'string'
	}, {
		name : 'creator',
		type : 'string'
	}, {
		name : 'description',
		type : 'string'
	} ],

	proxy : {
		type : 'baseAjax',
		extraParams : {
			classname : 'Activity'
		},
		api : {
			read : pf.system.Settings.protocol + pf.system.Settings.port + pf.system.Settings.ns + 'pf.proxy.manager.Read.cls'
		}
	}
});
