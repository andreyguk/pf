/**
 * Об'єкт оцінки - Дані правовстановлюючих документів
 */
Ext.define('pf.store.OV2ConstitutiveDocs', {
	extend : 'Ext.data.Store',
	storeId : 'storeOV2ConstitutiveDocsId',
	model : 'pf.model.OV2ConstitutiveDocs',
	autoLoad : {
		start : 0,
		limit : 25
	},
	pageSize : 25,
	remoteFilter : true,
	autoLoad : false,
	autoSync : false
});
