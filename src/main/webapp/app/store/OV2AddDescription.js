/**
 * Об'єкт оцінки - Опис приміщень
 */
Ext.define('pf.store.OV2AddDescription', {
	extend : 'Ext.data.Store',
	storeId : 'storeOV2AddDescriptionId',
	model : 'pf.model.OV2AddDescription',
	autoLoad : {
		start : 0,
		limit : 25
	},
	pageSize : 25,
	remoteFilter : true,
	autoLoad : false,
	autoSync : false
});
