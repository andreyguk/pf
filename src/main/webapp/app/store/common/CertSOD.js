/**
 * сертификаты организации
 */
Ext.define('pf.store.common.CertSOD', {
	extend : 'Ext.data.Store',
	storeId : 'storeCertSODId',
	model : 'pf.model.common.CertSOD',
	autoLoad : {
		start : 0,
		limit : 25
	},
	pageSize : 25,
	remoteFilter : true,
	autoSync : false
});
