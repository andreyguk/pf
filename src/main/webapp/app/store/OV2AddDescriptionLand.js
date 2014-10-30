/**
 * Об'єкт оцінки - Опис приміщень
 */
Ext.define('pf.store.OV2AddDescriptionLand', {
	extend : 'Ext.data.Store',
	storeId : 'storeOV2AddDescriptionLandId',
	model : 'pf.model.OV2AddDescriptionLand',
	autoLoad : {
		start : 0,
		limit : 25
	},
	pageSize : 25,
	remoteFilter : true,
	autoLoad : false,
	autoSync : false
});
