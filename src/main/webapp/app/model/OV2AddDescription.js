/**
 * Об'єкт оцінки - Додаткові характеристики
 */
Ext.define('pf.model.OV2AddDescription', {
	extend : 'pf.model.Abstract',
	fields : [ {
		name : 'id',
		type : 'string'
	}, {
		name : 'objectValuation',
		type : 'int'
	}, {
		name : 'addDescriptionID',
		type : 'int'
	}, {
		name : 'addDescriptionName',
		type : 'string'
	}],

	proxy : {
		type : 'baseAjax',
		extraParams : {
			classname : 'OV2AddDescription'
		},
		api : {
			read : pf.system.Settings.protocol + pf.system.Settings.port + pf.system.Settings.ns + 'pf.proxy.manager.Read.cls'
		}
	}
});
