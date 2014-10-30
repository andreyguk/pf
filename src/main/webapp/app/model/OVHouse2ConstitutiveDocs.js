/**
 * Об'єкт оцінки - Дані правовстановлюючих документів
 */
Ext.define('pf.model.OVHouse2ConstitutiveDocs', {
	extend : 'pf.model.Abstract',
	fields : [ {
		name : 'id',
		type : 'string'
	}, {
		name : 'objectValuation',
		type : 'int'
	}, {
		name : 'docType',
		type : 'int'
	}, {
		name : 'docTypeName',
		type : 'string'
	}, {
		name : 'docBelonging',
		type : 'int'
	}, {
		name : 'docBelongingName',
		type : 'string'
	}, {
		name : 'docDescription',
		type : 'string'
	} ],

	proxy : {
		type : 'baseAjax',
		extraParams : {
			classname : 'OVHouse2ConstitutiveDocs'
		},
		api : {
			read : pf.system.Settings.protocol + pf.system.Settings.port + pf.system.Settings.ns + 'pf.proxy.manager.Read.cls'
		}
	}
});
