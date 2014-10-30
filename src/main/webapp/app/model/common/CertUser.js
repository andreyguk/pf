/**
 * сертификаты оценщика
 */
Ext.define('pf.model.common.CertUser', {
	extend : 'pf.model.Abstract',
	fields : [ {
		name : 'id',
		type : 'int'
	}, {
		name : 'fileName',
		type : 'string'
	}, {
		name : 'docTypeName',
		type : 'string'
	}, {
		name : 'docNumber',
		type : 'string'
	}, {
		name : 'docType',
		type : 'string'
	}, {
		name : 'docDate',
		type : 'date',
		dateFormat : 'Y-m-d'
	}, {
		name : 'endDate',
		type : 'date',
		dateFormat : 'Y-m-d'
	} ],

	proxy : {
		type : 'baseAjax',
		extraParams : {
			classname : 'сertUser'
		},
		api : {
			read : pf.system.Settings.protocol + pf.system.Settings.port + pf.system.Settings.ns + 'pf.proxy.common.Common.cls',
			destroy : pf.system.Settings.protocol + pf.system.Settings.port + pf.system.Settings.ns + 'pf.proxy.common.Delete.cls'
		}
	}
});
