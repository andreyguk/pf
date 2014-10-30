/**
 * Об'єкт оцінки - Дані правовстановлюючих документів
 */
Ext.define('pf.store.OVHouse2ConstitutiveDocs', {
	extend : 'Ext.data.Store',
	storeId : 'storeOVHouse2ConstitutiveDocsId',
	model : 'pf.model.OVHouse2ConstitutiveDocs',
	autoLoad : {
		start : 0,
		limit : 25
	},
	pageSize : 25,
	remoteFilter : true,
	autoLoad : false,
	autoSync : false
});
