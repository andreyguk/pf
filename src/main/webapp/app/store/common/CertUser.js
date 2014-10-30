/**
 * сертификаты оценщика
 */
Ext.define('pf.store.common.CertUser', {
	extend : 'Ext.data.Store',
	storeId : 'storeCertUserId',
	model : 'pf.model.common.CertUser',
	autoLoad : {
		start : 0,
		limit : 25
	},
	pageSize : 25,
	remoteFilter : true,
	autoSync : false
});
